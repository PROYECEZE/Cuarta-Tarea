
const prevBtn = document.querySelector('.js-prev');
const nextBtn = document.querySelector('.js-next');
const price = document.querySelector('.js-food-spin-price');
const dishesPlatos = [...document.querySelectorAll('.js-carousel-food-spin-items')];
const modalVentana = document.querySelector('.js-ventana-modal');
const ventanaLocation = document.querySelector('.js-food-spin-location-background');
const ventanaShopping = document.querySelector('.js-cart-summary')
const modalButtons = [...modalVentana.querySelectorAll('.js-ventana-page-add-purchases')];
const modal = document.querySelector('.js-ventana-modal');


let currentIndex = 0;

function changeInterfaceColors(dishInfo) {
  const colorSet = {
    ellipseColor: dishInfo.getAttribute('ellipseColor'),
    shadowColor: dishInfo.getAttribute('shadowColor'),
    buttonColor: dishInfo.getAttribute('buttonColor'),
    hoverColor: dishInfo.getAttribute('hoverColor'),
  };

  const menuItems = [...document.querySelectorAll('.js-food-spin-item')];
  const itemSubmenu = [...document.querySelectorAll('.js-food-spin-submenu')];
  const ellipse = document.querySelector('.js-food-spin-ellipse');
  const button = document.querySelector('.js-food-spin-order-button');
  const colorsvgs = [...document.querySelectorAll('.js-food-spin-svg')];
  const pagination = document.querySelector('.js-carousel-food-spin-pagination');
  const modalContent = modalVentana.querySelector('.js-ventana-modal-content');
  const modalClose = modalVentana.querySelector('.js-ventana-modal-button');

  modalVentana.style.setProperty('--modal-color', colorSet.buttonColor);
  modalContent.style.setProperty('--modal-box', colorSet.shadowColor);
  modalClose.style.setProperty('--modal-boxx', colorSet.shadowColor);
  ellipse.style.setProperty('--bg-color', colorSet.ellipseColor);
  pagination.style.setProperty('--bg-orange', colorSet.buttonColor);
  price.style.setProperty('--bg-orange', colorSet.buttonColor);
  ventanaLocation.style.setProperty('--modal-box', colorSet.shadowColor);
  ventanaLocation.style.setProperty('--title-color', colorSet.buttonColor);
  ventanaLocation.style.setProperty('--featured-color', colorSet.hoverColor);
  ventanaShopping.style.setProperty('--box-shopping', colorSet.shadowColor);
  ventanaShopping.style.setProperty('--text-color', colorSet.buttonColor);
  ventanaShopping.style.setProperty('--button-color', colorSet.hoverColor);

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

  itemSubmenu.forEach(submenu => {
    submenu.style.setProperty('--hover-color', colorSet.hoverColor);
  });

  colorsvgs.forEach(colorsvg => {
    colorsvg.style.setProperty('--bg-orange', colorSet.buttonColor);
  });

  modalButtons.forEach(modalButton => {
    modalButton.style.setProperty('--hover-modal', colorSet.hoverColor);
    modalButton.style.setProperty('--shadow-modal', colorSet.shadowColor);
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
  updateShoppingPrice(dishInfo.getAttribute('price'));
  updateSubTotal(dishInfo.getAttribute('subTotal'));
  updateTotal(dishInfo.getAttribute('price'));
  updateTaxes(dishInfo.getAttribute('taxes'));
  updatemodalNumber(dishInfo.getAttribute('discount'));
  updateDiscountApplied(dishInfo.getAttribute('applied'));
  updateTitle(dishInfo.getAttribute('title'));
  updatemodalTitle(dishInfo.getAttribute('title'));
  updateShoppingTitle(dishInfo.getAttribute('title'));
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
  const modalPrice = modalVentana.querySelector('.js-ventana-modal-price');
  modalPrice.textContent = `$${newPrice}`;
}

function updateShoppingPrice(newPrice) {
  const shoppingPrice = ventanaShopping.querySelector('.js-cart-summary-prics');
  shoppingPrice.textContent = `$${newPrice}`;
}

function updateSubTotal(newPrice) {
  const subTotal = ventanaShopping.querySelector('.js-card-summary-price');
  subTotal.textContent = `$${newPrice}`;
}

function updateTotal(newtotal) {
  total.forEach((totalItem) => (totalItem.textContent = `$${newtotal}`));
}

function updateTaxes(newPrice) {
  const taxes = ventanaShopping.querySelector('.js-card-summary-taxes');
  taxes.textContent = `$${newPrice}`;
}

function updatemodalNumber(newDiscount) {
  const modalNumber = modalVentana.querySelector('.js-ventana-modal-number');
  modalNumber.textContent = `$${newDiscount}`; 
}

function updateDiscountApplied(newDiscount) {
  const discount = ventanaShopping.querySelector('.js-cart-summary-discount-price');
  discount.textContent = `-$${newDiscount}`;
}

function updateTitle(newTitle) {
  const title = document.querySelector('.js-food-spin-title');
  title.textContent = newTitle;
}

function updatemodalTitle(newTitle) {
  const modalTitle = modalVentana.querySelector('.js-ventana-modal-title');
  modalTitle.textContent = newTitle;
}

function updateShoppingTitle(newTitle) {
  const shoppingTitle = ventanaShopping.querySelector('.js-cart-summary-name');
  shoppingTitle.textContent = newTitle;
}

function updateDescription(newDescription) {
  const description = document.querySelector('.js-food-spin-description');
  description.textContent = newDescription;
}

function updatemodalParagraph(newDescription) {
  const modalParagraph = modalVentana.querySelector('.js-ventana-modal-paragraph');
  modalParagraph.textContent = newDescription;
}

const subTotal = ventanaShopping.querySelector('.js-card-summary-price');
const total = [...ventanaShopping.querySelectorAll('.js-card-summary-total')];
const taxes = ventanaShopping.querySelector('.js-card-summary-taxes');
const subtotals = parseFloat(subTotal.textContent.replace('$', ''));
const taxe = parseFloat(taxes.textContent.replace('$', ''));

const totals = subtotals + taxe;

total.forEach((element) => {
  element.textContent = `$ ${totals.toFixed(2)}`;
});


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

openModalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
  const locateButton = document.querySelector('.js-food-spin-location');

  locateButton.addEventListener('click', function (event) {
    event.stopPropagation(); 
    ventanaLocation.classList.toggle('show'); 
  });
  document.addEventListener('click', function (event) {
    if (!ventanaLocation.contains(event.target) && !locateButton.contains(event.target)) {
      ventanaLocation.classList.remove('show');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const addressTitle = document.querySelectorAll('.js-food-spin-location-title')[0];
  const pickupTitle = document.querySelectorAll('.js-food-spin-location-title')[1];
  const addressBord = document.querySelectorAll('.js-food-spin-location-bord')[0];
  const pickupBord = document.querySelectorAll('.js-food-spin-location-bord')[1];
  const locateStoreSection = document.querySelector(".js-food-spin-location-store");

  const activateAddressTab = () => {
    addressTitle.classList.toggle('food-spin__location-title--active');
    addressBord.classList.toggle('food-spin__location-bord--active');
    pickupTitle.classList.toggle('food-spin__location-title--active');
    pickupBord.classList.toggle('food-spin__location-bord--active');
    locateStoreSection.classList.toggle('food-spin__location-store--open');
  };

  addressTitle.addEventListener('click', activateAddressTab);
  pickupTitle.addEventListener('click', activateAddressTab);
});

const closeCartButton = document.querySelector('.js-cart-summary-close');

modalButtons.forEach(button => {
  button.addEventListener('click', () => {
    ventanaShopping.classList.toggle('cart-summary--active'); 

    modal.style.display = 'none';
  });
});

closeCartButton.addEventListener('click', () => {
  ventanaShopping.classList.toggle('cart-summary--active');
});