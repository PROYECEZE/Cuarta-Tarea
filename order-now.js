const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
});