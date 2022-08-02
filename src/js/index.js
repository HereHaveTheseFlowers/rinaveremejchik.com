
//  mouse position 

const currentMousePos = { x: -1, y: -1 };

$(document).on("mousemove", function(e) {
	currentMousePos.x = e.pageX;
	currentMousePos.y = e.pageY;
});

// email button click event

let email_button = $("#email_button");
let dont_show_hint = false;

email_button.click(function(){
	email_button.css('transform', 'scale(0.93)')
	setTimeout(() =>  {
		email_button.css('transform', 'scale(1)')
	}, 200);
	navigator.clipboard.writeText('rinaveremejchik@gmail.com')
	const circle = document.createElement(`div`);
	circle.id = `copied_hint`;
	const text = circle.appendChild(document.createElement(`span`));
	text.id = `copied_hint`;
	text.textContent = `Copied!`;
	circle.style.top = `calc(${currentMousePos.y}px - 7.5vh)`
	circle.style.left = `calc(${currentMousePos.x}px - 7.5vh)`
	document.body.appendChild(circle);
	dont_show_hint = true;
	cursorshape.removeClass(" show_hint_copy");
	cursortext.removeClass(" show_hint_copy");
	setTimeout(() =>  {
		circle.remove();
	}, 1700);
	setTimeout(() =>  {
		dont_show_hint = false;
	}, 3000);
});

// DISABLING SCROLLING FUNC
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
	SmoothScroll({stepSize:0,})
	window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
	window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
	SmoothScroll({stepSize:75,})
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
	window.removeEventListener('touchmove', preventDefault, wheelOpt);
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// IMAGE ZOOM

let zoom = 1;
const zoomingSpeed = 0.04;
const image_zoom = $("img.image-zoomed");
const div_zoom = $("div.image-zoomed");
let canopen = true;
const open_time = 800;
let canclose = false;
const close_time = 500;
$(".zoomable").on('click', function () { 
	if(!canopen) return;
	if(div_zoom.css('display') === 'flex') return;
	cursorshape.removeClass(" show_hint_zoom");
	cursorzoom.removeClass(" show_hint_zoom");
	disableScroll();
	zoom = 1;
	image_zoom.css('transform', `scale(${zoom})`);
	if($(this).hasClass("3-2")) {
		let newsrc = this.src.replace('.jpg', '-3x2.jpg');
		image_zoom.attr('src', (newsrc));
	} else {
		image_zoom.attr('src', this.src);
	}
	
	image_zoom.attr('alt', this.alt);
	div_zoom.css('display', 'flex');
	div_zoom.removeClass('is-hidden');
	div_zoom.addClass('is-visible');
	$("main").css('filter', 'blur(10px)');
	$("header").css('filter', 'blur(8px)');
	$(image_zoom).hover(
		function() { $.data(this, 'hover', true); },
		function() { $.data(this, 'hover', false); }
	).data('hover', false);
	$('#slider-button-zoomed-left').hover(
		function() { $.data(this, 'hover', true); },
		function() { $.data(this, 'hover', false); }
	).data('hover', false);
	$('#slider-button-zoomed-right').hover(
		function() { $.data(this, 'hover', true); },
		function() { $.data(this, 'hover', false); }
	).data('hover', false);
	canopen = false;
	canclose = false;
	setTimeout(() =>  {
		canopen = true;
	}, open_time);
	setTimeout(() =>  {
		canclose = true;
	}, close_time);
});
$('html').on('click', function () { 
	let noticehover = false;
	for(let notice of listofnotices)
		if($(notice).data('hover')) noticehover = true;
	if(canclose && !noticehover && !$(image_zoom).data('hover') && !$('#slider-button-zoomed-right').data('hover') && !$('#slider-button-zoomed-left').data('hover')) {
		div_zoom.addClass('is-hidden');
		$("main").css('filter', 'none');
		$("header").css('filter', 'none');
		enableScroll();
		setTimeout(() =>  {
			$("main").css('filter', 'none');
			$("header").css('filter', 'none');
			div_zoom.css('display', 'none');
			div_zoom.addClass('is-hidden');
			div_zoom.removeClass('is-visible');
			image_zoom.attr('src', '');
			$('#div-zoomed').css('left', '0');
			$('#div-zoomed').css('top', '0');
		}, 500);
	}
});
/* $('img.image-zoomed').on('click', function () {
	if(zoom === 1) zoom = 1.48;
	else zoom = 1;
	image_zoom.css('transform', `scale(${(zoom)})`);
}); */

document.addEventListener("wheel", (e)=> {
	if(div_zoom.css('display') === 'flex' && zoom >= 1 && zoom <= 1.5) {
		if(e.deltaY > 0 && zoom >= 1 + zoomingSpeed) {
			zoom -= zoomingSpeed;
			image_zoom.css('transform', `scale(${(zoom)})`);
		}
		else if(e.deltaY <= 0 && zoom <= 1.5 - zoomingSpeed) {
			zoom += zoomingSpeed;
			image_zoom.css('transform', `scale(${(zoom)})`);
		}
	}
})

/// dragging the image

const $draggable = $('.draggable').draggabilly({
	// options...
});
$draggable.on( 'dragMove', function(pointer) { 
	xTo(pointer.pageX);
	yTo(pointer.pageY - document.documentElement.scrollTop);
	//if( Number($('#div-zoomed').css('top').match(/\d+/)[0]) < 0) $draggable.draggabilly('dragEnd')
})
$draggable.on( 'dragStart', () => { cursorshape.addClass(" show_drag") })
$draggable.on( 'dragEnd', () => { cursorshape.removeClass(" show_drag") })

// Context menu rewrite

let listofnotices = [];

$("img").contextmenu(function() {
	// deleting all the past created notices
	for(let notice of listofnotices) {
		notice.style.opacity = 0;
		notice.style.transform = 'scale(0.9)';
		setTimeout(() =>  {
			notice.remove();
		}, 500);
	}
	// creating a new notice based on image's alt property
	const imagenotice = document.createElement(`div`);
	listofnotices.push(imagenotice);
	imagenotice.id = `image_notice`;
	imagenotice.innerHTML = this.alt;
	// calculating the position based on the cursor position
	imagenotice.style.top = `calc(${currentMousePos.y}px )`;
	imagenotice.style.left = `calc(${currentMousePos.x}px)`;
	// adding notice to the body
	document.body.appendChild(imagenotice);
	// tracking are we hovering on the element so we can decide should we delete it when clicking
	$(imagenotice).hover(
		function() { $.data(this, 'hover', true); },
		function() { $.data(this, 'hover', false); }
	).data('hover', false);
	// not letting the browser open the context menu!
	return false;
});
$('html').on('click', function () { 
	// deleting all the notices we're not hovering on right now
	for(let notice of listofnotices) {
		if(!$(notice).data('hover')) {
			notice.style.opacity = 0;
			notice.style.transform = 'scale(0.9)';
			setTimeout(() =>  {
				notice.remove();
				$(notice).data('hover', false);
			}, 500);
		}
	}
});

$("a.link-instagram").click(function(){
	$('img.link-instagram').css('transform', 'scale(0.86)')
	setTimeout(() =>  {
		$('img.link-instagram').css('transform', 'scale(1)')
	}, 200);
	$(this).addClass("active").delay(300).queue(function(next){
		$(this).removeClass("active");
		next();
	});
});


class TextFlow {
    constructor(el) {
        this.el = el;
        this.update = this.update.bind(this);
        this.textNew = "";
    }
    setText(newText, speed = 10) {
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let nextChar of newText)
            this.queue.push(nextChar);
        this.frame = 0;
        this.output = "";
        this.update();
        this.speed = speed;
        return promise;
    }
    update() {
        let character = this.queue[this.frame];
        if(this.frame >= this.queue.length) {
			this.el.innerHTML = this.output;
            this.resolve();
        } else {
            let timeoutTime = this.speed + Math.floor(Math.random() * (this.speed*2))
			if(character === '<') {
				character = '<br>';
				timeoutTime = timeoutTime*5;
			} else if (character === ' ') {
				timeoutTime = timeoutTime*3;
			}
			this.output += character;
            this.el.innerHTML = this.output + '|';
            setTimeout(() => {  this.frameRequest = requestAnimationFrame(this.update); }, timeoutTime);
            this.frame++;
        }
    }
}
