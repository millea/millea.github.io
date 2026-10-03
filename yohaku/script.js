const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("nav");
const themeButton = document.querySelector(".theme-button");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function closeMenu() {
  menuButton.classList.remove("open");
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const open = menuButton.classList.toggle("open");
  navigation.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

themeButton.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  themeMeta.content = dark ? "#151613" : "#f2f0e9";
});

const cursor = document.querySelector(".cursor");
window.addEventListener("pointermove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});
document.querySelectorAll(".interactive").forEach((item) => {
  item.addEventListener("pointerenter", () => cursor.classList.add("show"));
  item.addEventListener("pointerleave", () => cursor.classList.remove("show"));
});

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    button.classList.add("active");
    document.querySelectorAll(".project").forEach((project) => {
      project.classList.toggle("hidden", button.dataset.filter !== "all" && project.dataset.category !== button.dataset.filter);
    });
  });
});

const caseStudies = {
  nagi: ["01", "NAGI HOUSE", "瀬戸内の穏やかな時間を、一棟貸しの宿泊体験へ。『凪』という一文字を起点に、空間・言葉・サインが静かに呼応するブランドを設計しました。", "STRATEGY / IDENTITY"],
  aura: ["02", "AURA OBJECTS", "形より先に、感覚がある。実験的な家具レーベルのために、触れるように探索できるデジタルショールームをつくりました。", "ART DIRECTION / DIGITAL"],
  soil: ["03", "SOIL LAB", "植物と科学のあいだを探究するラボ。土や葉の有機的な表情と、研究所の精密さをひとつのビジュアルシステムに。", "IDENTITY / PACKAGING"],
  ma: ["04", "MA ARCHIVE", "音と沈黙のあいだにあるもの。日本各地の環境音を収集し、偶然の出会いを生むインタラクティブアーカイブです。", "UX / DEVELOPMENT"],
};
const modal = document.querySelector(".project-modal");
function openProject(project) {
  const data = caseStudies[project.dataset.project];
  modal.querySelector(".modal-index span").textContent = data[0];
  modal.querySelector("h2").textContent = data[1];
  modal.querySelector(".modal-copy").textContent = data[2];
  modal.querySelector(".modal-meta b").textContent = data[3];
  modal.showModal();
}
document.querySelectorAll(".project").forEach((project) => {
  project.addEventListener("click", () => openProject(project));
  project.addEventListener("keydown", (event) => { if (event.key === "Enter") openProject(project); });
});
document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });

function updateClock() {
  document.querySelector("#clock").textContent = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date());
}
updateClock();
setInterval(updateClock, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.animate([{ opacity: 0, transform: "translateY(35px)" }, { opacity: 1, transform: "none" }], { duration: 700, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }); });
}, { threshold: 0.12 });
document.querySelectorAll(".project, .cap-list > div, .manifesto-note").forEach((element) => observer.observe(element));
