import { Power3, gsap } from "gsap";
import barba from "@barba/core";
import { ScrollSmoother } from "gsap-trial/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap-trial/dist/ScrollTrigger";

const $ = selector => document.querySelector(selector);
const secondBg = $("#secondBg");
const navBar = $("#navRef");
const $menu = $("[data-menu]");
const $open = $("[data-open-menu]");
function delay(n: number) {
    n = n || 3000;
    return new Promise<void>(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}

const tl: GSAPTimeline = gsap.timeline({
    defaults: { duration: 1, ease: Power3.easeInOut },
    paused: true,
});

tl.from([$menu, secondBg, navBar], {
    x: "100%",
    stagger: {
        amount: 0.5,
    },
});

const $elems = [
    document.querySelector("[data-close-menu]"),
    ...document.querySelectorAll("[data-navbar-el]"),
];

function openUp() {
    document.body.classList.add("overflow-y-hidden");
    tl.play();
    $elems.forEach($elem =>
        $elem.addEventListener("click", () => {
            closeAgain;
        })
    );
}

function closeAgain() {
    tl.reverse();
    console.log("Close");
    document.body.classList.remove("overflow-y-hidden");
}
$open.addEventListener("click", openUp);
$elems.forEach($elem => $elem.addEventListener("click", closeAgain));

function pageTransition() {
    const tl = gsap.timeline();

    tl.to(".loading-screen", {
        width: "100%",
        right: "0%",
        duration: 1,
        delay: 0.3,
    });

    tl.to(".loading-screen", {
        width: "100%",
        right: "100%",
        duration: 1,
        delay: 1,
    });

    tl.set(".loading-screen", {
        right: "-100%",
        onComplete: () => {},
    });
}

function ContentTransitionLoading() {
    const tl = gsap.timeline();
    tl.from("#textPageSection", {
        x: 150,
        delay: 0.5,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
    });

    tl.to("#textPageSection", {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.5,
    });
}

function ContentAnimation() {
    const timeline = gsap.timeline({
        defaults: {},
    });
    timeline.from("[animate-text-section]", {
        y: "100%",
        opacity: 0,
        duration: 2,
        delay: 1,
        stagger: 0.15,
    });

    timeline.to("[animate-text-section]", {
        y: 0,
        opacity: 1,
    });

    timeline.from("[animate-image-section]", {
        x: "100%",
        delay: 1,
        opacity: 0,
        duration: 1,
    });

    timeline.to("[animate-image-section]", {
        x: 0,
        opacity: 1,
    });
}

barba.init({
    transitions: [
        {
            sync: true,
            async leave(data) {
                const done = this.async();
                pageTransition();
                await delay(2000);
                done();
            },
            async enter(data) {
                ContentTransitionLoading();
                ContentAnimation();
            },
            async once(data) {
                heroLoadAnimation();
            },
        },
    ],
});
function heroLoadAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "ease-in" } });
    // tl.to("[animate-hero-container]", {
    //     display: "flex",
    // }).from("[animate-hero-text]", {
    //     y: "100%",
    //     opacity: 0,
    //     duration: 2,
    //     stagger: 0.5,
    // });

    // tl.to("[animate-hero-text]", {
    //     opacity: 0,
    //     duration: 2,
    //     stagger: 0.5,
    // });

    // tl.to("[animate-hero-container]", {
    //     opacity: 0,
    //     display: "none",
    //     duration: 1,
    // });

    tl.from("[animate-text]", {
        y: "100%",
        opacity: 0,
        duration: 2,
        stagger: 0.15,
    });
    tl.from("[animate-image]", {
        x: "100%",
        opacity: 0,
        duration: 1,
    });
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const smoother = ScrollSmoother.create({
    content: "#content",
    smooth: 1.5,
    effects: true,
});

smoother.effects("img", { speed: "auto" });

function heroAnimation() {
    const heroScroller = gsap
        .timeline({
            paused: true,
            scrollTrigger: {
                trigger: "#content",
                toggleActions: "play none none reverse",
                pin: true,
                scrub: true,
            },
        })
        .to("#content", { opacity: 0, stagger: 0.2 });

    return heroScroller;
}
window.addEventListener("DOMContentLoaded", () => {
    heroAnimation();
});
