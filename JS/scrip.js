/* MENU MOBILE */
const navCollapse = document.getElementById("BarraNav");

if (navCollapse) {
    navCollapse.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth < 992 && window.bootstrap) {
                const collapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapse);

                if (navCollapse.classList.contains("collapsing")) {
                    navCollapse.addEventListener("shown.bs.collapse", function () {
                        collapse.hide();
                    }, { once: true });
                } else {
                    collapse.hide();
                }
            }
        });
    });
}

/* FAQ ACCORDION */
document.querySelectorAll(".faq-question").forEach(function (question) {
    question.addEventListener("click", function () {
        const answer = document.getElementById(this.getAttribute("aria-controls"));
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        const icon = this.querySelector("i");

        this.setAttribute("aria-expanded", String(!isExpanded));
        if (answer) {
            answer.hidden = isExpanded;
        }

        if (icon) {
            icon.classList.toggle("fa-plus", isExpanded);
            icon.classList.toggle("fa-minus", !isExpanded);
        }
    });
});

const currentYear = document.getElementById("currentYear");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

/* BLOOM FIELD BACKGROUND MOTION */
const bloomMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!bloomMotion.matches) {
    const bloomRoot = document.documentElement;
    const seedPhase = function (seed) {
        let hash = seed | 0;
        hash = Math.imul(hash ^ (hash >>> 16), 0x21f0aaad);
        hash = Math.imul(hash ^ (hash >>> 15), 0x735a2d97);
        return ((hash ^ (hash >>> 15)) >>> 0) / 4294967296 * Math.PI * 2;
    };
    const blobs = [
        { x: 65.34, y: 44.62, px: seedPhase(101), py: seedPhase(102) },
        { x: 28.07, y: 74.48, px: seedPhase(201), py: seedPhase(202) },
        { x: 52.42, y: 19.94, px: seedPhase(301), py: seedPhase(302) },
        { x: 80.31, y: 84.47, px: seedPhase(401), py: seedPhase(402) }
    ];
    let startTime;

    const animateBloom = function (timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const t = (timestamp - startTime) / 1000;
        const ph = t * 0.77;
        const amt = 1.00;
        const dir = 1;
        const spin = ph * dir;

        blobs.forEach(function (blob, index) {
            const x = blob.x + (Math.sin(spin * 0.55 + blob.px) - Math.sin(blob.px)) * 14 * amt;
            const y = blob.y + (Math.sin(spin * 0.43 + blob.py) - Math.sin(blob.py)) * 14 * amt;
            const n = index + 1;

            bloomRoot.style.setProperty("--bloom-x-" + n, x + "%");
            bloomRoot.style.setProperty("--bloom-y-" + n, y + "%");
        });

        window.requestAnimationFrame(animateBloom);
    };

    window.requestAnimationFrame(animateBloom);
}

/* SCROLL REVEALS */
document.querySelectorAll(
    ".textHistoryStyle, .timeline-item, .space-header, .modalidade, .teacher-card, .schedule-wrapper"
).forEach(function (element) {
    element.dataset.reveal = "";
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll("[data-reveal]").forEach(function (element) {
        revealObserver.observe(element);
    });
}
