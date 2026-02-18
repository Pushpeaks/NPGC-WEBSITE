(function () {

  /* ── 1. Detect root path from this script's src ── */
  const scripts = document.getElementsByTagName('script');
  let rootPath = '';
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute('src');
    if (src && src.includes('navbar-loader.js')) {
      const idx = src.indexOf('assets/');
      if (idx !== -1) rootPath = src.substring(0, idx);
      break;
    }
  }

  /* ── 2. Inject dependencies (Font Awesome + Bootstrap) ──
     Both are injected BEFORE the navbar HTML so styles are
     ready the moment the DOM nodes appear — zero flash.    */
  function ensureDependencies() {
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fa = document.createElement('link');
      fa.rel  = 'stylesheet';
      fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
      document.head.insertBefore(fa, document.head.firstChild);
    }
    if (!document.querySelector('link[href*="bootstrap"]')) {
      const bs = document.createElement('link');
      bs.rel  = 'stylesheet';
      bs.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css';
      document.head.insertBefore(bs, document.head.firstChild);
    }
  }

  /* ── 3. Inline critical CSS — injected immediately,
     no external CSS file fetch required for the navbar  ── */
  function injectCSS() {
    if (document.getElementById('npgc-navbar-style')) return;
    const style = document.createElement('style');
    style.id = 'npgc-navbar-style';
    style.textContent = `
      /* ── RESET ── */
      #navbar-placeholder * { box-sizing: border-box; }

      /* ── TOP BAR ── */
      .npgc-topbar {
        background: #111111;
        border-bottom: 2px solid #cc0000;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
      }
      .npgc-socials { display: flex; align-items: center; gap: 6px; }
      .npgc-socials a {
        width: 26px; height: 26px;
        border-radius: 50%;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.15);
        color: #ccc; font-size: 12px;
        display: flex; align-items: center; justify-content: center;
        text-decoration: none;
        transition: background .2s, color .2s;
      }
      .npgc-socials a:hover { background: #cc0000; color: #fff; border-color: #cc0000; }
      .npgc-clock { font-size: 12px; color: #bbb; font-family: Arial, sans-serif; }

      /* ── HEADER BAND ── */
      .npgc-header {
        background: #fff;
        padding: 14px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-bottom: 3px solid #cc0000;
        box-shadow: 0 2px 6px rgba(0,0,0,0.07);
      }
      .npgc-logo {
        height: 100px;
        width: auto;
        max-width: 110px;
        object-fit: contain;
        flex-shrink: 0;
      }
      .npgc-header-center {
        flex: 1;
        text-align: center;
        padding: 0 8px;
      }
      .npgc-header-center img {
        max-width: 100%;
        height: auto;
      }

      /* ── NAVBAR ── */
      .npgc-navbar {
        background: #222222;
        position: sticky;
        top: 0;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.35);
      }
      .npgc-nav-inner {
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      /* ── NAV MENU (desktop) ── */
      .npgc-menu {
        display: flex;
        list-style: none;
        margin: 0; padding: 0;
        height: 48px;
        align-items: center;
        flex: 1;
        justify-content: center;
        gap: 0;
      }
      .npgc-menu > li {
        position: relative;
        height: 48px;
        display: flex;
        align-items: center;
      }
      .npgc-menu > li > a,
      .npgc-menu > li > button {
        display: flex; align-items: center; gap: 3px;
        height: 48px; padding: 0 11px;
        color: #d0d0d0;
        font-size: 13px; font-weight: 400;
        font-family: Arial, sans-serif;
        text-decoration: none;
        background: none; border: none;
        cursor: pointer; white-space: nowrap;
        transition: color .18s, background .18s;
        position: relative;
      }
      .npgc-menu > li > a::after,
      .npgc-menu > li > button::after {
        content: '';
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 2px;
        background: #cc0000;
        transform: scaleX(0);
        transition: transform .2s;
      }
      .npgc-menu > li:hover > a,
      .npgc-menu > li:hover > button {
        color: #fff;
        background: rgba(255,255,255,0.05);
      }
      .npgc-menu > li:hover > a::after,
      .npgc-menu > li:hover > button::after {
        transform: scaleX(1);
      }
      .npgc-caret {
        font-size: 7px; color: #888;
        transition: transform .2s;
        margin-top: 1px;
        pointer-events: none;
      }
      .npgc-menu > li:hover > button .npgc-caret {
        transform: rotate(180deg);
        color: #cc0000;
      }

      /* ── DROPDOWN ── */
      .npgc-sub {
        display: block;
        position: absolute;
        top: 100%; left: 0;
        background: #1a1a1a;
        min-width: 215px;
        list-style: none;
        margin: 0; padding: 4px 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity .15s;
        box-shadow: 0 6px 20px rgba(0,0,0,0.5);
        border-radius: 0 0 4px 4px;
        z-index: 100;
      }
      .npgc-menu > li:hover .npgc-sub {
        opacity: 1;
        pointer-events: all;
      }
      .npgc-sub li a {
        display: block;
        padding: 10px 20px;
        color: #d0d0d0;
        font-size: 13px;
        font-family: Arial, sans-serif;
        text-decoration: none;
        border-left: none;
        background: transparent;
        transition: background .12s, color .12s;
        white-space: nowrap;
      }
      .npgc-sub li a:hover {
        background: #2e2e2e;
        color: #ffffff;
        border-left: none;
      }
      .npgc-sub .drop-divider {
        height: 1px; background: #333; margin: 3px 0;
      }

      /* ── HAMBURGER ── */
      .npgc-hamburger {
        display: none;
        flex-direction: column; gap: 5px;
        background: none;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 4px; padding: 7px;
        cursor: pointer; flex-shrink: 0;
      }
      .npgc-hamburger span {
        display: block; width: 20px; height: 2px;
        background: #ccc; border-radius: 2px;
        transition: all .28s;
      }
      .npgc-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #fff; }
      .npgc-hamburger.open span:nth-child(2) { opacity: 0; }
      .npgc-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #fff; }

      /* ── MOBILE DRAWER ── */
      .npgc-mobile-menu {
        display: none;
        position: fixed;
        inset: 0; top: 84px;
        background: #1e1e1e;
        z-index: 9998;
        overflow-y: auto;
        transform: translateX(100%);
        transition: transform .3s cubic-bezier(.4,0,.2,1);
        border-top: 2px solid #cc0000;
        -webkit-overflow-scrolling: touch;
      }
      .npgc-mobile-menu.open { transform: translateX(0); }

      .npgc-mob-list { list-style: none; margin: 0; padding: 6px 0 40px; }
      .npgc-mob-list > li { border-bottom: 1px solid rgba(255,255,255,0.07); }
      .npgc-mob-row {
        display: flex; justify-content: space-between; align-items: center;
        width: 100%; padding: 14px 20px;
        color: #d5d5d5; background: none; border: none;
        font-family: Arial, sans-serif; font-size: 14px;
        text-decoration: none; cursor: pointer; text-align: left;
        transition: color .18s, background .18s;
      }
      .npgc-mob-row:hover { color: #fff; background: rgba(204,0,0,0.1); }
      .npgc-mob-row i { font-size: 10px; color: #777; transition: transform .25s; }
      .npgc-mob-row.open i { transform: rotate(180deg); color: #cc0000; }
      .npgc-mob-sub { display: none; background: #161616; }
      .npgc-mob-sub.open { display: block; }
      .npgc-mob-sub a {
        display: block; padding: 10px 20px 10px 36px;
        color: #888; font-size: 13px; font-family: Arial, sans-serif;
        text-decoration: none; border-left: 2px solid transparent;
        transition: all .18s;
      }
      .npgc-mob-sub a:hover {
        color: #fff; border-left-color: #cc0000;
        background: rgba(204,0,0,0.08); padding-left: 42px;
      }

      /* ── RESPONSIVE ── */
      @media (max-width: 1100px) {
        .npgc-menu > li > a,
        .npgc-menu > li > button { font-size: 12px; padding: 0 8px; }
      }
      @media (max-width: 860px) {
        .npgc-menu > li > a,
        .npgc-menu > li > button { font-size: 11.5px; padding: 0 6px; }
        .npgc-caret { display: none; }
      }
      @media (max-width: 680px) {
        .npgc-menu > li > a,
        .npgc-menu > li > button { font-size: 11px; padding: 0 5px; }
      }

      /* Switch to hamburger only on small phones */
      @media (max-width: 560px) {
        .npgc-menu { display: none; }
        .npgc-hamburger { display: flex; }
        .npgc-mobile-menu { display: block; }
        .npgc-clock { display: none; }
      }

      /* Header scaling */
      @media (max-width: 700px) {
        .npgc-header { padding: 10px 14px; }
        .npgc-logo { height: 74px; max-width: 80px; }
      }
      @media (max-width: 480px) {
        .npgc-logo.npgc-logo-right { display: none; }
      }
      @media (max-width: 360px) {
        .npgc-logo { height: 60px; max-width: 66px; }
      }
    `;
    document.head.insertBefore(style, document.head.firstChild);
  }

  /* ── 4. Navbar HTML — NO Tailwind classes ── */
  const navbarHTML = `
    <!-- TOP BAR -->
    <div class="npgc-topbar">
      <div class="npgc-socials">
        <a href="https://www.linkedin.com/school/national-pg-college/" target="_blank" title="LinkedIn" rel="noopener">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://www.facebook.com/npgcin" target="_blank" title="Facebook" rel="noopener">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.youtube.com/@npgcin14" target="_blank" title="YouTube" rel="noopener">
          <i class="fab fa-youtube"></i>
        </a>
        <a href="https://www.instagram.com/npgcin" target="_blank" title="Instagram" rel="noopener">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      <div class="npgc-clock">
        <span id="npgc-datetime"></span>
      </div>
    </div>

    <!-- HEADER BAND -->
    <header class="npgc-header">
      <img src="${rootPath}assets/logo-left.png" alt="NPGC Logo" class="npgc-logo" />
      <div class="npgc-header-center">
        <img src="${rootPath}assets/clg mid.png" alt="National Post Graduate College" />
      </div>
      <img src="${rootPath}assets/logo-right.png" alt="University of Lucknow Logo" class="npgc-logo npgc-logo-right" />
    </header>

    <!-- NAVBAR -->
    <nav class="npgc-navbar">
      <div class="npgc-nav-inner">

        <!-- DESKTOP FULL MENU -->
        <ul class="npgc-menu" id="npgc-nav-menu">

          <li><a href="${rootPath}index.html">Home</a></li>

          <li>
            <button>About Us <i class="fa fa-chevron-down npgc-caret"></i></button>
            <ul class="npgc-sub">
              <li><a href="${rootPath}NavSections/AboutUs/About-us/thecollege.html">The College</a></li>
              <li><a href="${rootPath}NavSections/AboutUs/About-us/vision-mission.html">Vision and Mission</a></li>
              <li><a href="${rootPath}NavSections/AboutUs/About-us/principal-desk.html">Principal's Desk</a></li>
              <li><a href="${rootPath}NavSections/AboutUs/About-us/administration.html">Administrations and Committees</a></li>
              <li class="drop-divider"></li>
              <li><a href="${rootPath}NavSections/AboutUs/About-us/annual_reports.html">Annual Reports</a></li>
              <li><a href="${rootPath}NavSections/AboutUs/About-us/accreditations-ranking.html">Accreditations &amp; Ranking</a></li>
              <li><a href="${rootPath}NavSections/AboutUs/About-us/infrastructure.html">Infrastructure &amp; Facilities</a></li>
            </ul>
          </li>

          <li>
            <button>Academics <i class="fa fa-chevron-down npgc-caret"></i></button>
            <ul class="npgc-sub">
              <li><a href="${rootPath}NavSections/Academics/index.html">Programs Offered</a></li>
              <li><a href="${rootPath}NavSections/Faculty&amp;Dev/Faculty&amp;Dev.html">Departments &amp; Faculties</a></li>
              <li><a href="${rootPath}NavSections/Syllabus/syllabus.html">Syllabus</a></li>
              <li><a href="${rootPath}NavSections/AcademicCalendar/academicCalendar.html">Academic Calendar</a></li>
              <li><a href="${rootPath}NavSections/ClassSchedule/classSchedule.html">Class Schedule</a></li>
              <li class="drop-divider"></li>
              <li><a href="#">Research</a></li>
              <li><a href="#">Distance Learning Centers</a></li>
            </ul>
          </li>

          <li>
            <button>Admissions <i class="fa fa-chevron-down npgc-caret"></i></button>
            <ul class="npgc-sub">
              <li><a href="#">Prospectus</a></li>
              <li><a href="#">Admission Schedule</a></li>
              <li><a href="#">Eligibility Criteria</a></li>
              <li><a href="${rootPath}NavSections/Admissions/admission-procedure.html">Admission Procedure</a></li>
              <li><a href="#">Seats Offered</a></li>
              <li class="drop-divider"></li>
              <li><a href="#" style="color:#cc0000;font-weight:700;">Apply Online</a></li>
            </ul>
          </li>

          <li>
            <button>Library <i class="fa fa-chevron-down npgc-caret"></i></button>
            <ul class="npgc-sub">
              <li><a href="${rootPath}NavSections/Library/Library/about-library.html">About the Library</a></li>
              <li><a href="${rootPath}NavSections/Library/Library/library-rules.html">Rules</a></li>
              <li><a href="#">N-Lists</a></li>
              <li><a href="#">OPAC</a></li>
            </ul>
          </li>

          <li>
            <button>Facilities <i class="fa fa-chevron-down npgc-caret"></i></button>
            <ul class="npgc-sub">
              <li><a href="${rootPath}NavSections/Facilities/Infrastructure/index.html">Infrastructure</a></li>
              <li><a href="${rootPath}NavSections/Facilities/Hostel/index.html">Hostel</a></li>
              <li><a href="${rootPath}NavSections/Facilities/Canteen/index.html">Canteen</a></li>
              <li><a href="${rootPath}NavSections/Facilities/Laboratories/index.html">Laboratory</a></li>
              <li><a href="${rootPath}NavSections/Facilities/Library/index.html">Library</a></li>
              <li><a href="${rootPath}NavSections/Facilities/Medical/index.html">Medical</a></li>
              <li><a href="${rootPath}NavSections/Facilities/Sports and Games/index.html">Sports</a></li>
              <li><a href="${rootPath}NavSections/Facilities/Student Units/index.html">Student Units</a></li>
            </ul>
          </li>

          <li>
            <button>Examinations <i class="fa fa-chevron-down npgc-caret"></i></button>
            <ul class="npgc-sub">
              <li><a href="${rootPath}NavSections/Exam&amp;Ass/Exam&amp;Ass.html">Examination &amp; Assessments</a></li>
              <li><a href="#">Examination Forms</a></li>
              <li><a href="#">Examination Schedule</a></li>
              <li><a href="#">Examination Results</a></li>
              <li class="drop-divider"></li>
              <li><a href="#">Online Services (EASE) – Migration &amp; Degree</a></li>
            </ul>
          </li>

          <li>
            <button>Students <i class="fa fa-chevron-down npgc-caret"></i></button>
            <ul class="npgc-sub">
              <li><a href="#">Online Fees Payment</a></li>
              <li><a href="${rootPath}NavSections/Syllabus/syllabus.html">Syllabus</a></li>
              <li><a href="${rootPath}NavSections/Academics/student-grievance.html">Student Grievance</a></li>
              <li><a href="#">Scholarships</a></li>
            </ul>
          </li>

          <li>
            <button>Media <i class="fa fa-chevron-down npgc-caret"></i></button>
            <ul class="npgc-sub">
              <li><a href="#">Social Media</a></li>
              <li><a href="${rootPath}NavSections/News/news.html">News</a></li>
            </ul>
          </li>

          <li><a href="${rootPath}NavSections/Contact/contact.html">Contact Us</a></li>

        </ul>

        <!-- HAMBURGER — only visible on < 560px -->
        <button class="npgc-hamburger" id="npgc-hamburger" aria-label="Open Menu">
          <span></span><span></span><span></span>
        </button>

      </div>
    </nav>

    <!-- MOBILE DRAWER — only active on small screens -->
    <div class="npgc-mobile-menu" id="npgc-mobile-menu">
      <ul class="npgc-mob-list">
        <li><a href="${rootPath}index.html" class="npgc-mob-row">Home</a></li>

        <li>
          <button class="npgc-mob-row" data-mob-toggle>About Us <i class="fa fa-chevron-down"></i></button>
          <div class="npgc-mob-sub">
            <a href="${rootPath}NavSections/AboutUs/About-us/thecollege.html">The College</a>
            <a href="${rootPath}NavSections/AboutUs/About-us/vision-mission.html">Vision and Mission</a>
            <a href="${rootPath}NavSections/AboutUs/About-us/principal-desk.html">Principal's Desk</a>
            <a href="${rootPath}NavSections/Exam&amp;Ass/Exam&amp;Ass.html">Examination &amp; Assessments</a>
            <a href="${rootPath}NavSections/AboutUs/About-us/administration.html">Administrations and Committees</a>
            <a href="${rootPath}NavSections/AboutUs/About-us/annual_reports.html">Annual Reports</a>
            <a href="${rootPath}NavSections/AboutUs/About-us/accreditations-ranking.html">Accreditations &amp; Ranking</a>
            <a href="${rootPath}NavSections/AboutUs/About-us/infrastructure.html">Infrastructure &amp; Facilities</a>
          </div>
        </li>

        <li>
          <button class="npgc-mob-row" data-mob-toggle>Academics <i class="fa fa-chevron-down"></i></button>
          <div class="npgc-mob-sub">
            <a href="${rootPath}NavSections/Academics/index.html">Programs Offered</a>
            <a href="${rootPath}NavSections/Faculty&amp;Dev/Faculty&amp;Dev.html">Departments &amp; Faculties</a>
            <a href="${rootPath}NavSections/Syllabus/syllabus.html">Syllabus</a>
            <a href="${rootPath}NavSections/AcademicCalendar/academicCalendar.html">Academic Calendar</a>
            <a href="${rootPath}NavSections/ClassSchedule/classSchedule.html">Class Schedule</a>
            <a href="#">Research</a>
            <a href="#">Distance Learning Centers</a>
          </div>
        </li>

        <li>
          <button class="npgc-mob-row" data-mob-toggle>Admissions <i class="fa fa-chevron-down"></i></button>
          <div class="npgc-mob-sub">
            <a href="#">Prospectus</a>
            <a href="#">Admission Schedule</a>
            <a href="#">Eligibility Criteria</a>
            <a href="${rootPath}NavSections/Admissions/admission-procedure.html">Admission Procedure</a>
            <a href="#">Seats Offered</a>
            <a href="#">Apply Online</a>
          </div>
        </li>

        <li>
          <button class="npgc-mob-row" data-mob-toggle>Library <i class="fa fa-chevron-down"></i></button>
          <div class="npgc-mob-sub">
            <a href="${rootPath}NavSections/Library/Library/about-library.html">About the Library</a>
            <a href="${rootPath}NavSections/Library/Library/library-rules.html">Rules</a>
            <a href="#">N-Lists</a>
            <a href="#">OPAC</a>
          </div>
        </li>

        <li>
          <button class="npgc-mob-row" data-mob-toggle>Facilities <i class="fa fa-chevron-down"></i></button>
          <div class="npgc-mob-sub">
            <a href="${rootPath}NavSections/Facilities/Infrastructure/index.html">Infrastructure</a>
            <a href="${rootPath}NavSections/Facilities/Hostel/index.html">Hostel</a>
            <a href="${rootPath}NavSections/Facilities/Canteen/index.html">Canteen</a>
            <a href="${rootPath}NavSections/Facilities/Laboratories/index.html">Laboratory</a>
            <a href="${rootPath}NavSections/Facilities/Library/index.html">Library</a>
            <a href="${rootPath}NavSections/Facilities/Medical/index.html">Medical</a>
            <a href="${rootPath}NavSections/Facilities/Sports and Games/index.html">Sports</a>
            <a href="${rootPath}NavSections/Facilities/Student Units/index.html">Student Units</a>
          </div>
        </li>

        <li>
          <button class="npgc-mob-row" data-mob-toggle>Examinations <i class="fa fa-chevron-down"></i></button>
          <div class="npgc-mob-sub">
            <a href="${rootPath}NavSections/Exam&amp;Ass/Exam&amp;Ass.html">Examination &amp; Assessments</a>
            <a href="#">Examination Forms</a>
            <a href="#">Examination Schedule</a>
            <a href="#">Examination Results</a>
            <a href="#">Online Services (EASE)</a>
          </div>
        </li>

        <li>
          <button class="npgc-mob-row" data-mob-toggle>Students <i class="fa fa-chevron-down"></i></button>
          <div class="npgc-mob-sub">
            <a href="#">Online Fees Payment</a>
            <a href="${rootPath}NavSections/Syllabus/syllabus.html">Syllabus</a>
            <a href="${rootPath}NavSections/Academics/student-grievance.html">Student Grievance</a>
            <a href="#">Scholarships</a>
          </div>
        </li>

        <li>
          <button class="npgc-mob-row" data-mob-toggle>Media <i class="fa fa-chevron-down"></i></button>
          <div class="npgc-mob-sub">
            <a href="#">Social Media</a>
            <a href="${rootPath}NavSections/News/news.html">News</a>
          </div>
        </li>

        <li><a href="${rootPath}NavSections/Contact/contact.html" class="npgc-mob-row">Contact Us</a></li>
      </ul>
    </div>
  `;

  /* ── 5. Inject everything & init ── */
  function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return false;
    if (placeholder.innerHTML.trim() !== '') return true;

    // Styles first — so content renders with correct styles instantly
    injectCSS();
    ensureDependencies();

    // Then HTML
    placeholder.innerHTML = navbarHTML;

    // Then interactivity
    initInteractivity();
    updateDateTime();
    setInterval(updateDateTime, 1000);

    return true;
  }

  /* ── 6. Interactivity ── */
  function initInteractivity() {
    // Hamburger
    const hbg = document.getElementById('npgc-hamburger');
    const mob = document.getElementById('npgc-mobile-menu');
    if (hbg && mob) {
      hbg.addEventListener('click', function () {
        mob.classList.toggle('open');
        hbg.classList.toggle('open');
        document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
      });
    }

    // Mobile accordion
    document.querySelectorAll('[data-mob-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const sub  = btn.nextElementSibling;
        const open = sub.classList.contains('open');
        // Close all
        document.querySelectorAll('.npgc-mob-sub.open').forEach(function (s) { s.classList.remove('open'); });
        document.querySelectorAll('.npgc-mob-row.open').forEach(function (b) { b.classList.remove('open'); });
        if (!open) {
          sub.classList.add('open');
          btn.classList.add('open');
        }
      });
    });

    // Escape key closes mobile
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mob && mob.classList.contains('open')) {
        mob.classList.remove('open');
        if (hbg) hbg.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Click outside closes mobile
    document.addEventListener('click', function (e) {
      if (mob && mob.classList.contains('open') && !mob.contains(e.target) && hbg && !hbg.contains(e.target)) {
        mob.classList.remove('open');
        hbg.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 7. Live clock ── */
  function updateDateTime() {
    const el = document.getElementById('npgc-datetime');
    if (!el) return;
    const now = new Date();
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const p = function (n) { return String(n).padStart(2, '0'); };
    el.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear() + ' at ' + p(h) + ':' + p(m) + ':' + p(s) + ' ' + ap;
  }

  /* ── 8. Run ── */
  if (!loadNavbar()) {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  }

})();