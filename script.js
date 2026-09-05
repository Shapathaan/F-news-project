document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const introVideo = document.getElementById("introVideo");
    const mainWebsite = document.getElementById("mainWebsite");

    let introFinished = false;
    let durationTimer = null;


    /* =========================
       INTRO
    ========================= */

    document.body.classList.add("intro-active");


    function showWebsite() {

        if (introFinished) return;

        introFinished = true;

        if (durationTimer) {
            clearTimeout(durationTimer);
        }

        /*
         * First reveal the website,
         * then fade/zoom the intro away.
         */

        mainWebsite.classList.add("show");

        requestAnimationFrame(() => {
            intro.classList.add("hide");
        });


        /*
         * Completely remove intro
         * after transition finishes.
         */

        setTimeout(() => {

            intro.style.display = "none";

            document.body.classList.remove("intro-active");

            /*
             * Stop video and release it.
             */

            introVideo.pause();
            introVideo.removeAttribute("src");
            introVideo.load();

        }, 1000);
    }


    /*
     * Normal ending
     */

    introVideo.addEventListener("ended", () => {
        showWebsite();
    });


    /*
     * Get actual video duration.
     * Don't use a fixed 6.5 second timer.
     */

    introVideo.addEventListener("loadedmetadata", () => {

        const duration = introVideo.duration;

        if (
            Number.isFinite(duration) &&
            duration > 0
        ) {

            /*
             * Give the video a tiny safety margin.
             */

            const time = Math.max(
                1000,
                (duration + 0.15) * 1000
            );

            durationTimer = setTimeout(() => {
                showWebsite();
            }, time);
        }
    });


    /*
     * Fallback if video fails.
     */

    introVideo.addEventListener("error", () => {

        console.warn("Intro video failed to load.");

        showWebsite();
    });


    /*
     * Make sure autoplay starts.
     */

    const playPromise = introVideo.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            console.warn(
                "Autoplay blocked. Video requires user interaction."
            );

        });

    }


    /* =========================
       PLATFORM TABS
    ========================= */

    const platformTabs =
        document.querySelectorAll(".platform-tab");

    const platformContents =
        document.querySelectorAll(".platform-content");


    platformTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.getAttribute("data-platform");


            platformTabs.forEach(item => {
                item.classList.remove("active");
            });


            platformContents.forEach(content => {
                content.classList.remove("active");
            });


            tab.classList.add("active");


            const targetContent =
                document.getElementById(target);


            if (targetContent) {
                targetContent.classList.add("active");
            }

        });

    });


    /* =========================
       YOUTUBE FILTER
    ========================= */

    const youtubeFilters =
        document.querySelectorAll(".youtube-filter");


    youtubeFilters.forEach(button => {

        button.addEventListener("click", () => {

            youtubeFilters.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

        });

    });


    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            menuButton.classList.toggle("open");

        });


        document.querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                    menuButton.classList.remove("open");

                });

            });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-link");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

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
