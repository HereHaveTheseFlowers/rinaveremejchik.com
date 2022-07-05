var magnetic = document.querySelectorAll('.magnetic');

magnetic.forEach(function(elem){
    $(document).on('mousemove touch', function(e){
    magnetize(elem, e);
    });
})

const currentMousePos = { x: -1, y: -1 };

jQuery(function($) {
  $(document).mousemove(function(event) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
  });
});


function magnetize(el, e){
  var mX = e.pageX,
      mY = e.pageY;
  const item = $(el);
  
  const customDist = item.data('dist') * 20|| 120;
  const centerX = item.offset().left + (item.width()/2);
  const centerY = item.offset().top + (item.height()/2);
  
  var deltaX = Math.floor((centerX - mX)) * -0.15;
  var deltaY = Math.floor((centerY - mY)) * -0.15;
  
  var distance = calculateDistance(item, mX, mY);
    
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

$("#email_text").click(function(){
    const circle = document.createElement(`div`);
    circle.id = `copied`;
    const text = circle.appendChild(document.createElement(`span`));
    text.style.opacity = '1';
    text.style.color = 'black';
    text.textContent = `Copied!`;
    circle.style.top = `calc(${currentMousePos.y}px - 5vh)`
    circle.style.left = `calc(${currentMousePos.x}px - 5vh)`
    document.body.appendChild(circle);
    circle.style.animation = 'anim1 1s ease-out 20'
    setTimeout(() =>  {
        circle.style.animation = ''
    }, 1000);
});
