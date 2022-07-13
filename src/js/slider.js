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
const nextSlide = $("div.slider-next");
const nextSlidesvg = $("svg.slider-next");
// select prev slide button
const prevSlide = $("div.slider-prev");
const prevSlidesvg = $("svg.slider-prev");

// how much smaller the buttons become when you click on em
const svgTransform = 0.6

// current slide counter
let curSlide = slides.length * 2 - 1;

function goToNextSlide() {
    if (curSlide === slides.length * 2 - 1) {
        return;
    } else {
        curSlide++;
    }
    if(curSlide === slides.length * 2 - 1) {
        nextSlidesvg.removeClass('active');
    }
    prevSlidesvg.addClass('active');
	nextSlidesvg.css('transform', `scale(${-svgTransform}, ${svgTransform})`)
	setTimeout(() =>  {
		nextSlidesvg.css('transform', 'scale(-1, 1)')
	}, 200);
    //   move slide by 50%
    //-50% <= 50 * -1 <= indx 0 - (curSlide 3 - 2 = 1)= -1
    //50% <= 50 * 1 <= indx 1 - (curSlide 3 - 2 = 1) = 2
    slides.forEach((slide, indx) => {
        slidesposition[indx] = slidesposition[indx] - 50
        slide.style.transform = `translateX(${slidesposition[indx]}%)`;
    });
}

function goToPrevSlide() {
    if (curSlide === 1) {
        return;
    } else {
        curSlide--;
    }
    if(curSlide === 1) prevSlidesvg.removeClass('active');
    $('#buttontext').css('opacity', '0');
    $('#buttontext').css('transform', 'scale(0.5)');
    nextSlidesvg.addClass('active');
	prevSlidesvg.css('transform', `scale(${svgTransform})`)
	setTimeout(() =>  {
        $('#buttontext').css('display', 'none');
	}, 500);
	setTimeout(() =>  {
		prevSlidesvg.css('transform', 'scale(1)')
	}, 200);
    //   move every slide by -100%
    slides.forEach((slide, indx) => {
        slidesposition[indx] = slidesposition[indx] + 50
        slide.style.transform = `translateX(${slidesposition[indx]}%)`;
    });
}
// add event listener and navigation functionality
nextSlide.on("click", function () {
    goToNextSlide();
});

prevSlide.on("click", function () {
    goToPrevSlide();
});

$( "body" ).keydown(function(e) {
    if(e.which === 39) goToNextSlide();
    else if(e.which === 37) goToPrevSlide();
});
    
