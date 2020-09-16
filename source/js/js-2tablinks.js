'use strict';
(function () {
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
})();
