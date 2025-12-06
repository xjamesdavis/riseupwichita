// assets/app.js
// RiseUp Wichita front-end demo logic
// - Mobile nav
// - Footer year
// - Demo jobs + profiles
// - Basic click handlers for cards/buttons

document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // MOBILE NAV TOGGLE
  // ============================================
  const hamburger = document.getElementById("hamburger");
  const mobileMenu =
    document.getElementById("mobile-menu") ||
    document.getElementById("mobileNav");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
    });
  }

  // ============================================
  // FOOTER YEAR
  // ============================================
  const yearSpan = document.getElementById("year-span");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Helper: detect if we’re on the homepage (featured sections exist)
  const isHome = !!document.getElementById("featured-jobs");

  // ============================================
  // DEMO JOB DATA (15 jobs, with categories)
  // ============================================
  const demoJobs = [
    {
      id: 1,
      title: "Warehouse Associate",
      company: "ICT Logistics",
      type: "Full-time",
      pay: "$16–18/hr",
      location: "Wichita, KS",
      category: "General Labor",
      isGig: false,
      isArtistGig: false,
      description:
        "Load, move, and organize freight in a local warehouse. Must be able to lift 50 lbs and work on your feet for most of the shift."
    },
    {
      id: 2,
      title: "Cashier / Customer Service",
      company: "QuickStop Market",
      type: "Part-time",
      pay: "$14/hr",
      location: "South Wichita",
      category: "Customer Service",
      isGig: false,
      isArtistGig: false,
      description:
        "Run the register, greet customers, handle light cleaning and stocking in a small neighborhood store."
    },
    {
      id: 3,
      title: "Line Cook",
      company: "Old Town Grill",
      type: "Evenings",
      pay: "$15–17/hr + tips",
      location: "Downtown Wichita",
      category: "Food Service",
      isGig: false,
      isArtistGig: false,
      description:
        "Cook burgers, sandwiches, and bar food in a busy Old Town spot. Kitchen experience preferred."
    },
    {
      id: 4,
      title: "Lawn Care Crew Member",
      company: "316 Green Works",
      type: "Seasonal",
      pay: "$17/hr",
      location: "West Wichita",
      category: "Landscaping",
      isGig: true,
      isArtistGig: false,
      description:
        "Mowing, trimming, and basic yard cleanups. Most work is on the west side and Goddard area."
    },
    {
      id: 5,
      title: "House Cleaner (Residential)",
      company: "FreshStart Cleaning",
      type: "Gig / Flexible",
      pay: "$20/hr",
      location: "Wichita Metro",
      category: "Cleaning",
      isGig: true,
      isArtistGig: false,
      description:
        "Flexible residential cleaning gigs across Wichita. Great for people who like working solo with repeat clients."
    },
    {
      id: 6,
      title: "Delivery Driver",
      company: "ICT Courier",
      type: "Full-time",
      pay: "$18/hr + mileage",
      location: "Wichita, KS",
      category: "Delivery",
      isGig: false,
      isArtistGig: false,
      description:
        "Deliver small packages around the 316. Company vehicle provided. Clean driving record required."
    },
    {
      id: 7,
      title: "In-Home Caregiver",
      company: "Sunflower Care",
      type: "Part-time",
      pay: "$16–19/hr",
      location: "East Wichita",
      category: "Caregiving",
      isGig: false,
      isArtistGig: false,
      description:
        "Help seniors with light housekeeping, meals, and companionship in their homes. Experience a plus but not required."
    },
    {
      id: 8,
      title: "Dishwasher",
      company: "Riverfest Bistro",
      type: "Evenings",
      pay: "$14/hr",
      location: "Downtown Wichita",
      category: "Food Service",
      isGig: false,
      isArtistGig: false,
      description:
        "Back-of-house role washing dishes, basic cleaning, and helping prep as needed in a downtown restaurant."
    },
    {
      id: 9,
      title: "Fence Painter",
      company: "RiseUp Projects",
      type: "Weekend gig",
      pay: "$200/day",
      location: "Wichita, KS",
      category: "General Labor",
      isGig: true,
      isArtistGig: false,
      description:
        "Weekend fence and small exterior paint jobs. Great side money for someone who can show up and finish work on time."
    },
    {
      id: 10,
      title: "Snow Removal / Seasonal",
      company: "ICT Property Services",
      type: "On-call",
      pay: "$25/hr",
      location: "Wichita, KS",
      category: "Seasonal",
      isGig: true,
      isArtistGig: false,
      description:
        "Clear sidewalks and small parking lots during snow and ice events. Work is on call when storms hit."
    },
    {
      id: 11,
      title: "Front Desk Associate",
      company: "ICT Fitness",
      type: "Full-time",
      pay: "$15/hr",
      location: "North Wichita",
      category: "Customer Service",
      isGig: false,
      isArtistGig: false,
      description:
        "Check members in, handle basic sales, and keep the gym clean and welcoming."
    },
    {
      id: 12,
      title: "Barista",
      company: "Keeper Coffee Co.",
      type: "Part-time",
      pay: "$12–14/hr + tips",
      location: "Delano District",
      category: "Food Service",
      isGig: false,
      isArtistGig: false,
      description:
        "Make coffee drinks, take orders, and help keep a small local coffee shop running smooth."
    },
    {
      id: 13,
      title: "Live Band for Friday Nights",
      company: "Delano Taproom",
      type: "Gig / Contract",
      pay: "$350–500/night",
      location: "Delano District",
      category: "Artist / Music",
      isGig: true,
      isArtistGig: true,
      description:
        "Local bar seeking a 3–5 piece band to play classic rock and country covers on Friday nights."
    },
    {
      id: 14,
      title: "Acoustic Solo / Open Mic Host",
      company: "Old Town Acoustic Lounge",
      type: "Weekly gig",
      pay: "$150 + tips",
      location: "Old Town, Wichita",
      category: "Artist / Music",
      isGig: true,
      isArtistGig: true,
      description:
        "Host an open mic night, play 2–3 short sets, and keep the crowd engaged. Perfect for solo artists."
    },
    {
      id: 15,
      title: "Door Staff / Bar Security",
      company: "Keeper Bar & Grill",
      type: "Nights / Weekends",
      pay: "$18–20/hr",
      location: "Downtown Wichita",
      category: "Security",
      isGig: false,
      isArtistGig: false,
      description:
        "Check IDs, keep an eye on the door, and help keep guests safe at a busy downtown bar."
    }
  ];

  // ============================================
  // DEMO PROFILES (15 workers)
  // ============================================
  const avatarPlaceholder = "assets/avatar-placeholder.png";

  const demoProfiles = [
    {
      id: 1,
      name: "John Smith",
      headline: "Construction • Handyman • Delivery",
      locationArea: "West side • Wichita, KS",
      categories: ["Construction", "Handyman", "Delivery"],
      highlights: [
        "Fence repair and basic carpentry",
        "Comfortable with ladders & power tools",
        "Pickup truck available for small moves"
      ]
    },
    {
      id: 2,
      name: "Maria Lopez",
      headline: "Caregiving • Cleaning • Food Service",
      locationArea: "South Wichita, KS",
      categories: ["Caregiving", "Cleaning", "Food Service"],
      highlights: [
        "5+ years caregiving experience",
        "Fluent in English & Spanish",
        "Comfortable with pets and kids"
      ]
    },
    {
      id: 3,
      name: "Derrick Johnson",
      headline: "Landscaping • Fence Painting",
      locationArea: "East Wichita, KS",
      categories: ["Landscaping", "General Labor"],
      highlights: [
        "Mowing, trimming, and seasonal cleanups",
        "Fence and deck painting/staining",
        "Owns basic landscaping equipment"
      ]
    },
    {
      id: 4,
      name: "Ashley Brown",
      headline: "Childcare • Housekeeping",
      locationArea: "Wichita Metro",
      categories: ["Childcare", "Cleaning"],
      highlights: [
        "CPR certified",
        "Experience with infants and toddlers",
        "Light housekeeping and meal prep"
      ]
    },
    {
      id: 5,
      name: "Michael Davis",
      headline: "Basic IT • Device Setup",
      locationArea: "North Wichita, KS",
      categories: ["IT / Tech Help"],
      highlights: [
        "Windows + basic Mac troubleshooting",
        "Phone/computer setup and cleanup",
        "Home Wi-Fi and printer setup"
      ]
    },
    {
      id: 6,
      name: "Emily Carter",
      headline: "Social Media • Content Posting",
      locationArea: "Downtown Wichita, KS",
      categories: ["Social Media", "Marketing"],
      highlights: [
        "Short-form content posting (Reels/TikTok)",
        "Basic Canva designs",
        "Help local businesses stay consistent online"
      ]
    },
    {
      id: 7,
      name: "Carlos Hernandez",
      headline: "Warehouse • Forklift Certified",
      locationArea: "West Wichita, KS",
      categories: ["General Labor", "Warehouse"],
      highlights: [
        "Forklift certified",
        "Shipping/receiving experience",
        "Comfortable in fast-paced environments"
      ]
    },
    {
      id: 8,
      name: "Sarah Miller",
      headline: "Front Desk • Admin Support",
      locationArea: "East Wichita, KS",
      categories: ["Admin", "Customer Service"],
      highlights: [
        "Phone, email, and in-person support",
        "Basic Excel and Google Sheets",
        "Appointment scheduling experience"
      ]
    },
    {
      id: 9,
      name: "Robert White",
      headline: "Painting • Minor Repairs",
      locationArea: "Wichita, KS",
      categories: ["Handyman", "Painting"],
      highlights: [
        "Interior room painting",
        "Small drywall patching",
        "Minor home repairs and touch-ups"
      ]
    },
    {
      id: 10,
      name: "Jessica Lee",
      headline: "Food Service • Event Staff",
      locationArea: "Old Town, Wichita, KS",
      categories: ["Food Service", "Events"],
      highlights: [
        "Serving and bar-back experience",
        "Banquet and event setup",
        "Comfortable with nights and weekends"
      ]
    },
    {
      id: 11,
      name: "Kevin Adams",
      headline: "General Labor • Moving Help",
      locationArea: "Wichita Metro",
      categories: ["General Labor", "Moving"],
      highlights: [
        "Move furniture and appliances",
        "Garage and basement clean-outs",
        "Truck access sometimes available"
      ]
    },
    {
      id: 12,
      name: "Olivia Green",
      headline: "Tutoring (K–8) • Homework Help",
      locationArea: "Wichita, KS",
      categories: ["Tutoring"],
      highlights: [
        "Reading and math support (K–8)",
        "Homework check-ins over video or in person",
        "Experience in after-school programs"
      ]
    },
    {
      id: 13,
      name: "Andre Thompson",
      headline: "Janitorial • Night Cleaning",
      locationArea: "Downtown / East Wichita",
      categories: ["Cleaning", "Janitorial"],
      highlights: [
        "Office and small business cleaning",
        "Night shift preferred",
        "Floor buffing experience"
      ]
    },
    {
      id: 14,
      name: "Hannah Wilson",
      headline: "Customer Service • Call Support",
      locationArea: "Remote-friendly • Wichita, KS",
      categories: ["Customer Service"],
      highlights: [
        "Phone and chat support",
        "Basic CRM experience",
        "Works well with scripts and KPIs"
      ]
    },
    {
      id: 15,
      name: "Marcus Brown",
      headline: "Security • Door Staff",
      locationArea: "Downtown Wichita, KS",
      categories: ["Security"],
      highlights: [
        "Bar and event door work",
        "De-escalation focused",
        "Comfortable with late nights"
      ]
    }
  ];

  // ============================================
  // RENDER HELPERS
  // ============================================
  const jobsGrid = document.getElementById("jobs-grid");
  const profilesGrid = document.getElementById("profiles-grid");

  function renderJobCard(job) {
    const card = document.createElement("div");
    card.className = "card job-card";
    card.dataset.jobId = String(job.id);

    card.innerHTML = `
      <h3 class="job-title">${job.title}</h3>
      <p class="company">${job.company}</p>
      <p class="small">${job.type} • ${job.location}</p>
      <p class="small"><strong>${job.pay}</strong></p>
      <p class="small muted">${job.category}${
        job.isGig ? " • Gig / Flexible" : ""
      }${job.isArtistGig ? " • Artist / Music" : ""}</p>
      <div class="card-foot">
        <button class="btn small" data-action="view-job" data-job-id="${job.id}">
          View Details
        </button>
        <button class="btn primary small" data-action="apply-job" data-job-id="${job.id}">
          I'm Interested
        </button>
      </div>
    `;
    return card;
  }

  function renderProfileCard(profile) {
    const firstName = profile.name.split(" ")[0] || "Worker";
    const card = document.createElement("div");
    card.className = "card profile-card";
    card.dataset.profileId = String(profile.id);

    card.innerHTML = `
      <img src="${avatarPlaceholder}" alt="${profile.name}" class="profile-avatar">
      <h3 class="profile-name">${profile.name}</h3>
      <p class="muted">${profile.headline}</p>
      <p class="small">${profile.locationArea}</p>
      ${
        profile.categories && profile.categories.length
          ? `<p class="small muted">${profile.categories.join(" • ")}</p>`
          : ""
      }
      <div class="card-foot">
        <button class="btn small" data-action="view-profile" data-profile-id="${profile.id}">
          View Details
        </button>
        <button class="btn primary small" data-action="hire-profile" data-profile-id="${profile.id}">
          Hire ${firstName}
        </button>
      </div>
    `;
    return card;
  }

  // ============================================
  // RENDER JOBS (HOME vs JOBS PAGE)
  // ============================================
  if (jobsGrid) {
    jobsGrid.innerHTML = "";
    const jobsToShow = isHome ? demoJobs.slice(0, 5) : demoJobs;
    jobsToShow.forEach((job) => jobsGrid.appendChild(renderJobCard(job)));

    // Click handlers for job buttons
    jobsGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      const action = btn.getAttribute("data-action");
      const id = Number(btn.getAttribute("data-job-id"));
      const job = demoJobs.find((j) => j.id === id);
      if (!job) return;

      if (action === "view-job") {
        alert(
          [
            `${job.title} @ ${job.company}`,
            `${job.type} • ${job.location}`,
            `${job.pay}`,
            "",
            job.description
          ].join("\n")
        );
      }

      if (action === "apply-job") {
        alert(
          [
            `You clicked "I'm Interested" for:`,
            `${job.title} @ ${job.company}`,
            "",
            "In the next phase, this will open a short form so you can apply through RiseUp Wichita and let James handle the follow-up with the employer."
          ].join("\n")
        );
      }
    });
  }

  // ============================================
  // RENDER PROFILES (HOME vs PROFILES PAGE)
  // ============================================
  if (profilesGrid) {
    profilesGrid.innerHTML = "";
    const profilesToShow = isHome ? demoProfiles.slice(0, 5) : demoProfiles;
    profilesToShow.forEach((p) => profilesGrid.appendChild(renderProfileCard(p)));

    // Click handlers for profile buttons
    profilesGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      const action = btn.getAttribute("data-action");
      const id = Number(btn.getAttribute("data-profile-id"));
      const profile = demoProfiles.find((p) => p.id === id);
      if (!profile) return;

      const firstName = profile.name.split(" ")[0] || "this worker";

      if (action === "view-profile") {
        alert(
          [
            profile.name,
            profile.headline,
            profile.locationArea,
            "",
            "What they can help with:",
            ...(profile.highlights || [])
          ].join("\n")
        );
      }

      if (action === "hire-profile") {
        alert(
          [
            `You clicked "Hire ${firstName}".`,
            "",
            "Next step in the build:",
            "- Open a clean form where the job poster enters:",
            "  • Name / email / phone",
            "  • What they need done and when",
            "  • Hours and pay",
            "Then James will act as the middle-man and handle payment through Stripe so workers in Wichita get paid right."
          ].join("\n")
        );
      }
    });
  }

  // ============================================
  // EXISTING PROFILE MODAL (IF PRESENT)
  // ============================================
  // Keep this logic so the 'Create Profile' button still opens the modal
  const profileModal = document.getElementById("profile-modal");
  const profileForm = document.getElementById("profile-form");
  const closeProfileModalBtn = document.getElementById("close-profile-modal");
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
  if (profileModal) {
    profileModal.addEventListener("click", (e) => {
      if (e.target === profileModal) closeProfileModal();
    });
  }

  // When someone actually fills out the Create Profile form,
  // we’ll build a local card and drop it onto the profiles grid.
  if (profileForm && profilesGrid) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(profileForm);
      const first = (formData.get("first") || "").toString().trim();
      const last = (formData.get("last") || "").toString().trim();
      const primary = (formData.get("primary") || "").toString().trim();
      const spec1 = (formData.get("spec1") || "").toString().trim();
      const spec2 = (formData.get("spec2") || "").toString().trim();

      const fullName = `${first} ${last}`.trim() || "New Worker";
      const categories = [primary, spec1, spec2].filter(Boolean);
      const newProfile = {
        id: Date.now(),
        name: fullName,
        headline: categories.length ? categories.join(" • ") : "Local worker",
        locationArea: "Wichita, KS",
        categories,
        highlights: []
      };

      profilesGrid.appendChild(renderProfileCard(newProfile));
      profileForm.reset();
      closeProfileModal();

      alert(
        [
          "Profile created (demo only).",
          "",
          "In the full version, this will be saved to Firestore and tied to a Google login so people can come back and update their info."
        ].join("\n")
      );
    });
  }

  // ============================================
  // RESUME DEMO FORM (IF PRESENT)
  // ============================================
  const resumeForm = document.getElementById("resume-demo-form");
  if (resumeForm) {
    resumeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        [
          "Your resume details have been captured in this demo.",
          "",
          "Next phase:",
          "- Wire this up to a backend (Google Sheets / Firestore)",
          "- Generate a shareable URL for your resume",
          "- Attach it to your RiseUp Wichita profile automatically."
        ].join("\n")
      );
    });
  }
});
