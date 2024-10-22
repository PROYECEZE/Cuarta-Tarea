
function initCarousel(options) {
  function CustomCarousel(options) {
    this.init(options);
    this.addListeners();
    return this;
  }

  CustomCarousel.prototype.init = function (options) {
    this.node = options.node;
    this.node.slider = this;
    this.slides = this.node.querySelector('.js-carousel-food-spin-dishs').children;
    this.slidesN = this.slides.length;
    this.pagination = this.node.querySelector('.js-carousel-food-spin-pagination');
    this.pagTransf = "translate( -50%, -50% )";
    this.dots = this.pagination.children;
    this.dotsN = this.dots.length;
    this.step = -360 / this.dotsN;
    this.angle = 0;
    this.next = this.node.querySelector('.js-next');
    this.prev = this.node.querySelector('.js-prev');
    this.activeN = options.activeN || 0;
    this.prevN = this.activeN;
    this.speed = options.speed || 800;
    this.autoplay = options.autoplay || false;
    this.autoplayId = null;

    this.setSlide(this.activeN);
    this.arrangeDots();
    this.pagination.style.transitionDuration = this.speed + "ms";
  };

  CustomCarousel.prototype.addListeners = function () {
    var slider = this;

    if (this.next) {
      this.next.addEventListener("click", function () {
        slider.setSlide(slider.activeN + 1);
      });
    }

    if (this.prev) {
      this.prev.addEventListener("click", function () {
        slider.setSlide(slider.activeN - 1);
      });
    }

    for (var i = 0; i < this.dots.length; i++) {
      this.dots[i].addEventListener(
        "click",
        (function (i) {
          return function () {
            slider.setSlide(i);
          };
        })(i)
      );
    }
  };

  CustomCarousel.prototype.setSlide = function (slideN) {
    this.slides[this.activeN].classList.remove("active");
    if (this.dots[this.activeN]) {
      this.dots[this.activeN].classList.remove("active");
    }

    this.prevN = this.activeN;
    this.activeN = slideN;

    if (this.activeN < 0) this.activeN = this.slidesN - 1;
    else if (this.activeN >= this.slidesN) this.activeN = 0;

    this.slides[this.activeN].classList.toggle("active");
    if (this.dots[this.activeN]) {
      this.dots[this.activeN].classList.toggle("active");
    }
    this.rotate();
  };

  CustomCarousel.prototype.rotate = function () {
    if (this.activeN < this.dotsN) {
      this.angle += (function (dots, next, prev, step) {
        var inc,
          half = dots / 2;

        if (prev > dots) prev = dots - 1;
        if (Math.abs((inc = next - prev)) <= half) return step * inc;
        if (Math.abs((inc = next - prev + dots)) <= half) return step * inc;
        if (Math.abs((inc = next - prev - dots)) <= half) return step * inc;
      })(this.dotsN, this.activeN, this.prevN, this.step);

      this.pagination.style.transform =
        this.pagTransf + "rotate(" + this.angle + "deg)";
    }
  };

  CustomCarousel.prototype.startAutoplay = function () {
    var slider = this;

    this.autoplayId = setInterval(function () {
      slider.setSlide(slider.activeN + 1);
    }, this.autoplay);
  };

  CustomCarousel.prototype.stopAutoplay = function () {
    clearInterval(this.autoplayId);
  };

  CustomCarousel.prototype.arrangeDots = function () {
    for (var i = 0; i < this.dotsN; i++) {
      this.dots[i].style.transform = "rotate(" + (360 / this.dotsN) * i + "deg)";
    }
  };

  return new CustomCarousel(options);
}

var plugins = {
  customCarousel: document.querySelectorAll('.js-carousel-food-spin')
};

document.addEventListener("DOMContentLoaded", function () {
  if (plugins.customCarousel.length) {
    for (var i = 0; i < plugins.customCarousel.length; i++) {
      var carousel = initCarousel({
        node: plugins.customCarousel[i],
        speed: plugins.customCarousel[i].getAttribute('data-speed'),
      });
    }
  }
});

const prevBtn = document.querySelector('.js-prev');
const nextBtn = document.querySelector('.js-next');
const ellipse = document.querySelector('.js-food-spin-ellipse');
const button = document.querySelector('.js-food-spin-order-button');
const price = document.querySelector('.js-food-spin-price');
const title = document.querySelector('.js-food-spin-title');
const description = document.querySelector('.js-food-spin-description');
const pagination = document.querySelector('.js-carousel-food-spin-pagination');
const menuItems = [...document.querySelectorAll('.js-food-spin-item')];
const ItenSubmenu = [...document.querySelectorAll('.js-food-spin-submenu')];
const dishesPlatos = [...document.querySelectorAll('.js-carousel-food-spin-items')];
const colorsvg = document.querySelector('.js-food-spin-svg');
const modalVentana = document.querySelector('.js-ventana-modal');
const modalTitle = modalVentana.querySelector('.js-ventana-modal-title');
const modalParagraph = modalVentana.querySelector('.js-ventana-modal-paragraph');
const modalPrice = modalVentana.querySelector('.js-ventana-modal-price');
const modalNumber = modalVentana.querySelector('.js-ventana-modal-number');
const modalButton = modalVentana.querySelector ('.js-ventana-page-add-purchases');
const modalContent = modalVentana.querySelector ('.js-ventana-modal-content');
const modalClose = modalVentana.querySelector ('.js-ventana-modal-button');

let currentIndex = 0;

function changeInterfaceColors(dishInfo) {
  const colorSet = {
    ellipseColor: dishInfo.getAttribute('ellipseColor'),
    shadowColor: dishInfo.getAttribute('shadowColor'),
    buttonColor: dishInfo.getAttribute('buttonColor'),
    hoverColor: dishInfo.getAttribute('hoverColor'),
  };

  modalVentana.style.setProperty('--modal-color', colorSet.buttonColor);
  modalButton.style.setProperty('--hover-modal', colorSet.hoverColor);
  modalButton.style.setProperty('--shadow-modal', colorSet.shadowColor);
  modalContent.style.setProperty('--modal-box', colorSet.shadowColor);
  modalClose.style.setProperty('--modal-boxx', colorSet.shadowColor);

  ellipse.style.setProperty('--bg-color', colorSet.ellipseColor);
  pagination.style.setProperty('--bg-orange', colorSet.buttonColor);
  price.style.setProperty('--bg-orange', colorSet.buttonColor);
  colorsvg.style.setProperty('--bg-orange', colorSet.buttonColor);

  prevBtn.style.setProperty('--bg-color', colorSet.buttonColor);
  prevBtn.style.setProperty('--shadow-bg', colorSet.shadowColor);
  prevBtn.style.setProperty('--hover-color', colorSet.hoverColor);

  nextBtn.style.setProperty('--bg-color', colorSet.buttonColor);
  nextBtn.style.setProperty('--shadow-bg', colorSet.shadowColor);
  nextBtn.style.setProperty('--hover-color', colorSet.hoverColor);

  button.style.setProperty('--bg-orange', colorSet.buttonColor);
  button.style.setProperty('--shadow-bg', colorSet.shadowColor);
  button.style.setProperty('--hover-color', colorSet.hoverColor);

  menuItems.forEach(item => {
    item.style.setProperty('--hover-color', colorSet.hoverColor);
  });

  ItenSubmenu.forEach(submenu => {
    submenu.style.setProperty('--hover-color', colorSet.hoverColor);
  });

  price.style.color = colorSet.buttonColor;
}

function updateDishDetails(currentDish) {
  const dishInfo = currentDish.querySelector('dishe-plato');
  changeInterfaceColors(dishInfo);
  imageSource = dishInfo.getAttribute('image');
  updateModalImage('image/' + imageSource);
  updatePrice(dishInfo.getAttribute('price'));
  updatemodalPrice(dishInfo.getAttribute('price'));
  updatemodalNumber(dishInfo.getAttribute('discount'));
  updateTitle(dishInfo.getAttribute('title'));
  updatemodalTitle(dishInfo.getAttribute('title'));
  updateDescription(dishInfo.getAttribute('description'));
  updatemodalParagraph(dishInfo.getAttribute('description'));
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % dishesPlatos.length; 
  updateDishDetails(dishesPlatos[currentIndex]);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + dishesPlatos.length) % dishesPlatos.length; 
  updateDishDetails(dishesPlatos[currentIndex]);
});

function updateModalImage(imageSource) {
  const modalImg = modalVentana.querySelector ('.js-ventana-modal-img');
  modalImg.src = imageSource;
}

function updatePrice(newPrice) {
  price.textContent = `$${newPrice}`;
}

function updatemodalPrice(newPrice) {
  modalPrice.textContent = `$${newPrice}`;
}

function updatemodalNumber(newDiscount) {
  modalNumber.textContent = `$${newDiscount}`;
}

function updatemodalNumber(newDiscount) {
  console.log("Actualizando descuento a:", newDiscount); 
  modalNumber.textContent = `$${newDiscount}`;
}

function updateTitle(newTitle) {
  title.textContent = newTitle;
}

function updatemodalTitle(newTitle) {
  modalTitle.textContent = newTitle;
}

function updateDescription(newDescription) {
  description.textContent = newDescription;
}

function updatemodalParagraph(newDescription) {
  modalParagraph.textContent = newDescription;
}

class Dishes extends HTMLElement {
  constructor() {
    super();
    const image = this.getAttribute('image');
    const html = `
      <a class="carousel-food-spin__main js-carousel-food-spin-dish" href="#" aria-label="click to see the selected dish">
        <img class="carousel-food-spin__img" src="image/${image}" alt="dish ${image}">
      </a>
    `;
    this.insertAdjacentHTML('beforeend', html);
  }
}

class Platos extends HTMLElement {
  constructor() {
    super();
    const price = this.getAttribute('price');
    const image = this.getAttribute('image');
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    const html = `
      <a href="#" class="carousel-food-spin__dot js-dish-link" price="${price}" title="${title}" description="${description}" aria-label="click to see the selected dish">
        <img class="carousel-food-spin__item-img" src="image/${image}" alt="${image}">
      </a>
    `;
    this.insertAdjacentHTML('beforeend', html);
  }
}

customElements.define('dishe-element', Dishes);
customElements.define('dishe-plato', Platos);



document.querySelectorAll('.js-dish-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); 

    const newPrice = this.getAttribute('price');
    const newTitle = this.getAttribute('title');
    const newDescription = this.getAttribute('description');

    updatePrice(newPrice);
    updateTitle(newTitle);
    updateDescription(newDescription);
  });
});

function updatePrice(newPrice) {
  const priceElement = document.querySelector('.js-food-spin-price');
  priceElement.textContent = `$${newPrice}`;
}

function updateTitle(newTitle) {
  const titleElement = document.querySelector('.js-food-spin-title');
  titleElement.textContent = newTitle;
}

function updateDescription(newDescription) {
  const descriptionElement = document.querySelector('.js-food-spin-description');
  descriptionElement.textContent = newDescription;
}


const decreaseBtn = document.querySelector('.js-ventana-modal-decrease');
const increaseBtn = document.querySelector('.js-ventana-modal-increase');
const quantityInput = document.querySelector('.js-ventana-modal-quantity');

// Initialize input
let initialQuantity = null;
// Function to decrease the quantity
decreaseBtn.addEventListener('click', () => {
  if (initialQuantity === null) {
    initialQuantity = 1;
  }

  let currentValue = parseInt(quantityInput.value || initialQuantity);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  } else {
    quantityInput.value = "---";
    initialQuantity = null;
  }
});

// Function to increase the quantity
increaseBtn.addEventListener('click', () => {
  if (initialQuantity === null) {
    initialQuantity = 1;
    quantityInput.value = initialQuantity;
  } else {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  }
});

const openModalButton = document.querySelector('.js-food-spin-order-button');
const closeModalButton = document.querySelector('.js-ventana-modal-button');
const modal = document.querySelector('.js-ventana-modal');


openModalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});


closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

