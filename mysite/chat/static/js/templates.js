const messageTemplate = (data, childTemplate) => {
  return `
    <div class="message d-flex ${data.engagement_name != 'Machine' ? 'message-out' : ''}">
      <p class="username">${data.engagement_name || 'Machine'}</p>
      <div class="message-inner">
        <div class="message-body">
          <div class="message-content">
            <div class="message-text">
            ${childTemplate}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

const renderYesNoMessageContent = (data) => {
  if (!data.answer) {
    return `
      <p class="mb-0">${data.message }</p>
      <div class="pt-4 position-relative" id="${data.message_id}">
        <input type="radio" class="btn-check" id="${data.message_id}-yes" name="yes-no" value="yes">
        <label class="btn btn-primary" for="${data.message_id}-yes">Yes</label>

        <input type="radio" class="btn-check" id="${data.message_id}-no" name="yes-no" value="no">
        <label class="btn mx-2 btn-danger" for="${data.message_id}-no">No</label>
      </div>
    `
  } else {
    return `
      <p class="mb-0 text-capitalize">${data.answer}</p>
    `
  }
}

const yesNoQuestionBox = (data) => {
  let childTemplate = renderYesNoMessageContent(data);
  return messageTemplate(data, childTemplate)
}

const textMessageBox = (data) => {
  textTemplate = `<p class="mb-0">${data.message }</p>`;

  return messageTemplate(data, textTemplate);
}

const renderDateTimePickerContent = (data) => {
  if (!data.answer) {
    return `
      <p class="mb-0">${data.message }</p>
      <div class='date position-relative pt-4' id="${data.message_id}">
        <p class="border-bottom">Choose A Date and Time:</p>
        
        <div class="pt-1" id="date-picker-${data.message_id}">
          <!-- date picker -->
          <input type="hidden" id="${data.message_id}-date">
          <div id="${data.message_id}-datepicker"></div>

          <div class="pt-4">

            <div class="d-flex justify-content-between">
              <!-- time -->
              <input
                type="text"
                maxlength="5"
                placeholder="00:00"
                class="time-input form-control"
                onkeypress="return onlyNumber(event, this)"
                id="${data.message_id}-time"
                name="${data.message_id}-time"
                onchange="setError(this, '${data.message_id}-error')"
              />

              <!-- AM/PM -->
              <div class="btn-group btn-group-toggle radio-group ms-1" data-toggle="buttons">
                <input
                  type="radio"
                  class="btn-check"
                  name="${data.message_id}-meridian"
                  id="${data.message_id}-am"
                  autocomplete="off"
                  value="AM"
                  checked
                >
                <label class="btn btn-sm  radio-label" for="${data.message_id}-am">AM</label>
                
                <input
                  type="radio"
                  class="btn-check"
                  name="${data.message_id}-meridian"
                  id="${data.message_id}-pm"
                  autocomplete="off"
                  value="PM"
                >
                <label class="btn btn-sm radio-label" for="${data.message_id}-pm">PM</label>
              </div>

              <input
                id="${data.message_id}-next"
                class="btn btn-primary ms-1 btn-sm btn-next"
                type="button"
                value="Next"
              >
            </div>
            <div class="error text-danger d-none" id="${data.message_id}-error">
              Invalid time.
            </div>
          </div>
        </div>
      </div>
    `
  } else {
    return `
      <p class="mb-0 text-capitalize">${data.answer}</p>
    `
  }
}

const dateTimePickerBox = (data) => {
  dateTimePickertemplate = renderDateTimePickerContent(data)
  return messageTemplate(data, dateTimePickertemplate);
}
