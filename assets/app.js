// assets/app.js

document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // MOBILE NAV TOGGLE
  // ============================================
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu") || document.getElementById("mobileNav");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
    });
  }

  // ============================================
  // YEAR IN FOOTER
  // ============================================
  const yearSpan = document.getElementById("year-span");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ============================================
  // DEMO JOBS
  // ============================================
  const jobsGrid = document.getElementById("jobs-grid");

  const demoJobs = [
    { title: "Warehouse Associate", company: "ICT Logistics", type: "Full-time", pay: "$16–18/hr", location: "Wichita, KS" },
    { title: "Cashier / Customer Service", company: "QuickStop Market", type: "Part-time", pay: "$14/hr", location: "Wichita, KS" },
    { title: "Line Cook", company: "Old Town Grill", type: "Evenings", pay: "$15–17/hr + tips", location: "Downtown Wichita" },
    { title: "Lawn Care Crew", company: "316 Green Works", type: "Seasonal", pay: "$17/hr", location: "West Wichita" },
    { title: "House Cleaner", company: "FreshStart Cleaning", type: "Gig / Flexible", pay: "$20/hr", location: "Wichita Metro" },
    { title: "Delivery Driver", company: "ICT Courier", type: "Full-time", pay: "$18/hr + mileage", location: "Wichita, KS" },
    { title: "Caregiver (In-Home)", company: "Sunflower Care", type: "Part-time", pay: "$16–19/hr", location: "East Wichita" },
    { title: "Dishwasher", company: "Riverfest Bistro", type: "Evenings", pay: "$14/hr", location: "Downtown Wichita" },
    { title: "Fence Painter", company: "RiseUp Projects", type: "Weekend gig", pay: "$200/day", location: "Wichita, KS" },
    { title: "Snow Removal / Seasonal", company: "ICT Property Services", type: "On call", pay: "$25/hr", location: "Wichita, KS" },
    { title: "Front Desk Associate", company: "ICT Fitness", type: "Full-time", pay: "$15/hr", location: "N. Wichita" },
    { title: "Barista", company: "Keeper Coffee Co.", type: "Part-time", pay: "$12–14/hr + tips", location: "Delano District" },
    { title: "Dog Walker / Pet Sitter", company: "Wichita Pet Care", type: "Gig / Flexible", pay: "$18–22/hr", location: "Wichita Metro" },
    { title: "Basic Handyman", company: "Neighbor Help Network", type: "Gig / Project", pay: "$25/hr", location: "316 Area" },
    { title: "Event Staff", company: "Riverfest Events", type: "Temporary", pay: "$16/hr", location: "Downtown Wichita" }
  ];

  if (jobsGrid) {
    jobsGrid.innerHTML = "";
    demoJobs.forEach(job => {
      const card = document.createElement("div");
      card.className = "card job-card";
      card.innerHTML = `
        <h3 class="job-title">${job.title}</h3>
        <p class="company">${job.company}</p>
        <p class="small">${job.type} • ${job.location}</p>
        <p class="small"><strong>${job.pay}</strong></p>
        <div class="card-foot">
          <button class="btn primary btn-sm">I'm Interested</button>
        </div>
      `;
      jobsGrid.appendChild(card);
    });
  }

  // ============================================
  // DEMO PROFILES + AVATARS
  // ============================================
  const profilesGrid = document.getElementById("profiles-grid");
  const avatarPlaceholder = "assets/avatar-placeholder.png";

  const demoProfiles = [
    { name: "John Smith", role: "Construction, Handyman, Delivery", email: "john.smith@email.com" },
    { name: "Maria Lopez", role: "Caregiving, Cleaning, Food Service", email: "maria.lopez@email.com" },
    { name: "Derrick Johnson", role: "Landscaping, Fence Painting", email: "derrick.johnson@email.com" },
    { name: "Ashley Brown", role: "Childcare, Housekeeping", email: "ashley.brown@email.com" },
    { name: "Michael Davis", role: "Basic IT, Device Setup", email: "michael.davis@email.com" },
    { name: "Emily Carter", role: "Social Media, Content Posting", email: "emily.carter@email.com" },
    { name: "Carlos Hernandez", role: "Warehouse, Forklift Certified", email: "carlos.hdz@email.com" },
    { name: "Sarah Miller", role: "Front Desk, Admin Support", email: "sarah.miller@email.com" },
    { name: "Robert White", role: "Painting, Minor Repairs", email: "robert.white@email.com" },
    { name: "Jessica Lee", role: "Food Service, Event Staff", email: "jessica.lee@email.com" },
    { name: "Kevin Adams", role: "General Labor, Moving Help", email: "kevin.adams@email.com" },
    { name: "Olivia Green", role: "Tutoring (K–8)", email: "olivia.green@email.com" },
    { name: "Andre Thompson", role: "Janitorial, Night Cleaning", email: "andre.thompson@email.com" },
    { name: "Hannah Wilson", role: "Customer Service, Call Support", email: "hannah.wilson@email.com" },
    { name: "Marcus Brown", role: "Security, Door Staff", email: "marcus.brown@email.com" }
  ];

  function renderProfileCard(profile) {
    const card = document.createElement("div");
    card.className = "card profile-card";
    const avatarSrc = profile.avatarUrl || avatarPlaceholder;

    card.innerHTML = `
      <img src="${avatarSrc}" alt="${profile.name}" class="profile-avatar">
      <h3>${profile.name}</h3>
      <p class="muted">${profile.role}</p>
      <p class="small"><strong>Email:</strong> ${profile.email}</p>
      <div class="card-foot">
        <button class="btn small">View Resume</button>
        <button class="btn primary small">Contact</button>
      </div>
    `;
    return card;
  }

  if (profilesGrid) {
    profilesGrid.innerHTML = "";
    demoProfiles.forEach(p => profilesGrid.appendChild(renderProfileCard(p)));
  }

  // ============================================
  // CREATE PROFILE MODAL + AVATAR UPLOAD
  // ============================================
  const profileModal = document.getElementById("profile-modal");
  const profileForm = document.getElementById("profile-form");
  const closeProfileModalBtn = document.getElementById("close-profile-modal");

  // If you have a "Create Profile" button somewhere with id="cta-create"
  const ctaCreate = document.getElementById("cta-create");

  function openProfileModal() {
    if (profileModal) profileModal.style.display = "block";
  }

  function closeProfileModal() {
    if (profileModal) profileModal.style.display = "none";
  }

  if (ctaCreate && profileModal) {
    ctaCreate.addEventListener("click", openProfileModal);
  }

  if (closeProfileModalBtn) {
    closeProfileModalBtn.addEventListener("click", closeProfileModal);
  }

  // Close modal when clicking outside panel
  if (profileModal) {
    profileModal.addEventListener("click", (e) => {
      if (e.target === profileModal) {
        closeProfileModal();
      }
    });
  }

  // Handle profile form + avatar upload
  if (profileForm && profilesGrid) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(profileForm);
      const first = formData.get("first") || "";
      const last = formData.get("last") || "";
      const email = formData.get("email") || "";
      const primary = formData.get("primary") || "";
      const spec1 = formData.get("spec1") || "";
      const spec2 = formData.get("spec2") || "";
      const avatarFile = formData.get("avatar");

      const fullName = `${first} ${last}`.trim();
      const roleParts = [primary, spec1, spec2].filter(Boolean);
      const roleText = roleParts.join(" • ") || "Local worker";

      let avatarUrl = null;
      if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
        avatarUrl = URL.createObjectURL(avatarFile);
      }

      const newProfile = {
        name: fullName || "New Worker",
        role: roleText,
        email: email || "N/A",
        avatarUrl
      };

      profilesGrid.appendChild(renderProfileCard(newProfile));

      profileForm.reset();
      closeProfileModal();
    });
  }

  // ============================================
  // RESUME DEMO FORM (LOCAL ONLY)
  // ============================================
  const resumeForm = document.getElementById("resume-demo-form");
  if (resumeForm) {
    resumeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // For now, just prevent reload. In the future, hook this to backend.
      alert("Your resume info has been captured locally for this demo. In the full version, it will be saved to your profile.");
    });
  }
});
