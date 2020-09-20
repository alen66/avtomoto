(function savelocal() {
  var IDS = ['name', 'advantage', 'disadvantage', 'comment'];
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

  function saveLocalRate() {
    inputStarElements.forEach(function (element) {
      var input = document.getElementById(element.id);
      input.checked = localStorage.getItem(element.checked);
      input.addEventListener('change', function () {
        localStorage.setItem(element, input.checked);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', saveLocalRate);

})();
