/* ============================================================ */
/* SCRIPT.JS - Portfolio Website - All JavaScript Functionality */
/* ============================================================ */

// ============================================================
// 1. SKILL ROTATOR FOR HERO SECTION
// ============================================================
const rotatorElement = document.getElementById("skillRotator");
const skills = [
  "SQL Developer",
  "Python Developer",
  "Power BI Developer",
  "Excel Specialist",
  "AI Enthusiast",
  "Data Analyst",
  "Web Developer",
];
let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function rotateSkills() {
  const currentSkill = skills[skillIndex];
  if (!isDeleting) {
    rotatorElement.textContent = currentSkill.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
    if (charIndex === currentSkill.length) {
      isDeleting = true;
      typingSpeed = 2000;
    }
  } else {
    rotatorElement.textContent = currentSkill.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
    if (charIndex === 0) {
      isDeleting = false;
      skillIndex = (skillIndex + 1) % skills.length;
      typingSpeed = 500;
    }
  }
  setTimeout(rotateSkills, typingSpeed);
}
if (rotatorElement) {
  setTimeout(rotateSkills, 1000);
}

// ============================================================
// 2. MOBILE HAMBURGER MENU TOGGLE
// ============================================================
const hamburger = document.getElementById("navHamburger");
const navLinks = document.getElementById("navLinks");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });
}

// ============================================================
// 3. NAVBAR ACTIVE LINK HIGHLIGHTING ON SCROLL
// ============================================================
const sections = document.querySelectorAll(".section");
const navLinkItems = document.querySelectorAll(".nav-link");
function updateActiveLink() {
  let current = "";
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });
  navLinkItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateActiveLink);

// ============================================================
// 4. SCROLL-TRIGGERED ANIMATIONS
// ============================================================
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);
revealElements.forEach((el) => revealObserver.observe(el));

// ============================================================
// 5. STATS COUNTER ANIMATION
// ============================================================
const statNumbers = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute("data-target"), 10);
        animateCounter(target, targetValue);
        statsObserver.unobserve(target);
      }
    });
  },
  { threshold: 0.5 },
);
statNumbers.forEach((stat) => statsObserver.observe(stat));
function animateCounter(element, target) {
  let current = 0;
  const suffix = element.getAttribute("data-suffix") || "";
  const increment = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    element.textContent = `${current}${suffix}`;
  }, 30);
}

// ============================================================
// 6. SKILLS PROGRESS BAR ANIMATION ON SCROLL
// ============================================================
const skillFills = document.querySelectorAll(".skill-fill");
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute("data-width");
        if (width) fill.style.width = width + "%";
        skillsObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 },
);
skillFills.forEach((fill) => skillsObserver.observe(fill));

// ============================================================
// 7. PROJECTS — CATEGORY CONFIGURATION & FILTERING
// ============================================================

/**
 * CATEGORY_CONFIG — Single source of truth for project categories.
 * Add, remove, or rename categories here. Each entry maps a
 * data-filter value to its display label.
 * 
 * Usage: When you populate projectsData, assign categories using
 * the keys from this config (e.g., categories: ["python", "data-analytics"]).
 */
const CATEGORY_CONFIG = [
  { key: "data-analytics", label: "Data Analytics" },
  { key: "mysql-excel",    label: "MySQL & Excel" },
  { key: "python",         label: "Python" },
  { key: "web-apps",       label: "Web Apps" },
  { key: "visualization",  label: "Visualization" },
  { key: "ai",             label: "AI" },
];

/**
 * PROJECTS_DATA — Future home for your project objects.
 * Each project should have a `categories` array using keys from
 * CATEGORY_CONFIG. Example:
 * {
 *   id: "amazon-sales",
 *   title: "Amazon Sales Analytics",
 *   description: "...",
 *   tags: ["SQL", "Power BI"],
 *   categories: ["data-analytics", "visualization"],
 *   ...
 * }
 */
const PROJECTS_DATA = []; // ← Add your projects here later

// ─── Filter Logic ─────────────────────────────────────────────

const filterBtns = document.querySelectorAll(".filter-btn");
const projectsGrid = document.querySelector(".projects-grid");

/**
 * Filters project cards based on the selected category.
 * Supports multi-category projects via space-separated data-category.
 */
function filterProjects(filterKey) {
  const cards = projectsGrid.querySelectorAll(".project-card");

  cards.forEach((card) => {
    const cardCategories = card.getAttribute("data-category") || "";
    const categories = cardCategories.split(/\s+/).filter(Boolean);
    const matches = filterKey === "all" || categories.includes(filterKey);

    if (matches) {
      card.style.display = "block";
      card.style.opacity = "0";
      // Force reflow then fade in
      void card.offsetHeight;
      card.style.opacity = "1";
    } else {
      card.style.display = "none";
    }
  });
}

// ─── Bind filter buttons ──────────────────────────────────────

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterProjects(btn.getAttribute("data-filter"));
  });
});

// ============================================================
// 8. CONTACT FORM VALIDATION & SUBMISSION
// ============================================================
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
if (contactForm) {
  const nameInput = document.getElementById("formName");
  const emailInput = document.getElementById("formEmail");
  const messageInput = document.getElementById("formMessage");
  const errorSpans = contactForm.querySelectorAll(".form-error");
  const inputs = [nameInput, emailInput, messageInput];
  inputs.forEach((input) => {
    if (!input) return;
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      const errorSpan = input.parentElement.querySelector(".form-error");
      if (errorSpan) errorSpan.textContent = "";
      input.style.borderColor = "";
    });
  });
  function validateField(input) {
    const errorSpan = input.parentElement.querySelector(".form-error");
    if (!errorSpan) return true;
    if (input.validity.valueMissing) {
      errorSpan.textContent = "This field is required.";
      input.style.borderColor = "#ff6b6b";
      return false;
    }
    if (input.type === "email" && input.validity.typeMismatch) {
      errorSpan.textContent = "Please enter a valid email address.";
      input.style.borderColor = "#ff6b6b";
      return false;
    }
    errorSpan.textContent = "";
    input.style.borderColor = "";
    return true;
  }
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);
    if (isNameValid && isEmailValid && isMessageValid) {
      contactForm.style.display = "none";
      formSuccess.classList.remove("hidden");
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = "block";
        formSuccess.classList.add("hidden");
        errorSpans.forEach((span) => (span.textContent = ""));
        inputs.forEach((inp) => {
          if (inp) inp.style.borderColor = "";
        });
      }, 4000);
    }
  });
}

// ============================================================
// 9. THREE.JS PARTICLE / NETWORK BACKGROUND
// ============================================================
function initThreeJS() {
  const canvasContainer = document.getElementById("particles-canvas");
  if (!canvasContainer || typeof THREE === "undefined") return;
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 50 : 100;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.clientWidth / canvasContainer.clientHeight,
    0.1,
    1000,
  );
  camera.position.z = 30;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.appendChild(renderer.domElement);
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 60;
    positions[i + 1] = (Math.random() - 0.5) * 40;
    positions[i + 2] = (Math.random() - 0.5) * 30;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: isMobile ? 0.12 : 0.15,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  const linePositions = [];
  const positionAttr = geometry.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = positionAttr[i * 3] - positionAttr[j * 3];
      const dy = positionAttr[i * 3 + 1] - positionAttr[j * 3 + 1];
      const dz = positionAttr[i * 3 + 2] - positionAttr[j * 3 + 2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (distance < 10) {
        linePositions.push(
          positionAttr[i * 3],
          positionAttr[i * 3 + 1],
          positionAttr[i * 3 + 2],
          positionAttr[j * 3],
          positionAttr[j * 3 + 1],
          positionAttr[j * 3 + 2],
        );
      }
    }
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3),
  );
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7b2ff7,
    transparent: true,
    opacity: 0.15,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);
  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
    lines.rotation.y += 0.0005;
    lines.rotation.x += 0.0002;
    renderer.render(scene, camera);
  }
  animate();
  function onResize() {
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener("resize", onResize);
}
window.addEventListener("load", initThreeJS);

// ============================================================
// 10. FOOTER - AUTO UPDATE YEAR
// ============================================================
const footerYear = document.getElementById("footerYear");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ============================================================
// 11. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============================================================
// 12. DUAL ORBIT SYSTEM - Inner (CW) + Outer (CCW) Fixed Skills
// ============================================================
(function initDualOrbitSystem() {
  const innerContainer = document.getElementById("floatingSkills");
  const outerContainer = document.getElementById("floatingSkillsOuter");
  if (!innerContainer || !outerContainer) return;

  // --- Fixed Skill Data ---
  const innerSkills = [
    { name: "Python", icon: "fab fa-python" },
    { name: "Power BI", icon: "fas fa-chart-bar" },
    { name: "Excel", icon: "fas fa-table" },
    { name: "MySQL", icon: "fas fa-database" },
  ];

  const outerSkills = [
    { name: "Git", icon: "fab fa-git-alt" },
    { name: "GitHub", icon: "fab fa-github" },
    { name: "Pandas", icon: "fas fa-cube" },
    { name: "NumPy", icon: "fas fa-cubes" },
    { name: "Artificial Intelligence", icon: "fas fa-brain" },
    { name: "Business Intelligence", icon: "fas fa-chart-line" },
    { name: "Data Analytics", icon: "fas fa-chart-simple" },
    { name: "Data Visualization", icon: "fas fa-eye" },
  ];

  // --- Orbit State ---
  let innerAngle = 0;
  let outerAngle = 0;
  let innerFrameId = null;
  let outerFrameId = null;

  // --- Radius Calculation (responsive) ---
  function getRadii() {
    const wrapper = document.querySelector(".profile-photo-wrapper");
    if (!wrapper) return { inner: 138, outer: 210 };
    const size = wrapper.offsetWidth || 300;
    if (size >= 300) return { inner: 138, outer: 210 };
    if (size >= 250) return { inner: 115, outer: 175 };
    if (size >= 220) return { inner: 100, outer: 155 };
    if (size >= 180) return { inner: 82, outer: 128 };
    return { inner: 72, outer: 110 };
  }

  // --- Build badges for an orbit (fixed, no swapping) ---
  function buildOrbit(container, skills) {
    container.innerHTML = "";
    const badges = [];
    skills.forEach((skill, i) => {
      const el = document.createElement("span");
      el.className = "skill-float-badge";
      el.innerHTML = `<i class="${skill.icon}"></i>${skill.name}`;
      el.dataset.name = skill.name;
      // Ensure badges stay upright — no rotation applied to element
      el.style.willChange = "transform";
      container.appendChild(el);
      badges.push({ el, skill });
      // Staggered fade-in
      setTimeout(() => el.classList.add("show"), i * 100 + 200);
    });
    return badges;
  }

  // --- rAF orbit loop (GPU accelerated) ---
  function startOrbitLoop(container, badges, period, direction) {
    // direction: +1 for CW (inner), -1 for CCW (outer)
    // speed = (direction × 2π) / (period in seconds × 60fps)
    const speed = (direction * 2 * Math.PI) / (period * 60);
    let angle = 0;

    function loop() {
      const count = badges.length;
      if (count === 0) return;

      const radii = getRadii();
      const radius = container === innerContainer ? radii.inner : radii.outer;
      const step = (2 * Math.PI) / count;

      for (let i = 0; i < count; i++) {
        const b = badges[i];
        if (!b || !b.el) continue;
        const a = angle + step * i;
        // Use translate3d for GPU acceleration
        const x = Math.sin(a) * radius;
        const y = -Math.cos(a) * radius;
        b.el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        // No rotation applied — badges always upright
      }

      angle += speed;
      if (container === innerContainer) {
        innerFrameId = requestAnimationFrame(loop);
      } else {
        outerFrameId = requestAnimationFrame(loop);
      }
    }

    const id = requestAnimationFrame(loop);
    return id;
  }

  // --- Build both orbits ---
  const innerBadges = buildOrbit(innerContainer, innerSkills);
  const outerBadges = buildOrbit(outerContainer, outerSkills);

  // --- Start loops ---
  // Inner: CW (+1), 28s per revolution
  innerFrameId = startOrbitLoop(innerContainer, innerBadges, 28, +1);
  // Outer: CCW (-1), 42s per revolution
  outerFrameId = startOrbitLoop(outerContainer, outerBadges, 42, -1);

  // --- Resize handler — rebuild badges and restart ---
  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Cancel existing loops
      if (innerFrameId) cancelAnimationFrame(innerFrameId);
      if (outerFrameId) cancelAnimationFrame(outerFrameId);

      // Rebuild
      const newInner = buildOrbit(innerContainer, innerSkills);
      const newOuter = buildOrbit(outerContainer, outerSkills);
      innerAngle = 0;
      outerAngle = 0;

      // Restart
      innerFrameId = startOrbitLoop(innerContainer, newInner, 28, +1);
      outerFrameId = startOrbitLoop(outerContainer, newOuter, 42, -1);
    }, 300);
  }

  window.addEventListener("resize", handleResize);
})();

// ============================================================
// 13. ABOUT ILLUSTRATION - INTERACTIVE HOVER EFFECTS
// ============================================================
(function initAboutIllustration() {
  const frame = document.querySelector(".about-illustration-frame");
  if (!frame) return;

  const glow = frame.querySelector(".about-illustration-glow");
  const image = frame.querySelector(".about-illustration");
  const glass = frame.querySelector(".about-illustration-glass");
  const badge = frame.querySelector(".about-illustration-badge");

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Check for touch device
  const isTouchDevice = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;

  if (prefersReducedMotion || isTouchDevice) {
    // Disable complex animations
    frame.style.animation = "none";
    if (glow) glow.style.display = "none";
    return;
  }

  let isHovering = false;
  let shineTriggered = false;
  let floatPaused = false;

  // Shine sweep on mouse enter (once per enter)
  function triggerShine() {
    if (shineTriggered) return;
    shineTriggered = true;
    frame.classList.add("shine-active");
    setTimeout(() => {
      frame.classList.remove("shine-active");
    }, 900);
  }

  // Mouse move handler
  function handleMouseMove(e) {
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update glow position
    if (glow) {
      glow.style.left = x + "px";
      glow.style.top = y + "px";
    }

    // 3D parallax tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    frame.style.transform = `scale(1.04) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    frame.style.transition =
      "transform 0.1s ease-out, box-shadow 0.45s cubic-bezier(0.23, 1, 0.32, 1)";

    // Slight image brightness enhancement
    if (image) {
      image.style.filter = `brightness(1.08)`;
    }
  }

  // Mouse enter handler
  function handleMouseEnter() {
    isHovering = true;
    shineTriggered = false;
    floatPaused = true;

    // Pause float animation
    frame.style.animation = "none";

    // Trigger shine
    triggerShine();
  }

  // Mouse leave handler
  function handleMouseLeave() {
    isHovering = false;
    floatPaused = false;

    // Reset glow
    if (glow) {
      glow.style.opacity = "0";
    }

    // Reset image brightness
    if (image) {
      image.style.filter = "brightness(1)";
    }

    // Reset tilt with smooth transition
    frame.style.transform = "scale(1) translateY(0) rotateX(0) rotateY(0)";
    frame.style.transition =
      "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.45s cubic-bezier(0.23, 1, 0.32, 1)";

    // Resume float animation after a delay
    setTimeout(() => {
      if (!isHovering) {
        frame.style.animation = "illustrationFloat 6s ease-in-out infinite";
      }
    }, 500);
  }

  // Attach events
  frame.addEventListener("mouseenter", handleMouseEnter);
  frame.addEventListener("mousemove", handleMouseMove);
  frame.addEventListener("mouseleave", handleMouseLeave);
})();

// ============================================================
// 13. CERTIFICATES DATA & RENDERING (Data-Driven)
// ============================================================
const certificates = [
  {
    title: "Learning Excel: Data Analysis",
    issuer: "LinkedIn Learning",
    date: "Jul 14, 2025",
    description:
      "Learned data analysis techniques including sorting, filtering, pivot tables, and advanced formulas in Microsoft Excel.",
    file: "assets/certificates/CertificateOfCompletion_Learning Excel Data Analysis.pdf",
  },
  {
    title: "Data Cleaning in Python Essential Training",
    issuer: "LinkedIn Learning",
    date: "Jul 12, 2025",
    description:
      "Learned data cleaning techniques using Python, including handling missing values, outliers, and data normalization.",
    file: "assets/certificates/CertificateOfCompletion_Data Cleaning in Python Essential Training.pdf",
  },
  {
    title: "Excel Essential Training (Microsoft 365)",
    issuer: "LinkedIn Learning",
    date: "Jul 12, 2025",
    description:
      "Learned essential Excel skills including formulas, functions, charts, and data management for Microsoft 365.",
    file: "assets/certificates/CertificateOfCompletion_Excel Essential Training Microsoft 365.pdf",
  },
  {
    title:
      "Deep Learning and Generative AI: Data Prep, Analysis, and Visualization with Python",
    issuer: "LinkedIn Learning",
    date: "Jul 02, 2025",
    description:
      "Learned deep learning and generative AI concepts with Python for data preparation, analysis, and visualization.",
    file: "assets/certificates/CertificateOfCompletion_Deep Learning and Generative AI Data Prep Analysis and Visualization with Python.pdf",
  },
  {
    title: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    date: "Jul 02, 2025",
    description:
      "Learned the fundamentals of generative AI, including its applications, tools, and impact across various industries.",
    file: "assets/certificates/CertificateOfCompletion_What Is Generative AI.pdf",
  },
  {
    title: "Introduction to Web Design and Development",
    issuer: "LinkedIn Learning",
    date: "Jun 19, 2025",
    description:
      "Learned web design and development fundamentals including HTML, responsive design, and modern web standards.",
    file: "assets/certificates/CertificateOfCompletion_Introduction to Web Design and Development.pdf",
  },
  {
    title: "SQL for Data Analysis",
    issuer: "LinkedIn Learning",
    date: "Jun 19, 2025",
    description:
      "Learned advanced SQL querying, joins, aggregations, and data analysis techniques for real-world datasets.",
    file: "assets/certificates/CertificateOfCompletion_SQL for Data Analysis.pdf",
  },
  {
    title: "Power BI for Beginners",
    issuer: "Simplilearn",
    date: "Jun 16, 2025",
    description:
      "Learned the fundamentals of Power BI including data visualization, dashboard creation, and business intelligence reporting.",
    file: "assets/certificates/Power Bi certificate.pdf",
  },
];

function getIssuerLogoHTML(issuer) {
  const logoMap = {
    "LinkedIn Learning":
      '<img src="assets/logos/linkedin-learning.svg" alt="LinkedIn Learning" />',
    Simplilearn: '<img src="assets/logos/simplilearn.svg" alt="Simplilearn" />',
    Microsoft: '<img src="assets/logos/microsoft.svg" alt="Microsoft" />',
    Udemy: '<img src="assets/logos/udemy.svg" alt="Udemy" />',
    Alison: '<img src="assets/logos/alison.svg" alt="Alison" />',
    freeCodeCamp:
      '<img src="assets/logos/freecodecamp.svg" alt="freeCodeCamp" />',
  };
  return logoMap[issuer] || '<i class="fas fa-certificate"></i>';
}

function renderCertificates() {
  const grid = document.getElementById("certsGrid");
  if (!grid) return;

  certificates.forEach((cert, index) => {
    const card = document.createElement("div");
    card.className = "cert-card";
    card.style.opacity = "0";
    card.style.transform = "translateY(40px) scale(0.95)";
    card.style.transition = `opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)`;
    card.style.transitionDelay = `${index * 0.08}s`;

    const logoHTML = getIssuerLogoHTML(cert.issuer);

    card.innerHTML = `
      <div class="cert-glass"></div>
      <div class="cert-glow"></div>
      <div class="cert-shine"></div>
      <div class="cert-card-header">
        <div class="cert-logo">
          ${logoHTML}
        </div>
        <div class="cert-card-info">
          <h3>${cert.title}</h3>
          <p class="cert-issuer">
            <i class="fas fa-building"></i> ${cert.issuer}
          </p>
          <p class="cert-year"><i class="fas fa-calendar"></i> ${cert.date}</p>
        </div>
      </div>
      <div class="cert-divider"></div>
      <p class="cert-desc">${cert.description}</p>
      <a
        href="${cert.file}"
        class="btn btn-small"
        target="_blank"
        rel="noopener"
        ><i class="fas fa-certificate"></i> View Certificate</a
      >
    `;

    grid.appendChild(card);
  });

  // Staggered entrance observer for cert cards
  const certCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
          certCardsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
  );

  const allCards = grid.querySelectorAll(".cert-card");
  allCards.forEach((el) => certCardsObserver.observe(el));

  // ----------------------------------------------------------
  // Mouse tracking, 3D parallax tilt, magnetic button
  // ----------------------------------------------------------
  allCards.forEach((card) => {
    const glow = card.querySelector(".cert-glow");
    const btn = card.querySelector(".btn-small");
    const btnIcon = btn ? btn.querySelector("i") : null;

    // Mouse move handler
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update glow position
      if (glow) {
        glow.style.left = x + "px";
        glow.style.top = y + "px";
      }

      // 3D parallax tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform =
        card.style.transform.replace(
          /translateY\([^)]+\)\s*scale\([^)]+\)/,
          "",
        ) + ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = `opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.1s ease-out`;

      // Magnetic button effect
      if (btn) {
        const btnRect = btn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        const btnDx = (e.clientX - btnCenterX) * 0.1;
        const btnDy = (e.clientY - btnCenterY) * 0.1;
        btn.style.transform = `translate(${btnDx}px, ${btnDy}px)`;
      }
    });

    // Mouse leave handler
    card.addEventListener("mouseleave", () => {
      // Reset glow
      if (glow) {
        glow.style.opacity = "0";
      }

      // Reset 3D tilt
      card.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
      card.style.transition = `opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)`;

      // Reset magnetic button
      if (btn) {
        btn.style.transform = "";
      }
    });
  });
}

renderCertificates();
