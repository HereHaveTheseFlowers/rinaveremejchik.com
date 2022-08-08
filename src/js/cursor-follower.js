/// CURSOR REPLACEMENT

let follower = $("#cursor-follower");
let cursorshape = $("#cursor-shape");
let cursortext = $("#cursor-text");
let cursorzoom = $("#cursor-zoom");
let dont_show_hint = false;

gsap.set(follower, {xPercent: -50, yPercent: -50});

let xTo = gsap.quickTo(follower, "x", {duration: 0.1, ease: "power3"}),
    yTo = gsap.quickTo(follower, "y", {duration: 0.1, ease: "power3"});

window.addEventListener("mousemove", e => {
	follower.css('opacity', '1');
	xTo(e.clientX);
	yTo(e.clientY);
});

$("svg.slider-prev").on("mouseenter", function() {
	cursorshape.addClass(" show_hint_button");
});

$("svg.slider-prev").on("mouseleave", function() {
	cursorshape.removeClass(" show_hint_button");
});

$("svg.slider-next").on("mouseenter", function() {
	cursorshape.addClass(" show_hint_button");
});

$("svg.slider-next").on("mouseleave", function() {
	cursorshape.removeClass(" show_hint_button");
});

$("#buttontext").on("mouseenter", function() {
	cursorshape.addClass(" show_hint_button");
});

$("#buttontext").on("mouseleave", function() {
	cursorshape.removeClass(" show_hint_button");
});

$("a.link-instagram").on("mouseenter", function() {
	cursorshape.addClass(" show_hint_button");
});

$("a.link-instagram").on("mouseleave", function() {
	cursorshape.removeClass(" show_hint_button");
});

$(".cursor-hover").on("mouseenter", function() {
	if(dont_show_hint) return;
	cursorshape.addClass(" show_hint_copy");
	cursortext.addClass(" show_hint_copy");
});

$(".cursor-hover").on("mouseleave", function() {
	cursorshape.removeClass(" show_hint_copy");
	cursortext.removeClass(" show_hint_copy");
});

$(".zoomable").on("mouseenter", function() {
	cursorshape.addClass(" show_hint_zoom");
	cursorzoom.addClass(" show_hint_zoom");
});

$(".zoomable").on("mouseleave", function() {
	cursorshape.removeClass(" show_hint_zoom");
	cursorzoom.removeClass(" show_hint_zoom");
});

$("a").on("mouseenter", function() {
	cursorshape.addClass(" show_hint_button");
});

$("a").on("mouseleave", function() {
	cursorshape.removeClass(" show_hint_button");
});
