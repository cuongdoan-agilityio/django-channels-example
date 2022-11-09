// '2022-11-08T13:00' -> '2022-11-08T01:00 PM'
const convertDateTime = (dateTimeValue) => {
  let dateTimeSplit = dateTimeValue.split('T');
  let timeSplit = dateTimeSplit[1].split(':'),
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

  return `${dateTimeSplit[0]} ${hours}:${minutes} ${meridian}`;
}

const invalidTime = (value) => {
  let isValid = /((0[1-9]|1[0-2]):([0-5][0-9]))/.test(value);

  return isValid;
}

const defaultDateTime = () => {
  var currentdate = new Date();

  return `${currentdate.toISOString().split('T')[0]}T12:00`;
}
