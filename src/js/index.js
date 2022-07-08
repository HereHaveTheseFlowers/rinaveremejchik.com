
const currentMousePos = { x: -1, y: -1 };

$(document).on("mousemove", function(e) {
	currentMousePos.x = e.pageX;
	currentMousePos.y = e.pageY;
});

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
	cursorshape.removeClass(" show_hint");
	cursortext.removeClass(" show_hint");
	setTimeout(() =>  {
		circle.remove();
	}, 1700);
	setTimeout(() =>  {
		dont_show_hint = false;
	}, 3000);
});

let follower = $("#cursor-follower");
let cursorshape = $("#cursor-shape");
let cursortext = $("#cursor-text");

/* old cursor movement
var posX = 0,
posY = 0;
TweenMax.to({}, 0.003, {
repeat: -1,
onRepeat: function() {
    posX += (currentMousePos.x - posX) / 9;
    posY += (currentMousePos.y - posY) / 9;
    TweenMax.set(follower, {
        css: {
            left: posX - (Number(follower.css("width").match(/\d+/)[0]) / 2),
            top: posY - (Number(follower.css("height").match(/\d+/)[0]) / 2)
        }
    });
}
});
*/
gsap.set(follower, {xPercent: -50, yPercent: -50});

let xTo = gsap.quickTo(follower, "x", {duration: 0.1, ease: "power3"}),
    yTo = gsap.quickTo(follower, "y", {duration: 0.1, ease: "power3"});

window.addEventListener("mousemove", e => {
	xTo(e.clientX);
	yTo(e.clientY);
});

$(".cursor-hover").on("mouseenter", function() {
	if(dont_show_hint) return;
	cursorshape.addClass(" show_hint");
	cursortext.addClass(" show_hint");
	document.body.style.cursor = 'none';
});

$(".cursor-hover").on("mouseleave", function() {
	cursorshape.removeClass(" show_hint");
	cursortext.removeClass(" show_hint");
	document.body.style.cursor = 'auto';
});

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
			}, 500);
		}
	}
});
