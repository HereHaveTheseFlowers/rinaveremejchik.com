
window.addEventListener('DOMContentLoaded', () => {
    let loader = document.querySelector('.loader');
    if(loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            if(!loader) loader =  document.querySelector('.loader');
            loader.parentElement.removeChild(loader)
        }, 200);
    }
    loader = null;
});