
function initCarousel(options) {
  function CustomCarousel(options) {
    this.init(options);
    this.addListeners();
    return this;
  }

  CustomCarousel.prototype.init = function (options) {
    this.node = options.node;
    this.node.slider = this;
    this.slides = this.node.querySelector(".js-carousel-food-spin-dishs").children;
    this.slidesN = this.slides.length;
    this.pagination = this.node.querySelector(".js-carousel-food-spin-pagination");
    this.pagTransf = "translate( -50%, -50% )";
    this.dots = this.pagination.children;
    this.dotsN = this.dots.length;
    this.step = -360 / this.dotsN;
    this.angle = 0;
    this.next = this.node.querySelector(".js-next");
    this.prev = this.node.querySelector(".js-prev");
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
  customCarousel: document.querySelectorAll(".js-carousel-food-spin")
};

document.addEventListener("DOMContentLoaded", function () {
  if (plugins.customCarousel.length) {
    for (var i = 0; i < plugins.customCarousel.length; i++) {
      var carousel = initCarousel({
        node: plugins.customCarousel[i],
        speed: plugins.customCarousel[i].getAttribute("data-speed"),
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
const items = [...document.querySelectorAll('.js-food-spin-item')];

const colors = [
  {
    paginationColor: '#FF922C',
    buttonColor: '#FF922C',
    shadowColor: '#F4E2D1',
    ellipseColor: '#FFEEDE',
    hoverColor: '#ff6600',
    price: 32,
    title: 'Green Goddess Chicken Salad',
    description: 'It Is A Non Vegetarian Salad Which Consists Of The Green Goddess Dressing Mixed With Chicken, Peppers, Olives And Celery.'
  },
  {
    paginationColor: '#54BF29',
    buttonColor: '#54BF29',
    shadowColor: '#DBF4D1',
    ellipseColor: '#EAFFE2',
    hoverColor: '#3F8F1F',
    price: 29,
    title: 'Agnolotti Pasta Salad With Ricotta',
    description: 'A simple pasta salad with delicious ricotta for an easy weeknight meal!'
  },
  {
    paginationColor: '#c651cf',
    buttonColor: '#c651cf',
    shadowColor: '#ebb9ee',
    ellipseColor: '#efd5f0',
    hoverColor: '#6c0673',
    price: 70,
    title: 'Grilled Salmon Salad',
    description: 'Salmon Greek Salad with Lemon Basil Dressing - A light and healthy recipe that tastes amazing!'
  },
  {
    paginationColor: '#18c6e9',
    buttonColor: '#18c6e9',
    shadowColor: '#b7ebf6',
    ellipseColor: '#def5f9',
    hoverColor: '#005363',
    price: 40,
    title: 'Asian Cucumber Salad',
    description: 'Asian Cucumber Salad Recipe made with crunchy cucumber, onion, rice wine vinegar, and a few secret ingredients!'
  },
  {
    paginationColor: '#e40000',
    buttonColor: '#e40000',
    shadowColor: '#fca1a1',
    ellipseColor: '#f5d9d9',
    hoverColor: '#880000',
    price: 100,
    title: 'Autumn Cobb Salad',
    description: 'Roasted squash, crunchy apples and dried cherries add seasonal freshness dressed in a spiced apple cider vinaigrette and topped with candied walnuts.'
  },
  {
    paginationColor: '#c8c803',
    buttonColor: '#c8c803',
    shadowColor: '#ddddb0',
    ellipseColor: '#f5f5d9',
    hoverColor: '#676702',
    price: 24,
    title: 'Creamy Lemon Basil & Zucchini Pasta',
    description: 'Creamy Lemon Basil & Zucchini Pasta. Getting super into spring for another night with this simple but delicious creamy pasta.!'
  },
  {
    paginationColor: '#7771c4',
    buttonColor: '#7771c4',
    shadowColor: '#9c99ca',
    ellipseColor: '#dcdaeb',
    hoverColor: '#352f95',
    price: 90,
    title: 'Salmon Salad',
    description: 'This salmon salad is incredibly nutritious and loaded with flavor! Baked salmon filets are placed atop a bed of fresh greens.'
  },
  {
    paginationColor: '#4fd299',
    buttonColor: '#4fd299',
    shadowColor: '#c4e6d7',
    ellipseColor: '#e8f4ee',
    hoverColor: '#019a57',
    price: 66,
    title: 'A healthful winter salad',
    description: 'A mix of winter vegetables and fruits, beet, citrus fruits, and roasted and very delicious nuts!'
  },
  {
    paginationColor: ' #4143e8',
    buttonColor: '#4a4dff',
    shadowColor: '#b6b2f3',
    ellipseColor: '#9ca3ff',
    hoverColor: '#04067b',
    price: 50,
    title: 'Shrimp, cucumber and avocado salad.',
    description: 'Healthy meal, Vegetarian and protein-rich food, easy to make and affordable.'
  },
];

let currentIndex = 0; 
function changeInterfaceColors(colorSet) {
  ellipse.style.setProperty('--bg-color', colorSet.ellipseColor);
  pagination.style.setProperty('--bg-orange',colorSet.paginationColor);
  prevBtn.style.setProperty('--bg-color', colorSet.buttonColor);
  prevBtn.style.setProperty('--shadow-bg', colorSet.shadowColor);
  prevBtn.style.setProperty('--hover-color', colorSet.hoverColor);
  nextBtn.style.setProperty('--bg-color', colorSet.buttonColor);
  nextBtn.style.setProperty('--shadow-bg', colorSet.shadowColor);
  nextBtn.style.setProperty('--hover-color', colorSet.hoverColor);
  button.style.setProperty('--bg-orange', colorSet.buttonColor);
  button.style.setProperty('--shadow-bg', colorSet.shadowColor);
  button.style.setProperty('--hover-color', colorSet.hoverColor);


  items.forEach(item => {
    item.style.setProperty('--hover-color', colorSet.hoverColor);
  });
  
  price.style.color = colorSet.buttonColor;
  }

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % colors.length; 
  changeInterfaceColors(colors[currentIndex]);

  const currentColorSet = colors[currentIndex];
  updatePrice(currentColorSet.price);
  updateTitle(currentColorSet.title);
  updateDescription(currentColorSet.description);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + colors.length) % colors.length; 
  changeInterfaceColors(colors[currentIndex]);


  const currentColorSet = colors[currentIndex];
  updatePrice(currentColorSet.price);
  updateTitle(currentColorSet.title);
  updateDescription(currentColorSet.description);
});


function updatePrice(newPrice) {
  price.textContent = `$${newPrice}`;
}

function updateTitle(newTitle) {
  title.textContent = newTitle;
}

function updateDescription(newDescription) {
  description.textContent = newDescription;
}

class Dishes extends HTMLElement {
  constructor() {
    super();
    const image = this.getAttribute("image");
    const html = `
      <div class="carousel-food-spin__main js-carousel-food-spin-dish">
        <a href="#" aria-label="click to see the selected dish">
          <img class="carousel-food-spin__img" src="image/${image}" alt="dish ${image}">
        </a>
      </div>
    `;
    this.insertAdjacentHTML("beforeend", html);
  }
}

class platos extends HTMLElement {
  constructor() {
    super();
    const price = this.getAttribute("price");
    const image = this.getAttribute("image");
    const title = this.getAttribute("title");
    const description = this.getAttribute("description");
    const html = `
      <div class="carousel-food-spin__dot">
   <a href="#" class="js-dish-link" price="${price}" title="${title}" description="${description}" aria-label="click to see the selected dish">
          <img class="carousel-food-spin__item-img" src="image/${image}" alt="${image}">
        </a>
      </div>
    `;
    this.insertAdjacentHTML("beforeend", html);
  }
}

customElements.define("dishe-element", Dishes);
customElements.define("dishe-plato", platos);


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





