document.addEventListener('DOMContentLoaded', function () {
  var categorySelect = document.getElementById('category');
  var valueInput = document.getElementById('value');
  var fromUnitSelect = document.getElementById('from-unit');
  var toUnitSelect = document.getElementById('to-unit');
  var convertBtn = document.getElementById('convert-btn');
  var resultDiv = document.getElementById('result');

  var units = {
    length: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      inches: 1 / 0.0254,
      feet: 1 / 0.3048
    },
    mass: {
      kilograms: 1,
      grams: 1000,
      pounds: 1 / 0.453592
    },
    temperature: {
      celsius: 'celsius',
      fahrenheit: 'fahrenheit'
    }
  };

  function populateUnits(category) {
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    var unitList = units[category];
    for (var unit in unitList) {
      fromUnitSelect.add(new Option(unit, unit));
      toUnitSelect.add(new Option(unit, unit));
    }
  }

  categorySelect.addEventListener('change', function () {
    populateUnits(categorySelect.value);
  });

  convertBtn.addEventListener('click', function () {
    var value = parseFloat(valueInput.value);
    var fromUnit = fromUnitSelect.value;
    var toUnit = toUnitSelect.value;
    var category = categorySelect.value;

    if (isNaN(value)) {
      resultDiv.textContent = '🚫 Please enter a valid number.';
      return;
    }

    var converted;

    if (category === 'temperature') {
      if (fromUnit === toUnit) {
        converted = value;
      } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        converted = (value * 9 / 5) + 32;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        converted = (value - 32) * 5 / 9;
      } else {
        converted = 'Unsupported conversion';
      }
    } else {
      var base = value / units[category][fromUnit];
      converted = base * units[category][toUnit];
    }

    resultDiv.textContent =
      typeof converted === 'number'
        ? ' Converted Value: ' + converted.toFixed(2)
        : '🚫 ' + converted;
  });

  populateUnits(categorySelect.value);
});