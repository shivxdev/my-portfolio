/* =========================================================
   SHIVAM PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    initializePortfolio();

});


/* =========================================================
   MAIN INITIALIZATION
========================================================= */

function initializePortfolio() {

    loadProfile();

    loadSocialLinks();

    renderSkills();

    renderProjects();

    renderStats();

    setupNavigation();

    setupMobileMenu();

    setupImageFallback();

}


/* =========================================================
   PROFILE
========================================================= */

function loadProfile() {

    const profile = portfolioData.profile;


    /* HERO ROLE */

    const heroRole = document.getElementById("heroRole");

    if (heroRole) {
        heroRole.textContent = profile.role;
    }


    /* HERO DESCRIPTION */

    const heroDescription =
        document.getElementById("heroDescription");

    if (heroDescription) {
        heroDescription.textContent =
            profile.description;
    }


    /* HERO IMAGE */

    const heroImage =
        document.getElementById("heroProfileImage");

    if (heroImage) {
        heroImage.src = profile.image;
        heroImage.alt = profile.name;
    }


    /* ABOUT IMAGE */

    const aboutImage =
        document.getElementById("aboutProfileImage");

    if (aboutImage) {
        aboutImage.src = profile.image;
        aboutImage.alt = profile.name;
    }


    /* EMAIL */

    const emailButton =
        document.getElementById("emailButton");

    if (emailButton) {

        emailButton.href =
            `mailto:${profile.email}`;

    }


    /* RESUME */

    const resumeButton =
        document.querySelector(
            'a[href="assets/resume/resume.pdf"]'
        );

    if (resumeButton) {

        resumeButton.href =
            "assets/resume/resume.pdf";

    }

}


/* =========================================================
   SOCIAL LINKS
========================================================= */

function loadSocialLinks() {

    const links = portfolioData.socialLinks;


    /* HERO */

    const heroGithub =
        document.getElementById("heroGithub");

    const heroLinkedin =
        document.getElementById("heroLinkedin");

    const heroInstagram =
        document.getElementById("heroInstagram");


    if (heroGithub) {
        heroGithub.href = links.github;
    }

    if (heroLinkedin) {
        heroLinkedin.href = links.linkedin;
    }

    if (heroInstagram) {
        heroInstagram.href = links.instagram;
    }


    /* FOOTER */

    const footerGithub =
        document.getElementById("footerGithub");

    const footerLinkedin =
        document.getElementById("footerLinkedin");

    const footerInstagram =
        document.getElementById("footerInstagram");


    if (footerGithub) {
        footerGithub.href = links.github;
    }

    if (footerLinkedin) {
        footerLinkedin.href = links.linkedin;
    }

    if (footerInstagram) {
        footerInstagram.href = links.instagram;
    }

}


/* =========================================================
   RENDER SKILLS
========================================================= */

function renderSkills() {

    const container =
        document.getElementById("skillsContainer");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    portfolioData.skills.forEach((skill) => {

        const card =
            document.createElement("div");

        card.className = "skill-card";


        card.innerHTML = `

            <div class="skill-icon">
                ${skill.short}
            </div>

            <span>
                ${skill.name}
            </span>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects() {

    const container =
        document.getElementById("projectsContainer");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    portfolioData.projects.forEach((project) => {

        const card =
            document.createElement("article");

        card.className = "project-card";


        /* TECHNOLOGIES */

        const technologies =
            project.technologies
                .map(
                    tech => `<span>${tech}</span>`
                )
                .join("");


        /* PROJECT IMAGE */

        let imageHTML = `

            <div class="project-image-wrapper">

                <img
                    src="${project.image}"
                    alt="${project.title}"
                    class="project-image"
                >

            </div>

        `;


        /* LINKS */

        let linksHTML = "";


        if (
            project.github &&
            project.github !== "#"
        ) {

            linksHTML += `

                <a
                    href="${project.github}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub ↗
                </a>

            `;

        }


        if (
            project.live &&
            project.live !== "#"
        ) {

            linksHTML += `

                <a
                    href="${project.live}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Live Demo ↗
                </a>

            `;

        }


        card.innerHTML = `

            ${imageHTML}

            <div class="project-info">

                <span class="project-category">
                    ${project.category}
                </span>

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                <div class="project-tech">
                    ${technologies}
                </div>

                ${
                    linksHTML
                        ? `
                            <div class="project-links">
                                ${linksHTML}
                            </div>
                          `
                        : ""
                }

            </div>

        `;


        /* IMAGE FALLBACK */

        const image =
            card.querySelector(".project-image");


        if (image) {

            image.addEventListener(
                "error",
                () => {

                    const wrapper =
                        image.parentElement;

                    wrapper.innerHTML = `

                        <div class="project-placeholder">
                            ${project.title}
                        </div>

                    `;

                }
            );

        }


        container.appendChild(card);

    });

}


/* =========================================================
   RENDER STATS
========================================================= */

function renderStats() {

    const container =
        document.getElementById("statsContainer");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    portfolioData.stats.forEach((stat) => {

        const item =
            document.createElement("div");

        item.className = "stat";


        item.innerHTML = `

            <strong>
                ${stat.number}
            </strong>

            <span>
                ${stat.label}
            </span>

        `;


        container.appendChild(item);

    });

}


/* =========================================================
   DESKTOP NAVIGATION
========================================================= */

function setupNavigation() {

    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                navLinks.forEach((item) => {
                    item.classList.remove("active");
                });

                link.classList.add("active");


                /* Close mobile menu after click */

                closeMobileMenu();

            }
        );

    });


    /* Scroll active navigation */

    const sections =
        document.querySelectorAll("section[id]");


    window.addEventListener(
        "scroll",
        () => {

            let currentSection = "";


            sections.forEach((section) => {

                const sectionTop =
                    section.offsetTop - 140;

                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            });


            navLinks.forEach((link) => {

                link.classList.remove("active");


                const target =
                    link.getAttribute("href");


                if (
                    target ===
                    `#${currentSection}`
                ) {

                    link.classList.add("active");

                }

            });

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    if (!menuToggle || !navMenu) {

        console.warn(
            "Mobile menu elements not found."
        );

        return;

    }


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle(
                    "mobile-open"
                );


            menuToggle.classList.toggle(
                "active",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu() {

    const navMenu =
        document.getElementById("navMenu");

    const menuToggle =
        document.getElementById("menuToggle");


    if (!navMenu || !menuToggle) {
        return;
    }


    navMenu.classList.remove(
        "mobile-open"
    );


    menuToggle.classList.remove(
        "active"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function setupImageFallback() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });

}


/* =========================================================
   CLOSE MENU WHEN SCREEN BECOMES DESKTOP
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 750) {

            closeMobileMenu();

        }

    }
);