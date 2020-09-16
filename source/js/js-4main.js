'use strict';
(function () {
  var IDS = ['name', 'advantage', 'disadvantage', 'comment'];

  var btnFeedbackElement = document.querySelector('.interaction__btnfeedback');
  var popupElement = document.querySelector('.popup');
  var backgroundElement = document.querySelector('.popup-background');
  var nameInputElement = popupElement.querySelector('#name');
  var commentInputElement = popupElement.querySelector('#comment');
  var inputStarElements = document.querySelectorAll('.rating__input');

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
    btnFeedbackClick();
    removeError();
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

  var validName = true;
  var validComment = true;

  function onSelectInput(el, funcEl) {
    el.addEventListener('input', funcEl);
  }

  function addError() {
    nameInputElement.setCustomValidity('');
    spanNameElement.style.display = 'block';
    nameInputElement.style.borderColor = '#ff0000';
    labelNameElement.style.opacity = '1';
    nameInputElement.focus();
  }


  function removeError() {
    nameInputElement.setCustomValidity('');
    spanNameElement.style.display = 'none';
    nameInputElement.style.borderColor = 'rgba(72,73,77,.7)';
    labelNameElement.style.opacity = '0';
  }

  function removeErrorComment() {
    commentInputElement.setCustomValidity('');
    spanCommentElement.style.display = 'none';
    commentInputElement.style.borderColor = 'rgba(72,73,77,.7)';
  }

  function addErrorComment() {
    commentInputElement.setCustomValidity('Заполните, пожалуйста, поле');
    spanCommentElement.style.display = 'block';
    commentInputElement.style.borderColor = '#ff0000';
    commentInputElement.focus();
  }

  function validateInputName() {
    if (nameInputElement.value === '') {
      addError();
      validName = false;
    } else {
      removeError();
      validName = true;
    }
    return validName;
  }

  function validateInputComment() {
    if (commentInputElement.value === '') {
      addErrorComment();
      validComment = false;
    } else {
      removeErrorComment();
      validComment = true;
    }
    return validComment;
  }

  onSelectInput(nameInputElement, validateInputName);
  onSelectInput(commentInputElement, validateInputComment);


  function appendComment() {
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
    btnFeedbackElement = commentElement.querySelector('.interaction__btnfeedback');
  }

  function submitHandler(evt) {
    evt.preventDefault();
    removeError();
    validateInputName(validName);
    validateInputComment(validComment);

    if (validName === true && validComment === true) {
      appendComment();
      getRating();
      closePopup();
    }
  }

  var formElement = popupElement.querySelector('.popup__form');
  formElement.addEventListener('submit', submitHandler);
})();
