
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


//color change//
const prevBtn = document.querySelector('.js-prev');
const nextBtn = document.querySelector('.js-next');
const ellipse = document.querySelector('.js-food-spin-ellipse');
const button = document.querySelector('.js-food-spin-order-button');
const price = document.querySelector('.js-food-spin-price');
const title = document.querySelector('.js-food-spin-title');
const description = document.querySelector('.js-food-spin-description');
const items = [...document.querySelectorAll('.js-food-spin-item')];

let currentPrice = 32;

function updatePrice(newPrice) {
  price.textContent = `$${newPrice}`;
}

function updateTitle(newTitle) {
  title.textContent = newTitle;
}

function updateDescription(newDescription) {
  description.textContent = newDescription;
}

function changeInterfaceColors(buttonColor, shadowColor, ellipseColor, hoverColor) {
  ellipse.style.setProperty('--bg-color', ellipseColor);
  prevBtn.style.setProperty('--bg-color', buttonColor);
  prevBtn.style.setProperty('--shadow-bg', shadowColor);
  prevBtn.style.setProperty('--hover-color', hoverColor);
  nextBtn.style.setProperty('--bg-color', buttonColor);
  nextBtn.style.setProperty('--shadow-bg', shadowColor);
  nextBtn.style.setProperty('--hover-color', hoverColor);
  button.style.setProperty('--bg-orange', buttonColor);
  button.style.setProperty('--shadow-bg', shadowColor);
  button.style.setProperty('--hover-color', hoverColor);

  items.forEach(item => {
    item.style.setProperty('--hover-color', hoverColor);
  });

  price.style.color = buttonColor;
}

nextBtn.addEventListener('click', () => {
  changeInterfaceColors('#FF922C', '#F4E2D1', '#FFEEDE', '#ff6600');

  updatePrice(32);
  updateTitle('Green Goddess Chicken Salad');
  updateDescription('It Is A Non Vegetarian Salad Which Consists Of The Green Goddess Dressing Mixed With Chicken, Peppers, Olives And Celery.');
});

prevBtn.addEventListener('click', () => {
  changeInterfaceColors('#54BF29', '#DBF4D1', '#EAFFE2', '#3F8F1F');

  updatePrice(35);
  updateTitle('Asian Cucumber Salad');
  updateDescription('Asian Cucumber Salad Recipe made with crunchy cucumber, onion, rice wine vinegar, and a few secret ingredients!');
});

class Dishes extends HTMLElement {
  constructor() {
    super();
    const price = this.getAttribute("price");
    const image = this.getAttribute("image");
    const title= this.getAttribute("title");
    const description = this.getAttribute("description");
    const html =`
      <div class="carousel-food-spin__main js-carousel-foord-spin-dish">
      <a href="#" class="js-dish-link" price="${price}" title="${title}" description="${description}" aria-label="click to see the selected dish">
        <img class="carousel-food-spin__img" src="image/${image}" alt="dish ${image}">
        </a>
      </div>
    `;
    this.insertAdjacentHTML("beforeend", html);
  }
}

customElements.define("dishe-element", Dishes);


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


