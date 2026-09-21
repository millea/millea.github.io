"""Run with the local HTTP server on port 8000; requires Playwright Chromium."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright

out = Path(__file__).resolve().parents[1] / 'outputs'
out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 1080}, device_scale_factor=1)
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto('http://127.0.0.1:8000/skytree/skytree.html', wait_until='networkidle')
    page.wait_for_function("document.querySelector('#skytree').loaded === true", timeout=60000)
    page.wait_for_function("document.querySelector('#loading').hidden")
    page.wait_for_timeout(1200)  # Allow the viewer poster fade and first GPU frame.
    page.screenshot(path=str(out / 'website-desktop.png'), full_page=True)
    orbit = "document.querySelector('#skytree').getCameraOrbit()"
    initial = page.evaluate(orbit)
    box = page.locator('#skytree').bounding_box()
    x, y = box['x'] + box['width'] / 2, box['y'] + box['height'] / 2
    page.mouse.move(x, y)
    page.mouse.down()
    page.mouse.move(x + 150, y + 20, steps=20)
    page.mouse.up()
    page.wait_for_function(f"Math.abs(document.querySelector('#skytree').getCameraOrbit().theta - {initial['theta']}) > 0.1")
    for name in ['deck', 'gallery', 'base', 'full']:
        page.locator(f'.view-button[data-view={name}]').click()
        page.wait_for_function(f"document.querySelector('.view-button[data-view={name}]').getAttribute('aria-pressed') === 'true'")
    page.wait_for_function(f"Math.abs(document.querySelector('#skytree').getCameraOrbit().radius - 15) < 0.1")
    page.locator('#zoom-in').click()
    page.wait_for_function("document.querySelector('#skytree').getCameraOrbit().radius < 13")
    page.locator('#zoom-out').click()
    page.wait_for_function("document.querySelector('#skytree').getCameraOrbit().radius > 14")
    page.locator('#rotate').click()
    assert page.locator('#rotate').get_attribute('aria-pressed') == 'true'
    page.wait_for_function("Math.abs(document.querySelector('#skytree').turntableRotation) > 0.01", timeout=15000)
    page.locator('#rotate').click()
    assert page.locator('#rotate').get_attribute('aria-pressed') == 'false'
    page.locator('#theme').click()
    assert 'dark' in page.locator('#viewer-panel').get_attribute('class')
    page.locator('#theme').click()
    page.locator('#reset').click()
    page.locator('.view-button[data-view=deck]').click()
    page.wait_for_function("Math.abs(document.querySelector('#skytree').getCameraOrbit().radius - 2.1) < 0.01")
    page.screenshot(path=str(out / 'website-detail.png'), full_page=True)
    page.locator('#reset').click()
    page.set_viewport_size({'width': 390, 'height': 844})
    page.wait_for_function("document.documentElement.scrollWidth <= innerWidth")
    page.screenshot(path=str(out / 'website-mobile.png'), full_page=True)
    assert not errors, errors
    # Model failure is visible and controls are disabled, rather than an endless spinner.
    failed = browser.new_page()
    failed.route('**/assets/models/skytree.glb', lambda route: route.abort())
    failed.goto('http://127.0.0.1:8000/skytree/skytree.html')
    failed.locator('#error').wait_for(state='visible')
    assert failed.locator('#rotate').is_disabled()
    assert failed.locator('#loading').is_hidden()
    print(json.dumps({'loaded': True, 'drag': True, 'presets': 4, 'zoom': True,
                      'rotation': True, 'mobile_overflow': False, 'fallback': True,
                      'page_errors': errors}))
    browser.close()
