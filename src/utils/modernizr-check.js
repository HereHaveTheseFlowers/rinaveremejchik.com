
// check for svg support
if (!Modernizr.inlinesvg) {
	$("#zoom-svg").css('display', 'none');
	$("#zoom-svg-fallback").css('display', 'block');
	$("#zoom-svg-fallback").attr("src", './img/zoom.png');

	$("#icon_logo-svg").css('display', 'none');
	$("#icon_logo-fallback").css('display', 'block');
	$("#icon_logo-fallback").attr("src", './img/icon_logo.png');
}
if(!Modernizr.svg) {
	$("img.link-instagram").attr("src", "./img/instagram.png");
	$("img.zoomed-cross").attr("src", "./img/CROSS.png");
}
