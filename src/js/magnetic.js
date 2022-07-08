
for(let i = 1; i <= 20; i++) {
    const magneticList = document.querySelectorAll('.magnetic' + i);
    magneticList.forEach(function(elem){
      $(document).on('mousemove touch', function(e){
        magnetize(elem, e, i/100);
      });
    })
}

function magnetize(el, e, magnetOffset){
    let mX = e.pageX,
        mY = e.pageY;
    const item = $(el);

    const customDist = item.data('dist') * 20|| 120;
    const centerX = item.offset().left + (item.width()/2);
    const centerY = item.offset().top + (item.height()/2);

    let deltaX = Math.floor((centerX - mX)) * -magnetOffset;
    let deltaY = Math.floor((centerY - mY)) * -magnetOffset;

    let distance = calculateDistance(item, mX, mY);
        
    if(distance < customDist + 70){
        gsap.to(item, 0.9, {y: deltaY*1.3, x: deltaX});
        item.addClass('magnet');
    }
    else {
        gsap.to(item, 0.9, {y: 0, x: 0});
        item.removeClass('magnet');
    }

}

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
}

