'use strict';
var IDS = ["name", "advantage", "disadvantage", "comment"];


var btnRightElement = document.querySelector('.card-slider__btn--right');
var btnLeftElement = document.querySelector('.card-slider__btn--left');
var sladeArr = Array();
var imgArr = Array();
sladeArr[0] = document.querySelector('#slade1');
sladeArr[1] = document.querySelector('#slade2');
sladeArr[2] = document.querySelector('#slade3');
imgArr[0] = document.querySelector('#img1');
imgArr[1] = document.querySelector('#img2');
imgArr[2] = document.querySelector('#img3');

function changeImgRightButton() {

  function changeRightElemArr(i) {
    sladeArr[i].style.border = null;
    sladeArr[i+1].style.border = '2px solid blue';
    imgArr[i].style.display = 'none';
    imgArr[i+1].style.display = 'flex';
  }

btnRightElement.removeEventListener('click', changeImgRightButton);

if (sladeArr[0].style.border !== '') {
  changeRightElemArr(0);
  btnRightElement.style.stroke = '#48494d';
  btnLeftElement.style.stroke = '#48494d';


} else {
  if (sladeArr[1].style.border !== '') {
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
    sladeArr[i].style.border = null;
    sladeArr[i-1].style.border = '2px solid blue';
    imgArr[i].style.display = 'none';
    imgArr[i-1].style.display = 'flex';
  }


btnLeftElement.removeEventListener('click', changeImgLeftButton);


  if (sladeArr[2].style.border !== '') {
    changeLeftElemArr(2);
    btnLeftElement.style.stroke = '#48494d';
    btnRightElement.style.stroke = '#48494d';
    btnRightElement.style.cursor = 'pointer';

  } else {
    if (sladeArr[1].style.border !== '') {
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

var tablinksElements = document.querySelectorAll('.interaction__tablinks');
var wrapperElements = document.querySelectorAll('.interaction__wrapper');
tablinksElements[0].style.background = '#d12136';
tablinksElements[0].style.color = '#ffffff';

function changeWrapper(el) {
  var ind = el.target.dataset.index;
  wrapperElements.forEach( function(element, index) {
    element.style.display = 'none';
    tablinksElements[index].style.background = '#ffffff';
    tablinksElements[index].style.color = '#48494d';

  });
  wrapperElements[ind].style.display = 'flex';
  tablinksElements[ind].style.background = '#d12136';
  tablinksElements[ind].style.color = '#ffffff';
}

function onTablinksClick() {
  tablinksElements.forEach( function(element, index) {
    element.setAttribute('data-index', index);
    element.addEventListener('click', changeWrapper);
  });
}

onTablinksClick();

var btnFeedbackElement = document.querySelector('.interaction__btnfeedback');
var popupElement = document.querySelector('.popup');
var backgroundElement = document.querySelector('.popup-background');

/*comment.value = localStorage.getItem('comment');
comment.oninput = () => {
      localStorage.setItem('comment', comment.value)
};
*/

document.addEventListener("DOMContentLoaded", function() {
  for (var id of IDS) {
    var input = document.getElementById(id);
    input.value = localStorage.getItem(id);
    (function(id, input) {
      input.addEventListener("change", function() {
        localStorage.setItem(id, input.value);
      });
    })(id, input);
  }
});

var inputStarElements = document.querySelectorAll('.popup__input')

/*document.addEventListener("DOMContentLoaded", function() {
  for (var i of inputStarElements) {

    debugger
    inputStarElements[i].checked = localStorage.getItem(i);



    (function(i, inputStarElements) {
      inputStarElements[i].addEventListener("change", function() {
        localStorage.setItem(i, inputStarElements[i].checked);
      });
    })(i, inputStarElements[i]);
  }
});
*/
function openPopup() {
  popupElement.classList.remove('popup--disabled');
  popupElement.classList.add('popup--active');
  backgroundElement.classList.remove('popup-background--disabled');
  btnFeedbackElement.removeEventListener('click', openPopup);
  btnFeedbackElement.removeEventListener('keydown', openPopup);
  btnCloseClick();
  changeInput();
  changeComment();
  controlInputName();
  controlComment();
}

function btnFeedbackClick() {
  btnFeedbackElement.addEventListener('click', openPopup);
  btnFeedbackElement.addEventListener('keydown', openPopup);
}

btnFeedbackClick();

var btnCloseElement = popupElement.querySelector('.popup__close');

function closePopup() {
  popupElement.classList.add('popup--disabled');
  popupElement.classList.remove('popup--active');
  backgroundElement.classList.add('popup-background--disabled');
  btnCloseElement.removeEventListener('click', closePopup);
  btnCloseElement.removeEventListener('keydown', closePopup);
  inputElements[0].removeEventListener('input', controlInputName);

  inputElements.forEach( function(element, index) {
    element.removeEventListener('click', controlInputName);
  });

  inputElements[0].removeEventListener('click', removeSpanName);
  btnFeedbackClick();
}

function btnCloseClick() {
  btnCloseElement.addEventListener('click', closePopup);
  btnCloseElement.addEventListener('keydown', closePopup);
}

btnCloseClick();

var spanNameElement = popupElement.querySelector('.popup__span--name');
var spanCommentElement = popupElement.querySelector('.popup__span--comment');
var labelNameElement = popupElement.querySelector('.popup__label--name');

var inputElements = [];
IDS.forEach( function(element, i) {
  inputElements[i] = popupElement.querySelector('#'+IDS[i]);
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
    inputElements[0].before(spanNameElement)
    inputElements[0].style.borderColor = '#ff0000';
    labelNameElement.style.color = '#ff0000';
    inputElements[0].addEventListener('click', removeSpanName);
  } else {
    removeSpanName();
  }
}


function controlComment() {
  if (inputElements[3].value === '') {
    inputElements[3].before(spanCommentElement)
  } else {
    removeSpanComment();
  }
}
function changeInput() {

  inputElements.forEach( function(element, index) {
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
var labelStarElements = ratePopupElement.querySelectorAll('.popup__label')
var arrCheckeds = [];

function changeStarElement(el, i) {

  var ddd = +el.target.value;
  var ii = ddd-2;
  var ch = el.target.checked;
  var ch1 = el.target.checked;
  if (ddd !== 1) {
    if  (ch === true && inputStarElements[ii].checked === false ) {
      el.target.checked = false;
    } else {

      if (ddd !== 5) {
        if (ch1 === false && inputStarElements[ddd].checked === true ) {
          el.target.checked = true;
        }
      }
    }
  } else {
     if  (ch === false && inputStarElements[ddd].checked === true ) {
      el.target.checked = true;
    }
  }

    if (ch === true) {
      labelStarElements[ddd-1].classList.add('popup__label--star');
    } else {
      labelStarElements[ddd-1].classList.add('popup__label--nostar');
    }
  }


inputStarElements.forEach( function(element, index) {
  element.addEventListener('click', changeStarElement);
  arrCheckeds[index] = element.checked;
});

      ymaps.ready(init);
      var myMap;

      function init() {

        myMap = new ymaps.Map("map", {
      center: [59.968268840756444,30.316735568786598], // Координаты центра карты
      zoom: 17 // Маштаб карты
    });

        myMap.controls.add(
      new ymaps.control.ZoomControl()  // Добавление элемента управления картой
    ); myPlacemark = new ymaps.Placemark([59.968268840756444,30.316735568786598], { // Координаты метки объекта
      balloonContent: "<div class='ya_map'>Санкт-Петербург, набережная реки Карповки, дом 5</div>" // Подсказка метки
    }, {
      preset: "twirl#redDotIcon" // Тип метки
    });

    myMap.geoObjects.add(myPlacemark); // Добавление метки
    myPlacemark.balloon.open(); // Открытие подсказки метки

  };

