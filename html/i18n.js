// Translations object
const translations = {
  de: {
    nav: {
      home: "Startseite",
      education: "Bildung",
      projects: "Projekte",
      contact: "Kontakt"
    },
    home: {
      title: "hier",
      cv: "Lebenslauf",
      contact: "Kontakt"
    },
    education: {
      heading: "Bildung",
      now: "Jetzt",
      retraining: "Umschulung - GFN Freiburg",
      retrainingDesc: "Fachinformatiker Anwendungsentwicklung",
      studies: "Studium - HS-Offenburg",
      studiesDesc: "Unternehmens und IT-Sicherheit",
      vocational: "Berufskolleg II - BSZ Waldkirch",
      vocationalDesc: "Fachhochschule Wirtschaftsinformatik"
    },
    projects: {
      heading: "Projekte",
      pms: "Dies war ein Python-Projekt, das die Generierung von Passwörtern visualisiert und überprüft, ob die aktuellen Passwörter bereits im Internet durch",
      pms2: "geleakt wurden, indem es Hashing verwendet.",
      mika: "Mika Linux ist eine benutzerfreundliche Linux-Distribution, die von meinem Team und mir als Hobby entwickelt wurde.",
      mika2: "Sie basiert auf Arch Linux und richtet sich speziell an Nutzer mit wenig technischem 'Know-how'.",
      gfn: "Zusammenfassungen von jedem Lernfeld der GFN-Freiburg, die von mir selbst mit Hilfe von",
      gfn2: "und",
      gfn3: "erstellt wurden.",
      amanda: "Ein weiteres IT-Sicherheitsprojekt konzentriert sich auf die Entwicklung eines Keyloggers in C++."
    },
    contact: {
      heading: "Kontakt",
      fname: "Vorname",
      lname: "Nachname",
      email: "Ihre E-Mail",
      tel: "Telefonnummer",
      subject: "Subject",
      send: "Send Message"
    }
  },
  en: {
    nav: {
      home: "Home",
      education: "Education",
      projects: "Projects",
      contact: "Contact"
    },
    home: {
      title: "here",
      cv: "CV",
      contact: "Contact"
    },
    education: {
      heading: "Education",
      now: "Now",
      retraining: "Retraining - GFN Freiburg",
      retrainingDesc: "IT Specialist in Application Development",
      studies: "Studies - HS-Offenburg",
      studiesDesc: "Corporate and IT Security",
      vocational: "Vocational College II - BSZ Waldkirch",
      vocationalDesc: "University of Applied Sciences in Business Informatics"
    },
    projects: {
      heading: "Projects",
      pms: "This was a Python project that visualizes password generation and checks if current passwords have already been leaked on the internet through",
      pms2: "by using hashing.",
      mika: "Mika Linux is a user-friendly Linux distribution developed by my team and me as a hobby.",
      mika2: "It is based on Arch Linux and is specifically aimed at users with little technical know-how.",
      gfn: "Summaries of each learning field from GFN-Freiburg, created by myself with the help of",
      gfn2: "and",
      gfn3: ".",
      amanda: "Another IT security project focusing on developing a keylogger in C++."
    },
    contact: {
      heading: "Contact",
      fname: "First Name",
      lname: "Last Name",
      email: "Your Email",
      tel: "Phone Number",
      subject: "Subject",
      send: "Send Message"
    }
  }
};

// Get user's language preference based on domain
function getUserLanguage() {
  // Check localStorage first (manual override)
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    return savedLang;
  }

  // Detect language based on domain
  return detectLanguageFromDomain();
}

// Detect language from domain
function detectLanguageFromDomain() {
  const hostname = window.location.hostname;

  // If domain ends with .de, use German
  if (hostname.endsWith('.de')) {
    return 'de';
  }

  // If domain ends with .com or any other TLD, use English
  return 'en';
}

// Apply translations to the page
function applyTranslations(lang) {
  const t = translations[lang];

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Navigation
  document.querySelector('nav a[href="#home"]').textContent = t.nav.home;
  document.querySelector('nav a[href="#education"]').textContent = t.nav.education;
  document.querySelector('nav a[href="#projects"]').textContent = t.nav.projects;
  document.querySelector('nav a[href="#contact"]').textContent = t.nav.contact;

  // Home section
  document.querySelector('.home-content h1 span').textContent = t.home.title;
  document.querySelector('.btn-group a[href="Lebenslauf.pdf"]').textContent = t.home.cv;
  document.querySelector('.btn-group a[href="#contact"]').textContent = t.home.contact;

  // Education section
  document.querySelector('#education .heading').textContent = t.education.heading;

  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems[0]) {
    timelineItems[0].querySelector('.timeline-date').textContent = t.education.now;
    timelineItems[0].querySelector('h3').textContent = t.education.retraining;
    timelineItems[0].querySelector('p').textContent = t.education.retrainingDesc;
  }
  if (timelineItems[1]) {
    timelineItems[1].querySelector('h3').textContent = t.education.studies;
    timelineItems[1].querySelector('p').textContent = t.education.studiesDesc;
  }
  if (timelineItems[2]) {
    timelineItems[2].querySelector('h3').textContent = t.education.vocational;
    timelineItems[2].querySelector('p').textContent = t.education.vocationalDesc;
  }

  // Projects section
  document.querySelector('#projects .heading').textContent = t.projects.heading;

  const projectBoxes = document.querySelectorAll('.project-box');
  if (projectBoxes[0]) {
    const pmsText = projectBoxes[0].querySelector('p');
    pmsText.innerHTML = t.projects.pms + ' <a href="https://haveibeenpwned.com/" target="_blank">HIBP</a> ' + t.projects.pms2;
  }
  if (projectBoxes[1]) {
    const mikaText = projectBoxes[1].querySelector('p');
    mikaText.innerHTML = t.projects.mika + '<br />' + t.projects.mika2;
  }
  if (projectBoxes[2]) {
    const gfnText = projectBoxes[2].querySelector('p');
    gfnText.innerHTML = t.projects.gfn + ' <a href="https://obsidian.md/" target="_blank">Obsidian</a> ' + t.projects.gfn2 + ' <a href="https://dg-docs.ole.dev/" target="_blank">Digital Garden</a> ' + t.projects.gfn3;
  }
  if (projectBoxes[3]) {
    projectBoxes[3].querySelector('p').textContent = t.projects.amanda;
  }

  // Contact section
  document.querySelector('#contact .heading').textContent = t.contact.heading;
  document.querySelector('input[name="fname"]').placeholder = t.contact.fname;
  document.querySelector('input[name="lname"]').placeholder = t.contact.lname;
  document.querySelector('input[name="email"]').placeholder = t.contact.email;
  document.querySelector('input[name="tel"]').placeholder = t.contact.tel;
  document.querySelector('input[name="subject"]').placeholder = t.contact.subject;
  document.querySelector('input[type="submit"]').value = t.contact.send;

  // Save preference
  localStorage.setItem('preferredLanguage', lang);

  // Update language toggle button if exists
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.textContent = lang === 'en' ? 'DE' : 'EN';
  }
}

// Initialize language on page load
function initLanguage() {
  const lang = getUserLanguage();
  applyTranslations(lang);
}

// Toggle language function
function toggleLanguage() {
  const currentLang = localStorage.getItem('preferredLanguage') || 'en';
  const newLang = currentLang === 'en' ? 'de' : 'en';
  applyTranslations(newLang);
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}
