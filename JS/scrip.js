/* MENU MOBILE */
        const menuToggle =
            document.getElementById("menuToggle");

        const navLinks =
            document.getElementById("navLinks");


        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

        });



        /* ==============================
           FECHAR MENU AO CLICAR
        ============================== */

        const links =
            document.querySelectorAll(".nav-links a");


        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

            });

        });



        /* ==============================
           FAQ ACCORDION
        ============================== */

        const faqQuestions =
            document.querySelectorAll(".faq-question");


        faqQuestions.forEach(function (question) {

            question.addEventListener("click", function () {

                const faqItem =
                    this.parentElement;


                faqItem.classList.toggle("active");


                const icon =
                    this.querySelector("i");


                if (faqItem.classList.contains("active")) {

                    icon.classList.remove("fa-plus");

                    icon.classList.add("fa-minus");

                } else {

                    icon.classList.remove("fa-minus");

                    icon.classList.add("fa-plus");

                }

            });

        });