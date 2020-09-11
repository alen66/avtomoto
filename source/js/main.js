'use strict';
var IDS = ['name', 'advantage', 'disadvantage', 'comment'];

var sliderBoxElement = document.querySelector('.card-slider');
var imgBoxElement = document.querySelector('.card__wrapper--auto');
var imgBigElements = imgBoxElement.querySelectorAll('.card__img');
var imgSmallElements = sliderBoxElement.querySelectorAll('img');
imgSmallElements[0].style.border = '2px solid blue';

var btnRightElement = sliderBoxElement.querySelector('.card-slider__btn--right');
var btnLeftElement = sliderBoxElement.querySelector('.card-slider__btn--left');
btnLeftElement.style.cursor = 'text';
function changeImgRightButton() {

  function changeRightElemArr(i) {
    imgSmallElements[i].style.border = null;
    imgSmallElements[i + 1].style.border = '2px solid blue';
    imgBigElements[i].style.display = 'none';
    imgBigElements[i + 1].style.display = 'flex';
  }

  btnRightElement.removeEventListener('click', changeImgRightButton);

  if (imgSmallElements[0].style.border !== '') {
    changeRightElemArr(0);
    btnRightElement.style.stroke = '#48494d';
    btnLeftElement.style.stroke = '#48494d';
    btnLeftElement.style.cursor = 'pointer';
  } else {

    if (imgSmallElements[1].style.border !== '') {
      changeRightElemArr(1);
      btnRightElement.style.disable = true;
      btnRightElement.style.cursor = 'text';
      btnRightElement.style.stroke = '#d7d9df';
      btnLeftElement.style.stroke = '#48494d';
      btnLeftElement.style.cursor = 'pointer';
    }
  }
  onBtnRightClick();
}

function changeImgLeftButton() {

  function changeLeftElemArr(i) {
    imgSmallElements[i].style.border = null;
    imgSmallElements[i - 1].style.border = '2px solid blue';
    imgBigElements[i].style.display = 'none';
    imgBigElements[i - 1].style.display = 'flex';
  }

  btnLeftElement.removeEventListener('click', changeImgLeftButton);

  if (imgSmallElements[2].style.border !== '') {
    changeLeftElemArr(2);
    btnLeftElement.style.stroke = '#48494d';
    btnRightElement.style.stroke = '#48494d';
    btnRightElement.style.cursor = 'pointer';

  } else {

    if (imgSmallElements[1].style.border !== '') {
      changeLeftElemArr(1);
      btnLeftElement.style.disable = true;
      btnLeftElement.style.cursor = 'text';
      btnLeftElement.style.stroke = '#d7d9df';
    }
  }
  onBtnLeftClick();
}

function onBtnRightClick() {
  btnRightElement.addEventListener('click', changeImgRightButton);
  btnRightElement.addEventListener('keydown', changeImgRightButton);
}

function onBtnLeftClick() {
  btnLeftElement.addEventListener('click', changeImgLeftButton);
  btnLeftElement.addEventListener('keydown', changeImgLeftButton);
}

onBtnRightClick();
onBtnLeftClick();

var tablinksElements = document.querySelectorAll('.interaction__tab-links');
var wrapperElements = document.querySelectorAll('.interaction__wrapper');
tablinksElements[0].style.background = '#d12136';
tablinksElements[0].style.color = '#ffffff';

function changeWrapper(el) {
  var ind = el.target.dataset.index;
  wrapperElements.forEach(function (element, index) {
    element.style.display = 'none';
    tablinksElements[index].style.background = '#ffffff';
    tablinksElements[index].style.color = '#48494d';

  });
  wrapperElements[ind].style.display = 'flex';
  tablinksElements[ind].style.background = '#d12136';
  tablinksElements[ind].style.color = '#ffffff';
}

function changeWrapperKey(evt) {
  if (evt.key === 'Tab') {
    var ind = +document.activeElement.dataset.index;
    wrapperElements.forEach(function (element, index) {
      element.style.display = 'none';
      tablinksElements[index].style.background = '#ffffff';
      tablinksElements[index].style.color = '#48494d';
    });

    if (ind + 1 === 3) {
      ind = -1;
    }

    wrapperElements[ind + 1].style.display = 'flex';
    tablinksElements[ind + 1].style.background = '#d12136';
    tablinksElements[ind + 1].style.color = '#ffffff';
  }
}

function onTablinkClick() {
  tablinksElements.forEach(function (element, index) {
    element.setAttribute('data-index', index);
    element.addEventListener('click', changeWrapper);
    element.addEventListener('keydown', changeWrapperKey);
  });
}

onTablinkClick();

var btnFeedbackElement = document.querySelector('.interaction__btnfeedback');
var popupElement = document.querySelector('.popup');
var backgroundElement = document.querySelector('.popup-background');
var nameInputElement = popupElement.querySelector('#name');

function saveLocal() {
  IDS.forEach(function (element) {
    var input = document.getElementById(element);
    input.value = localStorage.getItem(element);
    input.addEventListener('change', function () {
      localStorage.setItem(element, input.value);
    });
  });
}

document.addEventListener('DOMContentLoaded', saveLocal);

var inputStarElements = document.querySelectorAll('.rating__input');

document.addEventListener('DOMContentLoaded', function () {
  inputStarElements.forEach(function (element) {
    var input = document.getElementById(element.id);
    input.checked = localStorage.getItem(element.checked);
    input.addEventListener('change', function () {
      localStorage.setItem(element, input.checked);
    });
  });
});

function openPopupKey(evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
}

function closePopupKey(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function openPopup() {
  popupElement.classList.remove('popup--disabled');
  popupElement.classList.add('popup--active');
  var heightWindowClient = innerHeight;
  var pointTop = heightWindowClient / 2 - 207;
  if (pointTop < 0) {
    pointTop = 30;
  }
  inputStarElements[0].checked = true;
  popupElement.style.top = pointTop + 'px';
  backgroundElement.classList.remove('popup-background--disabled');
  btnFeedbackElement.removeEventListener('click', openPopup);
  btnFeedbackElement.removeEventListener('keydown', openPopupKey);
  btnCloseClick();
  changeInput();
  changeComment();
  controlInputName();
  controlComment();
  nameInputElement.focus();
}

function btnFeedbackClick() {
  btnFeedbackElement.addEventListener('click', openPopup);
  btnFeedbackElement.addEventListener('keydown', openPopupKey);
}

btnFeedbackClick();

var btnCloseElement = popupElement.querySelector('.popup__close');

function closePopup() {
  popupElement.classList.add('popup--disabled');
  popupElement.classList.remove('popup--active');
  backgroundElement.classList.add('popup-background--disabled');
  btnCloseElement.removeEventListener('click', closePopup);
  popupElement.removeEventListener('keydown', closePopupKey);
  backgroundElement.removeEventListener('click', closePopup);
  inputElements[0].removeEventListener('input', controlInputName);

  inputElements.forEach(function (element) {
    element.removeEventListener('click', controlInputName);
  });

  inputElements[0].removeEventListener('click', removeSpanName);
  btnFeedbackClick();
}

function btnCloseClick() {
  btnCloseElement.addEventListener('click', closePopup);
  popupElement.addEventListener('keydown', closePopupKey);
  backgroundElement.addEventListener('click', closePopup);
}

btnCloseClick();

var spanNameElement = popupElement.querySelector('.popup__span--name');
var spanCommentElement = popupElement.querySelector('.popup__span--comment');
var labelNameElement = popupElement.querySelector('.popup__label--name');

var inputElements = [];
IDS.forEach(function (element, i) {
  inputElements[i] = popupElement.querySelector('#' + IDS[i]);
});

function removeSpanName() {
  spanNameElement.remove();
  inputElements[0].style.borderColor = 'rgba(72,73,77,.7)';
  labelNameElement.style.color = '#48494D';
  inputElements[0].removeEventListener('click', removeSpanName);
}

function removeSpanComment() {
  spanCommentElement.remove();
  inputElements[3].removeEventListener('click', removeSpanComment);
}


function controlInputName() {
  if (inputElements[0].value === '') {
    inputElements[0].before(spanNameElement);
    inputElements[0].style.borderColor = '#ff0000';
    labelNameElement.style.color = '#ff0000';
    inputElements[0].addEventListener('click', removeSpanName);
  } else {
    removeSpanName();
  }
}

function controlComment() {
  if (inputElements[3].value === '') {
    inputElements[3].before(spanCommentElement);
  } else {
    removeSpanComment();
  }
}

function changeInput() {
  inputElements.forEach(function (element) {
    element.addEventListener('click', controlComment);
    element.addEventListener('click', controlInputName);
  });
  inputElements[0].addEventListener('click', removeSpanName);
  inputElements[0].addEventListener('input', controlInputName);
}

changeInput();

function changeComment() {
  inputElements[3].addEventListener('click', removeSpanComment);
  inputElements[3].addEventListener('keydown', removeSpanComment);
  inputElements[3].addEventListener('input', controlComment);
}

changeComment();

setTimeout(function () {
  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=30be2f5a-56b4-47d1-b991-8d63a124f9ff&onload=getYaMap';
  document.getElementsByTagName('body')[0].appendChild(elem);
}, 2000);

var ymaps;

function getYaMap() {

  var myMap = new ymaps.Map('map', {center: [59.968268840756444, 30.316735568786598], zoom: 17});
  ymaps.geocode('Санкт-Петербург, набережная реки Карповки, дом 5').then(function (res) {
    var coord = res.geoObjects.get(0).geometry.getCoordinates();
    var myPlacemark = new ymaps.Placemark(coord);
    myMap.geoObjects.add(myPlacemark);
    myMap.setCenter(coord);
  });
}

function getRating() {
  var boxStarElement = document.querySelector('.interaction__advice');
  var ratingStarElements = boxStarElement.querySelectorAll('.interaction__star');
  var valueIndex;
  inputStarElements.forEach(function (element, index) {
    if (inputStarElements[index].checked === true) {
      valueIndex = index;
    }
  });
  ratingStarElements.forEach(function (element, index) {
    ratingStarElements[index].innerHTML = '<use xlink:href="#icon-star"></use>';
    if (index < valueIndex) {
      ratingStarElements[index].classList.value = 'interaction__star interaction__star--red';
    } else {
      ratingStarElements[index].classList.value = 'interaction__star interaction__star--grey';
    }
  });
}

function submitHandler(evt) {
  var commentFirstElement = document.querySelector('.interaction__comment--first');
  var commentElement = commentFirstElement.cloneNode(true);
  commentFirstElement.classList.remove('interaction__comment--first');
  commentFirstElement.classList.add('interaction__comment--second');
  commentFirstElement.querySelector('.interaction__btnfeedback').remove();
  commentFirstElement.before(commentElement);
  commentElement.querySelector('#field1').textContent = inputElements[0].value;
  commentElement.querySelector('#field2').textContent = inputElements[1].value;
  commentElement.querySelector('#field3').textContent = inputElements[2].value;
  commentElement.querySelector('#field4').textContent = inputElements[3].value;
  getRating();
  evt.preventDefault();
  btnFeedbackElement = commentElement.querySelector('.interaction__btnfeedback');
  closePopup();
}

var formElement = popupElement.querySelector('.popup__form');
formElement.addEventListener('submit', submitHandler);
