'use strict';
(function () {
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
})();
