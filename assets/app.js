// UI logic: specialties enforcement, avatar upload, improved resume builder, demo badges
(() => {
  const isLoggedIn = () => !!localStorage.getItem('ruf_profile');
  const getProfile = () => JSON.parse(localStorage.getItem('ruf_profile') || 'null');

  // Specialty options mapped by primary category
  const specialtyMap = {
    'Construction': ['Carpentry','Demolition','Painting','Framing'],
    'Graphic Artist': ['Logo Design','Print Layout','Digital Illustration','Branding'],
    'Food Service': ['Line Cook','Server','Food Prep','Cash Handling'],
    'Landscaping': ['Mowing','Mulching','Hedge Trimming','Irrigation'],
    'Cleaning': ['Deep Clean','Sanitization','Office Clean','Carpet Cleaning'],
    'Delivery': ['Courier','Grocery Deliveries','Heavy Lifting','Route Driving'],
    'Caregiving': ['Child Care','Elder Care','Respite Care','Medication Support'],
    'Handyman': ['Minor Repairs','Assembly','Plumbing Basics','Electrical Basics']
  };

  // Demo profiles (15) - GPT generated style names
  const demoProfiles = [
    {id:'p1',first:'Ava',last:'Morrison',email:'ava.morrison@example.com',phone:'(316) 555-0101',primary:'Graphic Artist',specialties:['Logo Design','Print Layout'],bio:'Creative designer focused on clear branding.',resumeAttached:true,demo:true,avatar:null},
    {id:'p2',first:'Liam',last:'Parker',email:'liam.parker@example.com',phone:'(316) 555-0102',primary:'Landscaping',specialties:['Mowing','Mulching'],bio:'Detail-oriented outdoor worker.',resumeAttached:true,demo:true,avatar:null},
    {id:'p3',first:'Maya',last:'Singh',email:'maya.singh@example.com',phone:'(316) 555-0103',primary:'Caregiving',specialties:['Child Care','Elder Care'],bio:'Reliable and compassionate caregiver.',resumeAttached:false,demo:true,avatar:null},
    {id:'p4',first:'Noah',last:'Garcia',email:'noah.garcia@example.com',phone:'(316) 555-0104',primary:'Delivery',specialties:['Local Routes','Heavy Lifting'],bio:'Punctual driver with clean record.',resumeAttached:false,demo:true,avatar:null},
    {id:'p5',first:'Olivia',last:'Reed',email:'olivia.reed@example.com',phone:'(316) 555-0105',primary:'Food Service',specialties:['Line Cook','Front of House'],bio:'Customer-focused server and cook.',resumeAttached:true,demo:true,avatar:null},
    {id:'p6',first:'Ethan',last:'Brooks',email:'ethan.brooks@example.com',phone:'(316) 555-0106',primary:'Handyman',specialties:['Minor Repairs','Assembly'],bio:'Practical problem solver.',resumeAttached:true,demo:true,avatar:null},
    {id:'p7',first:'Sophia',last:'Lopez',email:'sophia.lopez@example.com',phone:'(316) 555-0107',primary:'Cleaning',specialties:['Deep Clean','Sanitization'],bio:'Thorough and efficient.',resumeAttached:false,demo:true,avatar:null},
    {id:'p8',first:'Mason',last:'Cruz',email:'mason.cruz@example.com',phone:'(316) 555-0108',primary:'Construction',specialties:['Demolition','Carpentry'],bio:'Skilled with tools and teamwork.',resumeAttached:true,demo:true,avatar:null},
    {id:'p9',first:'Isabella',last:'Nguyen',email:'isabella.nguyen@example.com',phone:'(316) 555-0109',primary:'Graphic Artist',specialties:['Digital Illustration','Social Media'],bio:'Versatile artist for digital campaigns.',resumeAttached:false,demo:true,avatar:null},
    {id:'p10',first:'Logan',last:'Kim',email:'logan.kim@example.com',phone:'(316) 555-01010',primary:'Delivery',specialties:['Courier','Customer Service'],bio:'Friendly and efficient courier.',resumeAttached:true,demo:true,avatar:null},
    {id:'p11',first:'Emma',last:'Dawson',email:'emma.dawson@example.com',phone:'(316) 555-0111',primary:'Food Service',specialties:['Prep Cook','Cash Handling'],bio:'Fast learner in busy kitchens.',resumeAttached:false,demo:true,avatar:null},
    {id:'p12',first:'Lucas',last:'Reyes',email:'lucas.reyes@example.com',phone:'(316) 555-0112',primary:'Cleaning',specialties:['Office Clean','Event Clean'],bio:'Reliable cleaner for recurring gigs.',resumeAttached:true,demo:true,avatar:null},
    {id:'p13',first:'Amelia',last:'Price',email:'amelia.price@example.com',phone:'(316) 555-0113',primary:'Caregiving',specialties:['Respite Care','Medication Reminders'],bio:'Patient and compassionate.',resumeAttached:true,demo:true,avatar:null},
    {id:'p14',first:'James',last:'Ford',email:'james.ford@example.com',phone:'(316) 555-0114',primary:'Handyman',specialties:['Plumbing Basics','Furniture Assembly'],bio:'Efficient problem solver.',resumeAttached:false,demo:true,avatar:null},
    {id:'p15',first:'Zoe',last:'Hart',email:'zoe.hart@example.com',phone:'(316) 555-0115',primary:'Graphic Artist',specialties:['Poster Design','Branding'],bio:'Bold visual communicator.',resumeAttached:true,demo:true,avatar:null}
  ];

  // Demo jobs (same as before)
  const demoJobs = [
    {id:'j1',title:'Event Poster Designer',company:'Blue Oak Co',location:'Wichita, KS',category:'Graphic Artist',salary:'$20/hr',posted:'2 days ago',description:'Design a striking poster and social assets for a local community concert.',contact:{name:'Jordan Hale',email:'jordan.hale@blueoak.example',phone:'(316) 444-1001'}},
    {id:'j2',title:'Residential Lawn Care',company:'GreenThumb',location:'Wichita, KS',category:'Landscaping',salary:'$18/hr',posted:'1 day ago',description:'Mow and edge several yards weekly for a set of homeowners.',contact:{name:'A. Rivera',email:'contact@greenthumb.example',phone:'(316) 444-1002'}},
    {id:'j3',title:'Kitchen Line Cook',company:'Sunrise Diner',location:'Wichita, KS',category:'Food Service',salary:'$15/hr',posted:'3 days ago',description:'Prepare breakfast items and maintain a clean station.',contact:{name:'Manager',email:'hire@sunrisediner.example',phone:'(316) 444-1003'}},
    {id:'j4',title:'House Cleaner (2BR)',company:'SparkleHomes',location:'Wichita, KS',category:'Cleaning',salary:'$16/hr',posted:'4 days ago',description:'Deep-clean a 2 bedroom house after move-out.',contact:{name:'S. Matthews',email:'smatthews@sparkle.example',phone:'(316) 444-1004'}},
    {id:'j5',title:'Local Delivery Driver',company:'QuickShip',location:'Wichita, KS',category:'Delivery',salary:'$18-$22/hr',posted:'Today',description:'Deliver packages within city limits, must lift up to 50 lbs.',contact:{name:'Hiring',email:'jobs@quickship.example',phone:'(316) 444-1005'}},
    {id:'j6',title:'Graphic Social Tiles',company:'Hatch Studio',location:'Remote/Wichita',category:'Graphic Artist',salary:'$22/hr',posted:'5 days ago',description:'Create social-media tile series for a startup campaign.',contact:{name:'R. Lee',email:'rlee@hatch.example',phone:'(316) 444-1006'}},
    {id:'j7',title:'Furniture Assembler',company:'HandyWorks',location:'Wichita, KS',category:'Handyman',salary:'$17/hr',posted:'6 days ago',description:'Assemble and install flat-pack furniture at a client home.',contact:{name:'A. Norton',email:'anorton@handy.example',phone:'(316) 444-1007'}},
    {id:'j8',title:'Event Setup Crew',company:'City Events',location:'Wichita, KS',category:'Construction',salary:'$15/hr',posted:'2 days ago',description:'Help set up chairs, booths, and signage for a weekend festival.',contact:{name:'Coordinator',email:'events@city.example',phone:'(316) 444-1008'}},
    {id:'j9',title:'Elder Companion',company:'CareFirst',location:'Wichita, KS',category:'Caregiving',salary:'$14/hr',posted:'3 days ago',description:'Provide companionship and light assistance to an elderly client.',contact:{name:'Case Manager',email:'care@carefirst.example',phone:'(316) 444-1009'}},
    {id:'j10',title:'Office Deep Clean',company:'CleanCo',location:'Wichita, KS',category:'Cleaning',salary:'$16/hr',posted:'1 week ago',description:'Deep clean a small office suite after hours.',contact:{name:'Manager',email:'office@cleanco.example',phone:'(316) 444-1010'}},
    {id:'j11',title:'Graphic Branding Kit',company:'Studio Arc',location:'Wichita, KS',category:'Graphic Artist',salary:'$30/hr',posted:'2 days ago',description:'Create a small branding kit: logo, colors, and type.',contact:{name:'Lead',email:'hello@studioarc.example',phone:'(316) 444-1011'}},
    {id:'j12',title:'Grocery Delivery',company:'NeighborCart',location:'Wichita, KS',category:'Delivery',salary:'$14/hr',posted:'Today',description:'Pick-up and deliver grocery orders to local customers.',contact:{name:'Dispatch',email:'dispatch@neighborcart.example',phone:'(316) 444-10012'}},
    {id:'j13',title:'Short-term Painting',company:'FreshCoats',location:'Wichita, KS',category:'Construction',salary:'$20/hr',posted:'Yesterday',description:'Paint two small interior rooms.',contact:{name:'Owner',email:'owner@freshcoats.example',phone:'(316) 444-1013'}},
    {id:'j14',title:'Poster & Flyer Print Prep',company:'PrintRight',location:'Wichita, KS',category:'Graphic Artist',salary:'$18/hr',posted:'4 days ago',description:'Prepare print-ready files and check color profiles.',contact:{name:'Print Manager',email:'print@printright.example',phone:'(316) 444-1014'}},
    {id:'j15',title:'Short-term Handyman Help',company:'FixItQuick',location:'Wichita, KS',category:'Handyman',salary:'$19/hr',posted:'Today',description:'Assist with odd jobs and small repairs.',contact:{name:'Owner',email:'jobs@fixitquick.example',phone:'(316) 555-01015'}}
  ];

  // Render helpers
  function el(tag, cls, txt){ const e = document.createElement(tag); if(cls) e.className = cls; if(txt) e.textContent = txt; return e }

  function renderJobs(){
    const grid = document.getElementById('jobs-grid'); grid.innerHTML='';
    demoJobs.forEach(job=>{
      const c = el('article','card');
      const title = el('div','job-title', job.title);
      const comp = el('div','company', `${job.company} • ${job.location}`);
      c.appendChild(title); c.appendChild(comp);
      const desc = el('div','small', job.description.substring(0,120)+'...'); c.appendChild(desc);
      const contact = el('div','contact-blur small', `${job.contact.name} • ${job.contact.email} • ${job.contact.phone}`);
      c.appendChild(contact);
      const foot = el('div','card-foot');
      const posted = el('div','small', job.posted + (job.salary?(' • '+job.salary):''));
      const actions = el('div','card-actions');
      const open = el('button','btn','Open'); open.onclick = ()=>openJob(job);
      const share = el('button','btn','Share'); share.onclick=()=>navigator.share?navigator.share({title:job.title,text:job.description,url:window.location.href}):alert('Copy the URL to share');
      actions.appendChild(open); actions.appendChild(share);
      foot.appendChild(posted); foot.appendChild(actions);
      c.appendChild(foot);
      grid.appendChild(c);
    });
  }

  function renderProfiles(){
    const grid = document.getElementById('profiles-grid'); grid.innerHTML='';
    // show demo profiles + user profile
    const profiles = demoProfiles.slice();
    const user = getProfile(); if(user) profiles.unshift(user);
    profiles.forEach(p=>{
      const cWrap = el('div','profile-wrapper');
      const c = el('article','card profile-card');
      const av = el('div','profile-avatar');
      if(p.avatar){ const img = document.createElement('img'); img.src = p.avatar; img.style.width='100%'; img.style.height='100%'; img.style.objectFit='cover'; img.style.borderRadius='8px'; av.appendChild(img); }
      else { av.textContent = (p.first? (p.first[0]+(p.last?p.last[0]:'')): 'RU').toUpperCase(); }
      const name = el('div','profile-name', p.first + ' ' + (p.last||''));
      const primary = el('div','small','Primary: '+p.primary);
      const skills = el('div','profile-skills');
      const pillMain = el('div','skill-pill',p.primary); skills.appendChild(pillMain);
      (p.specialties||[]).slice(0,2).forEach(s=>skills.appendChild(el('div','skill-pill',s)));
      c.appendChild(av); c.appendChild(name); c.appendChild(primary); c.appendChild(skills);
      if(p.demo) { const badge = el('div','demo-badge','Demo'); cWrap.appendChild(badge); }
      cWrap.appendChild(c);
      grid.appendChild(cWrap);
    });
  }

  function openJob(job){
    const modal = document.getElementById('job-modal');
    const content = document.getElementById('modal-content');
    content.innerHTML='';
    const t = el('h3',null, job.title);
    const meta = el('div','small', job.company+' • '+job.location+' • '+job.posted+' • '+job.salary);
    const desc = el('p',null, job.description);
    content.appendChild(t); content.appendChild(meta); content.appendChild(desc);
    // contact details – blurred unless profile exists
    const contactBox = el('div','card');
    const contactTitle = el('div','small','Contact');
    const profile = getProfile();
    const contactInner = el('div', profile ? 'small' : 'contact-blur small', profile ? `${job.contact.name} • ${job.contact.email} • ${job.contact.phone}` : `${job.contact.name} • ${job.contact.email} • ${job.contact.phone}`);
    contactBox.appendChild(contactTitle); contactBox.appendChild(contactInner);
    content.appendChild(contactBox);

    const actions = el('div','card-actions');
    const apply = el('button','btn primary', 'Apply');
    apply.onclick = ()=>{
      if(!isLoggedIn()){ alert('You must create a profile to apply. Click "Create Profile" in the header.'); document.getElementById('cta-create').focus(); return; }
      const profile = getProfile();
      if(!profile.resumeAttached){ if(confirm('You need a resume attached to apply. Open resume builder?')) { openResumeBuilder(); } return; }
      alert('Application sent (demo). Contact: '+job.contact.email);
    };
    const save = el('button','btn','Save'); save.onclick = ()=>alert('Saved to your account (demo)');
    const share = el('button','btn','Share'); share.onclick=()=>navigator.share?navigator.share({title:job.title,text:job.description,url:window.location.href}):alert('Copy link to share');
    actions.appendChild(apply); actions.appendChild(save); actions.appendChild(share);
    content.appendChild(actions);

    modal.setAttribute('aria-hidden','false');
  }

  function openResumeBuilder(){
    if(!isLoggedIn()){ alert('Please create a profile first.'); return; }
    const widget = document.getElementById('resume-widget');
    widget.innerHTML = '';
    const profile = getProfile();
    const h = el('h4',null,'Resume Builder');
    const form = document.createElement('form');
    form.innerHTML = `
      <label>Summary<textarea name="summary" style="width:100%;height:80px">${profile.bio||''}</textarea></label>
      <label>Experience<textarea name="exp" style="width:100%;height:120px">${(profile.experience||'')}</textarea></label>
      <label>Education<textarea name="edu" style="width:100%;height:80px">${(profile.education||'')}</textarea></label>
      <label>Skills<input name="skills" value="${(profile.specialties||[]).join(', ')}"></label>
    `;
    const attachBtn = el('button','btn primary','Attach Resume');
    attachBtn.type='button'; attachBtn.onclick = ()=>{ profile.resumeAttached = true; profile.summary = form.summary.value; profile.experience = form.exp.value; profile.education = form.edu.value; profile.skills = form.skills.value; localStorage.setItem('ruf_profile',JSON.stringify(profile)); alert('Resume attached (demo). You can now apply.'); renderProfiles(); };
    const printBtn = el('button','btn','Print Resume'); printBtn.type='button'; printBtn.onclick = ()=>{ const w=window.open('about:blank'); w.document.write('<pre>'+['Name: '+profile.first+' '+(profile.last||''),'Email: '+profile.email,'', 'Summary:', form.summary.value,'','Experience:',form.exp.value,'','Education:',form.edu.value].join('\n')+'</pre>'); w.print(); };
    widget.appendChild(h); widget.appendChild(form); widget.appendChild(attachBtn); widget.appendChild(printBtn);
  }

  // Profile create flow
  function showProfileModal(){
    const m = document.getElementById('profile-modal'); m.setAttribute('aria-hidden','false');
  }

  function populateSpecialties(primary){
    const s1 = document.getElementById('spec1'); const s2 = document.getElementById('spec2');
    s1.innerHTML=''; s2.innerHTML='';
    const opts = specialtyMap[primary] || [];
    const blank = document.createElement('option'); blank.value=''; blank.textContent='(choose)'; s1.appendChild(blank); s2.appendChild(blank.cloneNode(true));
    opts.forEach(o=>{ const a = document.createElement('option'); a.value=o; a.textContent=o; s1.appendChild(a); s2.appendChild(a.cloneNode(true)); });
  }

  function saveProfileFromForm(e){
    e.preventDefault();
    const f = e.target;
    const avatarFile = document.getElementById('avatar').files[0];
    const reader = avatarFile ? new FileReader() : null;
    const save = (dataUrl)=>{
      const data = {
        id: 'u'+Date.now(), first: f.first.value, last: f.last.value, email: f.email.value,
        primary: f.primary.value, specialties: [f.spec1.value,f.spec2.value].filter(Boolean).slice(0,2), bio:'', resumeAttached:false, avatar: dataUrl || null
      };
      localStorage.setItem('ruf_profile', JSON.stringify(data));
      document.getElementById('profile-modal').setAttribute('aria-hidden','true');
      alert('Profile created. You can now view contact details and use the resume builder.');
      renderProfiles();
      openResumeBuilder();
    };
    if(reader){ reader.onload = ()=> save(reader.result); reader.readAsDataURL(avatarFile); } else save(null);
  }

  // Init
  document.addEventListener('DOMContentLoaded', ()=>{
    renderJobs(); renderProfiles();
    // Wire header buttons
    document.getElementById('cta-create').addEventListener('click', showProfileModal);
    document.getElementById('resume-link').addEventListener('click', (e)=>{ e.preventDefault(); if(!isLoggedIn()){ showProfileModal(); } else openResumeBuilder(); });
    document.getElementById('close-modal').addEventListener('click', ()=>document.getElementById('job-modal').setAttribute('aria-hidden','true'));
    document.getElementById('close-profile-modal').addEventListener('click', ()=>document.getElementById('profile-modal').setAttribute('aria-hidden','true'));
    document.getElementById('profile-form').addEventListener('submit', saveProfileFromForm);

    // specialties population
    document.getElementById('primary-select').addEventListener('change', (e)=> populateSpecialties(e.target.value));

    // If no real user, pre-populate demo profile list; show option to import demo profile quickly
    const createBtn = document.getElementById('cta-create');
    const quick = document.createElement('button'); quick.className='btn'; quick.textContent='Use Demo Profile'; quick.onclick = ()=>{ localStorage.setItem('ruf_profile', JSON.stringify(demoProfiles[0])); alert('Demo profile created'); renderProfiles(); };
    createBtn.insertAdjacentElement('afterend', quick);
  });
})();
