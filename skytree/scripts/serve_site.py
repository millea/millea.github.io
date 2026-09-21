"""Serve the site locally, including the HTML page named skytree.html."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class SiteHandler(SimpleHTTPRequestHandler):
    pass


if __name__ == '__main__':
    root = Path(__file__).resolve().parents[2]
    server = ThreadingHTTPServer(('127.0.0.1', 8000), partial(SiteHandler, directory=str(root)))
    print('Skytree: http://localhost:8000/skytree/skytree.html', flush=True)
    server.serve_forever()
