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
      <div class='date position-relative' id="${data.message_id}">
        <div class="pt-4" id="date-picker-${data.message_id}">
          <!-- date picker -->
          <input type="hidden" id="${data.message_id}-date">
          <div id="${data.message_id}-datepicker"></div>

          <div class="pt-4 d-flex">
            <!-- time -->
            <input
              class="form-control"
              type="time"
              id="${data.message_id}-time"
              name="${data.message_id}-time"
              required
            >
            <input
              id="${data.message_id}-next"
              class="btn btn-primary mx-2"
              type="button"
              value="Next"
            >
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
