const carouselItems = document.querySelectorAll('.js-carousel-food-Spin-dishes');
const prevButton = document.querySelector('.js-prev');
const nextButton = document.querySelector('.js-next');

let activeIndex = 0;

prevButton.addEventListener('click', () => {
    activeIndex--;
    if (activeIndex < 0) {
        activeIndex = carouselItems.length - 1;
    }
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    activeIndex++;
    if (activeIndex >= carouselItems.length) {
        activeIndex = 0;
    }
    updateCarousel();
});

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === activeIndex) {
            item.classList.add('active');
        }
    });
}

updateCarousel();