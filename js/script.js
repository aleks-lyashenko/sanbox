const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const sliderBody = document.querySelector('.slider_body');

const images = Array.from(sliderBody.children);

images.forEach((image,index)=>{
    if(index === 0) {
        image.classList.add('active');
    }
    image.dataset.index =index;
}); 

prevBtn.addEventListener('click', function() {
    const currentImage = document.querySelector('.active');
    currentImage.classList.remove('active');
    const currentImageIndex = +currentImage.dataset.index;
    const nextImageIndex = currentImageIndex !== 0?currentImageIndex - 1: images.length - 1;
    images[nextImageIndex].classList.add('active');
});

nextBtn.addEventListener('click', function() {
    const currentImage = document.querySelector('.active');
    currentImage.classList.remove('active');
    const currentImageIndex = +currentImage.dataset.index;
    const nextImageIndex = currentImageIndex !== images.length - 1 ?currentImageIndex + 1: 0;
    images[nextImageIndex].classList.add('active');
});
