
const currentMousePos = { x: -1, y: -1 };

$(document).on("mousemove", function(e) {
  currentMousePos.x = e.pageX;
  currentMousePos.y = e.pageY;
});

let email_text = $("#email_text");
let dont_show_hint = false;
email_text.click(function(){
  email_text.css('transform', 'scale(0.93)')
  setTimeout(() =>  {
    email_text.css('transform', 'scale(1)')
  }, 200);
  navigator.clipboard.writeText('rinaveremejchik@gmail.com')
  const circle = document.createElement(`div`);
  circle.id = `copied`;
  const text = circle.appendChild(document.createElement(`span`));
  text.id = `copied`;
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

var posX = 0,
posY = 0;

TweenMax.to({}, 0.001, {
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
