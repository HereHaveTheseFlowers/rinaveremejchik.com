const magnetic = document.querySelectorAll('.magnetic');

magnetic.forEach(function(elem){
  $(document).on('mousemove touch', function(e){
    magnetize(elem, e);
  });
})

const currentMousePos = { x: -1, y: -1 };

$(document).on("mousemove", function(e) {
  currentMousePos.x = e.pageX;
  currentMousePos.y = e.pageY;
});

function magnetize(el, e){
  let mX = e.pageX,
      mY = e.pageY;
  const item = $(el);
  
  const customDist = item.data('dist') * 20|| 120;
  const centerX = item.offset().left + (item.width()/2);
  const centerY = item.offset().top + (item.height()/2);
  
  let deltaX = Math.floor((centerX - mX)) * -0.15;
  let deltaY = Math.floor((centerY - mY)) * -0.15;
  
  let distance = calculateDistance(item, mX, mY);
    
  if(distance < customDist + 70){
    TweenMax.to(item, 0.7, {y: deltaY, x: deltaX, scale:1.09});
    item.addClass('magnet');
  }
  else {
    TweenMax.to(item, 0.7, {y: 0, x: 0, scale:1});
    item.removeClass('magnet');
  }

}

function calculateDistance(elem, mouseX, mouseY) {
  return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
}

let email_text = $("#email_text");
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
  setTimeout(() =>  {
    circle.remove();
  }, 1700);
});

let follower = $("#cursor-follower");

let cursortext = $("#cursor-text");

var posX = 0,
posY = 0;

TweenMax.to({}, 0.016, {
repeat: -1,
onRepeat: function() {
    posX += (currentMousePos.x - posX) / 9;
    posY += (currentMousePos.y - posY) / 9;
    TweenMax.set(follower, {
        css: {
            left: posX - 20,
            top: posY - 20
        }
    });
    TweenMax.set(cursortext, {
        css: {
            left: posX - 18,
            top: posY
        }
    });
}
});


$(".cursor-hover").on("mouseenter", function() {
  follower.addClass(" active");
  cursortext.addClass(" active");
});

$(".cursor-hover").on("mouseleave", function() {
  follower.removeClass(" active");
  cursortext.removeClass(" active");
});

