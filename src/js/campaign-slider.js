
function handleCampgaignSelectImage(event) {
    const pressedImage = event.target;
    if(!pressedImage) return;

    const targetSrc = pressedImage.src;
    if(targetSrc && !pressedImage.classList.contains("campaign-image-selected")) {
        const mainImage = pressedImage.closest('.campaign-panel').previousElementSibling.firstChild.firstChild;
        if(!mainImage) return;
        mainImage.onload = () => {
            if(targetSrc.includes('landscape')) {
                mainImage.parentNode.className = "col-md-10 offset-md-1";
            } else {
                mainImage.parentNode.className = "col-md-8 offset-md-2";
            }
        };
        mainImage.src = `${targetSrc.replace('-icon', '-min')}`
        mainImage.dataset.src = `${targetSrc.replace('-icon', '')}`
        mainImage.srcset = `${targetSrc.replace('-icon', '-lowq')} 500w, ${targetSrc.replace('-icon', '')} 900w`;
        mainImage.dataset.srcset = `${targetSrc.replace('-icon', '-lowq')} 500w, ${targetSrc.replace('-icon', '')} 900w`;
        const campaignButtons  = pressedImage.parentNode.parentNode.children;
        for(const campaignButton of campaignButtons) {
            const campaignImage = campaignButton.firstChild;
            if(!campaignImage) return;
            if(campaignImage.classList.contains("campaign-image-selected")) {
                campaignImage.classList.remove("campaign-image-selected");
            }
        }
        pressedImage.classList.add("campaign-image-selected");
        pressedImage.parentNode.classList.add('pressed')
        setTimeout(() =>  {
            pressedImage.parentNode.classList.remove('pressed')
        }, 200);
    }
};

const handleCampgaignRight = (event) => {
    const pressedElement = event.target;
    if(!pressedElement) return;
    let pressedButton = pressedElement;
    if(pressedElement.nodeName != "BUTTON") {
        pressedButton = pressedButton.closest("button")
    }
    console.log(pressedButton)
    const siblings  = pressedButton.parentNode.children;
    
    for(const sibling of siblings) {
        const siblingImage = sibling.firstChild;
        console.log(siblings)
        if(!siblingImage) return;
        if(siblingImage.classList.contains("campaign-image-selected")) {
            if(!sibling.nextElementSibling) return;
            const targetImage = sibling.nextElementSibling.firstChild
            if(!targetImage) return;
            const targetSrc = targetImage.src;
            if(!targetSrc) return;
            const mainImage = sibling.closest('.campaign-panel').previousElementSibling.firstChild.firstChild;
            if(!mainImage) return;
            mainImage.onload = () => {
                if(targetSrc.includes('landscape')) {
                    mainImage.parentNode.className = "col-md-10 offset-md-1";
                } else {
                    mainImage.parentNode.className = "col-md-8 offset-md-2";
                };
            }
            mainImage.src = `${targetSrc.replace('-icon', '-min')}`
            mainImage.dataset.src = `${targetSrc.replace('-icon', '')}`
            mainImage.srcset = `${targetSrc.replace('-icon', '-lowq')} 500w, ${targetSrc.replace('-icon', '')} 900w`;
            mainImage.dataset.srcset = `${targetSrc.replace('-icon', '-lowq')} 500w, ${targetSrc.replace('-icon', '')} 900w`;
            targetImage.classList.add("campaign-image-selected");
            siblingImage.classList.remove("campaign-image-selected");
            pressedButton.classList.add('pressed')
            setTimeout(() =>  {
                pressedButton.classList.remove('pressed')
            }, 200);
            return;
        }
    }
}

const handleCampgaignLeft = (event) => {
    const pressedElement = event.target;
    if(!pressedElement) return;
    let pressedButton = pressedElement;
    if(pressedElement.nodeName != "BUTTON") {
        pressedButton = pressedButton.closest("button")
    }
    console.log(pressedButton)
    const siblings  = pressedButton.parentNode.children;
    
    for(const sibling of siblings) {
        const siblingImage = sibling.firstChild;
        console.log(siblings)
        if(!siblingImage) return;
        if(siblingImage.classList.contains("campaign-image-selected")) {
            if(!sibling.previousElementSibling) return;
            const targetImage = sibling.previousElementSibling.firstChild
            if(!targetImage) return;
            const targetSrc = targetImage.src;
            if(!targetSrc) return;
            const mainImage = sibling.closest('.campaign-panel').previousElementSibling.firstChild.firstChild;
            if(!mainImage) return;
            mainImage.onload = () => {
                if(targetSrc.includes('landscape')) {
                    mainImage.parentNode.className = "col-md-10 offset-md-1";
                } else {
                    mainImage.parentNode.className = "col-md-8 offset-md-2";
                };
            }
            mainImage.src = `${targetSrc.replace('-icon', '-min')}`
            mainImage.dataset.src = `${targetSrc.replace('-icon', '')}`
            mainImage.srcset = `${targetSrc.replace('-icon', '-lowq')} 500w, ${targetSrc.replace('-icon', '')} 900w`;
            mainImage.dataset.srcset = `${targetSrc.replace('-icon', '-lowq')} 500w, ${targetSrc.replace('-icon', '')} 900w`;
            targetImage.classList.add("campaign-image-selected");
            siblingImage.classList.remove("campaign-image-selected");
            pressedButton.classList.add('pressed')
            setTimeout(() =>  {
                pressedButton.classList.remove('pressed')
            }, 200);
            return;
        }
    }
}

const campaignImages = document.querySelectorAll('.campaign-image');

for(const image of campaignImages) {
    image.addEventListener('click', handleCampgaignSelectImage);
}


const campaignRightButtons = document.querySelectorAll('.campaign-right');

for(const button of campaignRightButtons) {
    button.addEventListener('click', handleCampgaignRight);
}

const campaignLeftButtons = document.querySelectorAll('.campaign-left');

for(const button of campaignLeftButtons) {
    button.addEventListener('click', handleCampgaignLeft);
}
