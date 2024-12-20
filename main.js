const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {

            nav.classList.toggle('show-menu');
        });
    }
}

showMenu('nav-toggle', 'nav-menu');



const navLink = document.querySelectorAll('.nav_link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));


const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);


function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 200) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollTop);


const themeButton = document.getElementById('theme-button');
let darkTheme = 'dark-theme';
let darkMode = localStorage.getItem("dark-mode");

function enableDarkMode() {
    document.body.classList.add(darkTheme);
    themeButton.classList.add('fa-sun');
    themeButton.classList.remove('fa-moon');
    localStorage.setItem("dark-mode", "enabled");
};

function disableDarkMode() {
    document.body.classList.remove(darkTheme);
    themeButton.classList.add('fa-moon');
    themeButton.classList.remove('fa-sun');
    localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
    enableDarkMode();
}

themeButton.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});


const downloadButton = document.getElementById('download-button');

downloadButton.addEventListener('click', () => {
    if (document.body.classList.contains(darkTheme)) {
        downloadButton.href = "assets/pdf/myResumeCV-dark.pdf";
    } else {
        downloadButton.href = "assets/pdf/myResumeCV-light.pdf";
    }
});


function addScaleCV() {
    document.body.classList.add("scale-cv");
}


function removeScaleCV() {
    document.body.classList.remove("scale-cv");
}


let areaCV = document.getElementById('area-cv');

let resumeButton = document.getElementById("resume-button");

function generateResume() {
    if (document.body.classList.contains(darkTheme)) {
        let opt = {
            margin: 0,
            filename: 'myResumeCV-dark.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 4, useCORS: true },
            jsPDF: { format: 'a4', orientation: 'portrait' }
        };
        html2pdf(areaCV, opt);
    } else {
        let opt = {
            margin: 0,
            filename: 'myResumeCV-light.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 4, useCORS: true },
            jsPDF: { format: 'a4', orientation: 'portrait' }
        };
        html2pdf(areaCV, opt);
    }
}

resumeButton.addEventListener("click", () => {
    addScaleCV();
    generateResume();
    setTimeout(removeScaleCV, 1000);
});