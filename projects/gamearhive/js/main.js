function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
  if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
  } else {
      fromSlider.value = from;
  }
}
  
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
  } else {
      toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
const [from, to] = getParsed(fromSlider, toSlider);
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
if (from > to) {
  fromSlider.value = to;
  fromInput.value = to;
} else {
  fromInput.value = from;
}
}

function controlToSlider(fromSlider, toSlider, toInput) {
const [from, to] = getParsed(fromSlider, toSlider);
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);
if (from <= to) {
  toSlider.value = to;
  toInput.value = to;
} else {
  toInput.value = from;
  toSlider.value = from;
}
}

function getParsed(currentFrom, currentTo) {
const from = parseInt(currentFrom.value, 10);
const to = parseInt(currentTo.value, 10);
return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max-to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
    ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
    ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
const toSlider = document.querySelector('#toSlider');
if (Number(currentTarget.value) <= 0 ) {
  toSlider.style.zIndex = 2;
} else {
  toSlider.style.zIndex = 0;
}
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

/// Multiselect \\\

$(document).ready(function () {
  $(document).on("click", ".MultiCheckBox", function () {
      var detail = $(this).next();
      detail.show();
  });

  $(document).on("click", ".MultiCheckBoxDetailHeader input", function (e) {
      e.stopPropagation();
      var hc = $(this).prop("checked");
      $(this).closest(".MultiCheckBoxDetail").find(".MultiCheckBoxDetailBody input").prop("checked", hc);
      $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
  });

  $(document).on("click", ".MultiCheckBoxDetailHeader", function (e) {
      var inp = $(this).find("input");
      var chk = inp.prop("checked");
      inp.prop("checked", !chk);
      $(this).closest(".MultiCheckBoxDetail").find(".MultiCheckBoxDetailBody input").prop("checked", !chk);
      $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
  });

  $(document).on("click", ".MultiCheckBoxDetail .cont input", function (e) {
      e.stopPropagation();
      $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();

      var val = ($(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length)
      $(".MultiCheckBoxDetailHeader input").prop("checked", val);
  });

  $(document).on("click", ".MultiCheckBoxDetail .cont", function (e) {
      var inp = $(this).find("input");
      var chk = inp.prop("checked");
      inp.prop("checked", !chk);

      var multiCheckBoxDetail = $(this).closest(".MultiCheckBoxDetail");
      var multiCheckBoxDetailBody = $(this).closest(".MultiCheckBoxDetailBody");
      multiCheckBoxDetail.next().UpdateSelect();

      var val = ($(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length)
      $(".MultiCheckBoxDetailHeader input").prop("checked", val);
  });

  $(document).mouseup(function (e) {
      var container = $(".MultiCheckBoxDetail");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
          container.hide();
      }
  });
});

var defaultMultiCheckBoxOption = { width: '100%', defaultText: 'Select Below', height: '200px' };

jQuery.fn.extend({
  CreateMultiCheckBox: function (options) {

      var localOption = {};
      localOption.width = (options != null && options.width != null && options.width != undefined) ? options.width : defaultMultiCheckBoxOption.width;
      localOption.defaultText = (options != null && options.defaultText != null && options.defaultText != undefined) ? options.defaultText : defaultMultiCheckBoxOption.defaultText;
      localOption.height = (options != null && options.height != null && options.height != undefined) ? options.height : defaultMultiCheckBoxOption.height;

      this.hide();
      this.attr("multiple", "multiple");
      var divSel = $("<div class='MultiCheckBox'>" + localOption.defaultText + "<span class='k-icon k-i-arrow-60-down'><svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='sort-down' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' class='svg-inline--fa fa-sort-down fa-w-10 fa-2x'><path fill='currentColor' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z' class=''></path></svg></span></div>").insertBefore(this);
      divSel.css({ "width": localOption.width });

      var detail = $("<div class='MultiCheckBoxDetail'><div class='MultiCheckBoxDetailHeader'><input type='checkbox' class='mulinput' value='-1982' /><div>Select All</div></div><div class='MultiCheckBoxDetailBody'></div></div>").insertAfter(divSel);
      detail.css({ "width": parseInt(options.width) + 10, "max-height": localOption.height });
      var multiCheckBoxDetailBody = detail.find(".MultiCheckBoxDetailBody");

      this.find("option").each(function () {
          var val = $(this).attr("value");

          if (val == undefined)
              val = '';

          multiCheckBoxDetailBody.append("<div class='cont'><div><input type='checkbox' class='mulinput' value='" + val + "' /></div><div>" + $(this).text() + "</div></div>");
      });

      multiCheckBoxDetailBody.css("max-height", (parseInt($(".MultiCheckBoxDetail").css("max-height")) - 28) + "px");
  },
  UpdateSelect: function () {
      var arr = [];

      this.prev().find(".mulinput:checked").each(function () {
          arr.push($(this).val());
      });

      this.val(arr);
  },
});

// Toggle search 

var search = document.querySelector('search');
var searchToggle = document.querySelector('.search__toggle');

searchToggle.addEventListener('click', function() {
  if (search.classList.contains('search--closed')) {
    search.classList.remove('search--closed');
    search.classList.add('search--opened');
  } else {
    search.classList.add('search--closed');
    search.classList.remove('search--opened');
  }
});