/* =========================================================
   F NEWS — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       INTRO VIDEO
       ===================================================== */

    const intro = document.getElementById("intro");
    const introVideo = document.getElementById("introVideo");
    const mainWebsite = document.getElementById("mainWebsite");

    let introFinished = false;


    function closeIntro() {

        if (introFinished) return;

        introFinished = true;

        // Start hiding the intro
        intro.classList.add("hide");

        // Make sure the website is available underneath
        mainWebsite.style.visibility = "visible";
        mainWebsite.style.opacity = "1";

        // Completely remove intro after animation
        setTimeout(() => {
            intro.style.display = "none";
        }, 900);
    }


    // Normal ending of video
    introVideo.addEventListener("ended", closeIntro);


    // Fallback in case browser doesn't fire "ended"
    setTimeout(() => {

        if (!introFinished) {
            closeIntro();
        }

    }, 6500);


    // If video cannot load
    introVideo.addEventListener("error", () => {

        console.warn("Intro video could not be loaded.");

        closeIntro();

    });


    /* =====================================================
       PLATFORM TABS
       ===================================================== */

    const platformTabs =
        document.querySelectorAll(".platform-tab");

    const platformContents =
        document.querySelectorAll(".platform-content");


    platformTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.getAttribute("data-platform");


            // Remove active from all tabs
            platformTabs.forEach(item => {
                item.classList.remove("active");
            });


            // Remove active from all content
            platformContents.forEach(content => {
                content.classList.remove("active");
            });


            // Activate clicked tab
            tab.classList.add("active");


            // Activate matching content
            const targetContent =
                document.getElementById(target);

            if (targetContent) {
                targetContent.classList.add("active");
            }

        });

    });


    /* =====================================================
       YOUTUBE FILTER
       ===================================================== */

    const youtubeFilters =
        document.querySelectorAll(".youtube-filter");


    youtubeFilters.forEach(button => {

        button.addEventListener("click", () => {

            youtubeFilters.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            /*
             * Actual YouTube Shorts / Videos API filtering
             * will be connected later.
             */

        });

    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            menuButton.classList.toggle("open");

        });


        // Close menu after clicking a navigation link
        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");
                menuButton.classList.remove("open");

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION ON SCROLL
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-link");


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const id =
                            entry.target.getAttribute("id");


                        navItems.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {

                                link.classList.add("active");

                            }

                        });

                    }

                });

            },

            {
                threshold: 0.35
            }

        );


    sections.forEach(section => {
        observer.observe(section);
    });


});
