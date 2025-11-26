/* ============================================================= */
/* FOOTER YEAR */
/* ============================================================= */

const yearSpan = document.getElementById("year-span");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}



/* ============================================================= */
/* MOBILE HAMBURGER MENU (MOBILE ONLY) */
/* ============================================================= */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

// Hide burger completely on desktop
function checkWidth() {
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove("show");
  }
}

window.addEventListener("resize", checkWidth);
checkWidth();

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");

    const expanded = mobileMenu.classList.contains("show");
    hamburger.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
}



/* ============================================================= */
/* DEMO DATA: JOBS (15) */
/* ============================================================= */

const demoJobs = [
  { title:"Warehouse Associate", company:"ICT Logistics", location:"Wichita, KS", type:"Full-time" },
  { title:"Customer Service Rep", company:"Sunflower Call Center", location:"Remote / Wichita", type:"Part-time" },
  { title:"Line Cook", company:"Old Town Grill", location:"Downtown Wichita", type:"Evenings" },
  { title:"Lawn Care Crew", company:"316 Yard Pros", location:"West Wichita", type:"Seasonal" },
  { title:"Front Desk Clerk", company:"Keeper Inn", location:"Downtown Wichita", type:"Full-time" },
  { title:"House Painter", company:"RiseUp Painting", location:"Across ICT", type:"Contract" },
  { title:"Fence Installer", company:"Heartland Fencing", location:"Wichita area", type:"Project work" },
  { title:"Delivery Driver", company:"Local Eats", location:"Wichita, KS", type:"Gig / Flexible" },
  { title:"Retail Associate", company:"Towne East Shop", location:"Towne East Mall", type:"Part-time" },
  { title:"Caretaker", company:"River City Senior Care", location:"East Wichita", type:"Weekends" },
  { title:"Light Cleaner", company:"ICT Clean Team", location:"Citywide", type:"Nights" },
  { title:"Data Entry Helper", company:"Back Office 316", location:"Remote", type:"Project" },
  { title:"Event Setup Crew", company:"Arena Support", location:"Downtown ICT", type:"On-call" },
  { title:"Dog Walker", company:"Wichita Pet Friends", location:"Neighborhoods across ICT", type:"Gig" },
  { title:"Handyman", company:"FixIt Wichita", location:"Wichita Metro", type:"Per job" }
];


function renderJobCard(job) {
  return `
    <article class="card">
      <h3 class="job-title">${job.title}</h3>
      <p class="company">${job.company}</p>
      <p class="small">${job.location}</p>
      <div class="card-foot">
        <span class="small">${job.type}</span>
        <button class="btn small-btn">Details</button>
      </div>
    </article>
  `;
}



/* ============================================================= */
/* DEMO DATA: PROFILES (15) */
/* ============================================================= */

const demoProfiles = [
  { name:"Marcus H.", primary:"Warehouse & Forklift", skills:["Forklift","Inventory","Shipping","Overnights"] },
  { name:"Sarah L.", primary:"Remote CSR / Sales", skills:["Call Center","Chat Support","CRM","Upselling"] },
  { name:"Jose R.", primary:"Landscaping & Lawn Care", skills:["Mowing","Trimming","Leaf Cleanup","Snow Removal"] },
  { name:"Tina K.", primary:"Childcare & Tutor", skills:["K-5 Tutor","Babysitting","Homework Help"] },
  { name:"Andre P.", primary:"General Labor / Moving", skills:["Loading","Unloading","Furniture Assembly"] },
  { name:"Emily W.", primary:"Server / Bartender", skills:["POS","Cocktails","Customer Service"] },
  { name:"Jason D.", primary:"Painting & Drywall", skills:["Interior Paint","Drywall Patch","Prep Work"] },
  { name:"Nate C.", primary:"IT / Helpdesk", skills:["PC Setup","Troubleshooting","Networking"] },
  { name:"Haley S.", primary:"House Cleaning", skills:["Deep Clean","Move-out","Weekly"] },
  { name:"Derrick F.", primary:"Security / Events", skills:["Crowd Control","Night Shift","Patrol"] },
  { name:"Claire B.", primary:"Office Admin", skills:["Typing","Scheduling","MS Office"] },
  { name:"Brandon M.", primary:"Construction Helper", skills:["Demo","Site Clean-up","Tools"] },
  { name:"Lydia G.", primary:"Social Media", skills:["Reels","Content","Branding"] },
  { name:"Omar J.", primary:"Auto Detailer", skills:["Interior","Exterior","Full Detail"] },
  { name:"Chloe T.", primary:"Dog Groomer", skills:["Bathing","Nail Trim","Large & Small Breeds"] }
];


function renderProfileCard(profile) {
  const initials = profile.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return `
    <article class="card">
      <div class="profile-avatar">${initials}</div>
      <h3 class="profile-name">${profile.name}</h3>
      <p class="profile-primary">${profile.primary}</p>
      <div class="profile-skills">
        ${profile.skills.map(s => `<span class="skill-pill">${s}</span>`).join("")}
      </div>
    </article>
  `;
}



/* ============================================================= */
/* RENDER JOBS + PROFILES ON HOMEPAGE */
/* ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Jobs
  const jobsGrid = document.getElementById("jobs-grid");
  if (jobsGrid) {
    jobsGrid.innerHTML = demoJobs.slice(0, 6).map(renderJobCard).join("");
  }

  // Profiles
  const profilesGrid = document.getElementById("profiles-grid");
  if (profilesGrid) {
    profilesGrid.innerHTML = demoProfiles.slice(0, 6).map(renderProfileCard).join("");
  }

});
