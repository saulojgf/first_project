/*
===============================================
 Project Name : Features
 File Name    : features.jd
 Author       : Saulo Garcia
 Created On   : 2025-09-15
 Last Updated : 2025-09-15
 Version      : 1.0
 Description  : Features : Carousel
===============================================
*/

const slides = Array.from(main.ctner_tracker.children);
slides[0].classList.add("inside");
slides[slides.length-1].classList.add("outside-left");

let indexSlide = 0;

const nextSlide = (e) => {
    if(indexSlide-1 == -1){
        slides[slides.length-1].classList.add("outside-right");
        slides[slides.length-1].classList.remove("outside-left","trans-out");
    }else{
        slides[indexSlide-1].classList.add("outside-right");
        slides[indexSlide-1].classList.remove("outside-left", "trans-out");
    }

    slides[indexSlide].classList.add("outside-left", "trans-out");
    slides[indexSlide].classList.remove("inside", "trans-in");

    if(indexSlide+1 == slides.length){
        slides[0].classList.add("inside", "trans-in");
        slides[0].classList.remove("outside-right");
    }else{
        slides[indexSlide+1].classList.add("inside", "trans-in");
        slides[indexSlide+1].classList.remove("outside-right");
    }
    if(indexSlide < slides.length-1){indexSlide++;}else{indexSlide=0;}

    // Debug info - Enable to debug
    // console.log(indexSlide);
    // console.log("Next Slide");
    // console.log(slides);
}

const prevSlide = (e) => {

    if(indexSlide-1 == -1){
        slides[slides.length-1].classList.add("inside", "trans-in");
        slides[slides.length-1].classList.remove("outside-left");
    }else{
        slides[indexSlide-1].classList.add("inside", "trans-in");
        slides[indexSlide-1].classList.remove("outside-left");
    }

    slides[indexSlide].classList.add("outside-right", "trans-out");
    slides[indexSlide].classList.remove("inside", "trans-in");

    if(indexSlide > 0){indexSlide--}else{indexSlide = slides.length-1}

    if(indexSlide-1 < 0){
        slides[slides.length-1].classList.add("outside-left");
        slides[slides.length-1].classList.remove("outside-right", "trans-out");
    }else{
        slides[indexSlide-1].classList.add("outside-left");
        slides[indexSlide-1].classList.remove("outside-right", "trans-out");
    }

    // Debug info - Enbale for debug
    // console.log(indexSlide);
    // console.log(slides);
    // console.log("Previos Slide");
}

main.btn_prev.addEventListener("click", prevSlide);
main.btn_next.addEventListener("click", nextSlide);

setInterval(nextSlide, 5000);

// console.log(main);
// console.log(slides);
