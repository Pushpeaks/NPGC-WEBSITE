(function () {
  const scripts = document.getElementsByTagName('script');
  let rootPath = '';

  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute('src');
    if (src && src.includes('navbar-loader.js')) {
      const assetsIndex = src.indexOf('assets/');
      if (assetsIndex !== -1) {
        rootPath = src.substring(0, assetsIndex);
      }
      break;
    }
  }

  const cssUrl = rootPath + 'assets/includes/navbar.css';

  const navbarHTML = `
  <nav class="navbar">
    <div class="nav-container">
      <div class="menu-toggle" id="menu-toggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <ul class="nav-menu" id="nav-menu">
        <li><a href="${rootPath}index.html">Home</a></li>
        <li><a href="#">About Us</a>
          <ul class="sub-menu">
            <li><a href="${rootPath}NavSections/AboutUs/About-us/thecollege.html">The College</a></li>
            <li><a href="${rootPath}NavSections/AboutUs/About-us/vision-mission.html">Vision and Mission</a></li>
            <li><a href="${rootPath}NavSections/AboutUs/About-us/principal-desk.html">Principal's Desk</a></li>
            <li><a href="${rootPath}NavSections/Exam&Ass/Exam&Ass.html">Examination & Assessments</a></li>
            <li><a href="#">Administrations and Committees</a></li>
            <li><a href="${rootPath}NavSections/AboutUs/About-us/annual_reports.html">Annual Reports</a></li>
            <li><a href="${rootPath}NavSections/AboutUs/About-us/accreditations-ranking.html">Accreditations & Ranking</a></li>
            <li><a href="${rootPath}NavSections/AboutUs/About-us/infrastructure.html">Infrastructure & Facilities</a></li>
          </ul>
        </li>
        <li><a href="#">Academics</a>
          <ul class="sub-menu">
            <li><a href="${rootPath}NavSections/Academics/index.html">Programs Offered</a></li>
            <li><a href="${rootPath}NavSections/Faculty&Dev/Faculty&Dev.html">Departments & Faculties</a></li>
            <li><a href="${rootPath}NavSections/Syllabus/syllabus.html">Syllabus</a></li>
            <li><a href="${rootPath}NavSections/AcademicCalendar/academicCalendar.html">Academic Calendar</a></li>
            <li><a href="${rootPath}NavSections/ClassSchedule/classSchedule.html">Class Schedule</a></li>
            <li><a href="#">Research</a></li>
            <li><a href="#">Distance Learning Centers</a></li>
          </ul>
        </li>
        <li><a href="#">Admissions</a>
          <ul class="sub-menu">
            <li><a href="#">Prospectus</a></li>
            <li><a href="#">Admission Schedule</a></li>
            <li><a href="#">Eligibility Criteria</a></li>
            <li><a href="#">Admission Procedure</a></li>
            <li><a href="#">Seats Offered</a></li>
            <li><a href="#">Apply Online</a></li>
          </ul>
        </li>
        <li><a href="#">Library</a>
          <ul class="sub-menu">
            <li><a href="${rootPath}NavSections/Library/Library/about-library.html">About the Library</a></li>
            <li><a href="${rootPath}NavSections/Library/Library/library-rules.html">Rules</a></li>
            <li><a href="#">N-Lists</a></li>
            <li><a href="#">OPAC</a></li>
          </ul>
        </li>
        <li><a href="#">Facilities</a>
          <ul class="sub-menu">
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
        <li><a href="#">Examinations</a>
          <ul class="sub-menu">
            <li><a href="${rootPath}NavSections/Exam&Ass/Exam&Ass.html">Examination & Assessments</a></li>
            <li><a href="#">Examination Forms</a></li>
            <li><a href="#">Examination Schedule</a></li>
            <li><a href="#">Examination Results</a></li>
            <li><a href="#">Online Services (EASE) – Migration & Degree</a></li>
          </ul>
        </li>
        <li><a href="#">Students</a>
          <ul class="sub-menu">
            <li><a href="#">Online Fees Payment</a></li>
            <li><a href="${rootPath}NavSections/Syllabus/syllabus.html">Syllabus</a></li>
            <li><a href="#">Student Grievance</a></li>
            <li><a href="#">Scholarships</a></li>
          </ul>
        </li>
        <li><a href="#">Media</a>
          <ul class="sub-menu">
            <li><a href="#">Social Media</a></li>
            <li><a href="${rootPath}NavSections/News/news.html">News</a></li>
          </ul>
        </li>
        <li><a href="${rootPath}NavSections/Contact/contact.html">Contact Us</a></li>
      </ul>
    </div>
  </nav>`;

  function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    placeholder.innerHTML = navbarHTML;

    // Initialize JavaScript functionality
    initInteractivity();

    // Inject CSS
    if (!document.querySelector('link[href="' + cssUrl + '"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssUrl;
      document.head.appendChild(link);
    }

    // Also ensure Tailwind and FontAwesome are present (since header uses them)
    ensureDependencies();
  }

  function initInteractivity() {
    // Toggle menu for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.onclick = function () {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
      };
    }
  }

  function ensureDependencies() {
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fa = document.createElement('link');
      fa.rel = 'stylesheet';
      fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(fa);
    }
    if (!window.tailwind) {
      const tw = document.createElement('script');
      tw.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(tw);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }
})();
