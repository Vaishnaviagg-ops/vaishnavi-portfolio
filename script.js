const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = themeToggle.querySelector(".theme-label");
const themeIcon = themeToggle.querySelector(".theme-icon");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeIcon.textContent = isDark ? "☼" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#111111" : "#faf8f2");
  try { localStorage.setItem("vaishnavi-portfolio-theme", theme); } catch (error) {}
}

let savedTheme = "dark";
try { savedTheme = localStorage.getItem("vaishnavi-portfolio-theme") || "dark"; } catch (error) {}
setTheme(savedTheme);
themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));
}


const enquiryForm = document.getElementById("enquiryForm");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("visitorName").value.trim();
    const address = document.getElementById("visitorAddress").value.trim();
    const phone = document.getElementById("visitorPhone").value.trim();
    const service = document.getElementById("visitorService").value;
    const message = document.getElementById("visitorMessage").value.trim();
    const text = [
      "Hello Vaishnavi, I am interested in your services.",
      "",
      "Name: " + name,
      "Address / City: " + address,
      "Phone: " + phone,
      "Requirement: " + service,
      message ? "Additional details: " + message : ""
    ].filter(Boolean).join("\n");
    const status = document.getElementById("formStatus");
    status.textContent = "Opening WhatsApp with your enquiry. Please review and press Send there.";
    const whatsappUrl = "https://wa.me/918796319615?text=" + encodeURIComponent(text);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
