'use strict';
var IDS = ['name', 'advantage', 'disadvantage', 'comment'];

var sliderBoxElement = document.querySelector('.card-slider');
var imgBoxElement = document.querySelector('.card__wrapper--auto');
var imgBigElements = imgBoxElement.querySelectorAll('.card__img');
var imgSmallElements = sliderBoxElement.querySelectorAll('img');
imgSmallElements[0].style.border = '2px solid blue';

var btnRightElement = sliderBoxElement.querySelector('.card-slider__btn--right');
var btnLeftElement = sliderBoxElement.querySelector('.card-slider__btn--left');

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

function onTablinksClick() {
  tablinksElements.forEach(function (element, index) {
    element.setAttribute('data-index', index);
    element.addEventListener('click', changeWrapper);
    element.addEventListener('keydown', changeWrapperKey);
  });
}

onTablinksClick();

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

var inputStarElements = document.querySelectorAll('.popup__input');

document.addEventListener('DOMContentLoaded', function () {
  inputStarElements.forEach(function (element) {
    var input = document.getElementById(element.id);
    input.checked = localStorage.getItem(element.checked);
    input.addEventListener('change', function () {
      localStorage.setItem(element, input.checked);
    });
  });
});

function openPopupKey() {
  if (evt.key === 'Enter') {
    openPopup();
  }
}

function closePopupKey(evt) {
  debugger
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function openPopup() {
  popupElement.classList.remove('popup--disabled');
  popupElement.classList.add('popup--active');
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

var ratePopupElement = document.querySelector('.popup__rate');
var labelStarElements = ratePopupElement.querySelectorAll('.popup__label');

function changeStarElement(el) {

  var ddd = +el.target.value;
  var ii = ddd - 2;
  var ch = el.target.checked;
  var ch1 = el.target.checked;
  if (ddd !== 1) {
    if (ch === true && inputStarElements[ii].checked === false) {
      el.target.checked = false;
    } else {

      if (ddd !== 5) {
        if (ch1 === false && inputStarElements[ddd].checked === true) {
          el.target.checked = true;
        }
      }
    }
  } else {
    if (ch === false && inputStarElements[ddd].checked === true) {
      el.target.checked = true;
    }
  }

  if (ch === true) {
    labelStarElements[ddd - 1].classList.add('popup__label--star');
  } else {
    labelStarElements[ddd - 1].classList.add('popup__label--nostar');
  }
}


inputStarElements.forEach(function (element) {
  element.addEventListener('click', changeStarElement);
});

ymaps.ready(init);
var myMap;
var myPlacemark;

function init() {

  myMap = new ymaps.Map('map', {
    center: [59.968268840756444, 30.316735568786598],
    zoom: 17
  });

  myMap.controls.add(new ymaps.control.ZoomControl());

  myPlacemark = new ymaps.Placemark([59.968268840756444, 30.316735568786598], {
    balloonContent: '<div>Санкт-Петербург, набережная реки Карповки, дом 5</div>'
  }, {
    preset: 'twirl#redDotIcon'
  });

  myMap.geoObjects.add(myPlacemark);
  myPlacemark.balloon.open();
}

function getRating() {
  var boxStarElement = document.querySelector('.interaction__advice');
  var ratingStarElements = boxStarElement.querySelectorAll('.interaction__star');
  ratingStarElements.forEach(function (element, index) {
    ratingStarElements[index].innerHTML = '<use xlink:href="#icon-star"></use>';
    if (inputStarElements[index].checked === true) {
      ratingStarElements[index].classList.value = 'interaction__star interaction__star--red';
    } else {
      ratingStarElements[index].classList.value = 'interaction__star interaction__star--grey';
    }
  });

}

function submitHandler(evt) {
  var commentFirstElement = document.querySelector('.interaction__comment--first');
  var commentSecondElement = document.querySelector('.interaction__comment--second');
  var commentElement = commentFirstElement.cloneNode(true);
  commentSecondElement.style.display = 'none';
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
