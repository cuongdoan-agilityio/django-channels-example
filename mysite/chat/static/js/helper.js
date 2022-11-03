const convertTime = (timeValue) => {
  let timeSplit = timeValue.split(':'),
      hours,
      minutes,
      meridian;

  hours = timeSplit[0];
  minutes = timeSplit[1];
  
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';

    if (hours === 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }

  return `${hours}:${minutes} ${meridian}`;
}

const onlyNumber = (evt, element) => {
  let eValue = element.value;

  // Only ASCII character in that range allowed
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode;

  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    return false;
  }

  if (eValue.length === 2) {
    element.value = `${element.value}:`;
  }

  return true;
}

const invalidTime = (value) => {
  let isValid = /((0[1-9]|1[0-2]):([0-5][0-9]))/.test(value);

  return isValid;
}

const setError = (inputField, errorMessageSelector) => {
  let isValid = invalidTime(inputField.value);

  if (!isValid) {
    // Highlight time input
    inputField.style.border = '1px solid red';

    // Show error mesage
    $(`#${errorMessageSelector}`).removeClass('d-none')
  } else {
    inputField.style.border = '1px solid #E2E1E1';

    // Hide error mesage
    $(`#${errorMessageSelector}`).addClass('d-none')
  }
}
