/* =============================================== */
/* SET FOOTER YEAR */
/* =============================================== */
document.getElementById("year-span").textContent = new Date().getFullYear();

/* =============================================== */
/* HAMBURGER MENU */
/* =============================================== */
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
});

/* =============================================== */
/* DYNAMIC HEADER HEIGHT FIX */
/* =============================================== */
function adjustHeaderHeight(){
  const header = document.querySelector(".site-header");
  const hh = header.offsetHeight;
  document.documentElement.style.setProperty("--header-height", `${hh}px`);
}

window.addEventListener("load", adjustHeaderHeight);
window.addEventListener("resize", adjustHeaderHeight);
