function show() {
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}
show()

var tl = gsap.timeline()
tl.from(".leftcontent h3", {
    y: 100,
    duration: 0.5,
    opacity: 0,
})
tl.from(".leftcontent p", {
    y: 100,
    duration: 0.5,
    opacity: 0,
},'hi')
tl.from(".leftcontent .leftbutns", {
    y: 100,
    duration: 0.5,
    opacity: 0,
})
tl.from(".page1 img", {
    y: 100,
    duration: 0.5,
    opacity: 0,
},'hi')





gsap.from(".page2title p", {
    y: 80,
    duration: 0.5,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".page2title p",
        scroller: ".main",
        // markers: true,
        start: "top 100%",
        end: "top 80%",
        scrub: 2
    }
})
gsap.from(".page2title h3", {
    y: 80,
    duration: 0.5,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".page2title p",
        scroller: ".main",
        // markers: true,
        start: "top 100%",
        end: "top 80%",
        scrub: 2
    }
})
gsap.from(".page2left", {
    y: 80,
    duration: 0.5,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".page2left ",
        scroller: ".main",
        // markers: true,
        start: "top 90%",
        end: "top 60%",
        scrub: 2
    }
})
gsap.from(".page2right", {
    y: 80,
    duration: 0.5,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".page2left ",
        scroller: ".main",
        // markers: true,
        start: "top 90%",
        end: "top 60%",
        scrub: 2
    }
})



















gsap.from(".card1holder", {
    y: 80,
    duration: 0.5,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".card1holder",
        scroller: ".main",
        // markers: true,
        start: "top 90%",
        end: "top 60%",
        scrub: 2
    }
})
















//menu div changing animation 
function show1(){
    document.getElementById('div1').style.display="block";
    document.getElementById('div2').style.display="none";
    document.getElementById('div3').style.display="none";
    document.getElementById('div4').style.display="none";
}
function show2(){
    document.getElementById('div1').style.display="none";
    document.getElementById('div2').style.display="block";
    document.getElementById('div3').style.display="none";
    document.getElementById('div4').style.display="none";
}
function show3(){
    document.getElementById('div1').style.display="none";
    document.getElementById('div2').style.display="none";
    document.getElementById('div3').style.display="block";
    document.getElementById('div4').style.display="none";
}
function show4(){
    document.getElementById('div1').style.display="none";
    document.getElementById('div2').style.display="none";
    document.getElementById('div3').style.display="none";
    document.getElementById('div4').style.display="block";
}
