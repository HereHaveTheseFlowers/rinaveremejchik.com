// Select all slides
const slides = document.querySelectorAll(".slide");

// maximum number of slides
const maxSlide = slides.length - 1;

// reverse the list
// also note slidesposition, it looks like: -200, -100, 0
const slidesreversed = [];
let i = maxSlide;
let slidesposition = [];
while(i >= 0) {
    slidesreversed.push(slides[i])
    slidesposition.push(-100 * (i))
    i--
}
// loop through slides and set each slides translateX property to index * -100% 
slidesreversed.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * -100}%)`;
});
// 0, -100, -200, etc.
// so the slides list looks like: -200, -100, 0
// select next slide button
const nextSlide = document.querySelector(".slider-next");

// current slide counter
let curSlide = slides.length * 2 - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
    // check if current slide is the last and reset current slide
    if (curSlide === slides.length * 2 - 1) {
    return;
    } else {
    curSlide++;
    }
    //   move slide by 50%
    //-50% <= 50 * -1 <= indx 0 - (curSlide 3 - 2 = 1)= -1
    //50% <= 50 * 1 <= indx 1 - (curSlide 3 - 2 = 1) = 2
    slides.forEach((slide, indx) => {
        slidesposition[indx] = slidesposition[indx] - 50
        slide.style.transform = `translateX(${slidesposition[indx]}%)`;
    });
});

// select prev slide button
const prevSlide = document.querySelector(".slider-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
    // check if current slide is the first and reset current slide to last
    if (curSlide === 1) {
    return;
    } else {
    curSlide--;
    }

    //   move every slide by -100%
    slides.forEach((slide, indx) => {
        slidesposition[indx] = slidesposition[indx] + 50
        slide.style.transform = `translateX(${slidesposition[indx]}%)`;
    });
});
