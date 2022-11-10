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
  `;
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
    `;
  }

  return `<p class="mb-0 text-capitalize">${data.answer}</p>`;
}

const yesNoQuestionBox = (data) => {
  let childTemplate = renderYesNoMessageContent(data);

  return messageTemplate(data, childTemplate);
}

const textMessageBox = (data) => {
  let childTemplate = `<p class="mb-0">${data.message}</p>`;

  return messageTemplate(data, childTemplate);
}

const renderDateTimePickerContent = (data) => {
  if (!data.answer) {
    return `
      <p class="mb-0">${data.message }</p>
      <div class='date position-relative' id="${data.message_id}">
        <div class="pt-3 d-flex flex-column">
          <!-- Date time-->
          <input
            class="form-control"
            type="datetime-local"
            id="${data.message_id}-time"
            name="date-time"
            value="${defaultDateTime()}"
            onkeydown="return false;"
          >
          <small id="datetime-help">Choose A Date and Time.</small>
        </div>
      </div>
    `;
  }
  
  return `<p class="mb-0 text-capitalize">${data.answer}</p>`;
}

const renderLearnMoreContent = (data) => {
  return renderLearnMoreList(data);
}

const dateTimePickerBox = (data) => {
  let childTemplate = renderDateTimePickerContent(data);

  return messageTemplate(data, childTemplate);
}

const learnMoreBox = (data) => {
  let childTemplate = renderLearnMoreList(data);

  return messageTemplate(data, childTemplate);
}

const renderLearnMoreList = (data) => {
  let learnMoreOption = '',
      template = '';

  if (data.is_system_message) {
    (data.learn_more_options || []).map((item) => {
      learnMoreOption += `
        <input type="checkbox" class="btn-check" id="${data.message_id}-${item.id}" name="learn-more" value="${item.id}">
        <label class="btn btn-primary topics-label my-1" for="${data.message_id}-${item.id}">
          <i class="bi bi-check-circle"></i>
          <span class="ms-2">${item.title}</span>
        </label>
      `;
    });

    template += `
      <p class="mb-0">${data.message }</p>
      <div class="pt-3 position-relative" id="${data.message_id}">
        <small>Choose One:</small>
        <div class="d-flex topics flex-column align-items-start">
          ${learnMoreOption}
        </div>
      </div>
    `;
  } else {
    let selectedOption = data.learn_more_options.find(option => option.id == data.message);
    
    learnMoreOption += `
      <input type="checkbox" class="btn-check" id="${data.message_id}-${selectedOption.id}" name="learn-more-answer" value="${selectedOption.id}">
      <label class="btn btn-outline-primary topics-label my-1" for="${data.message_id}-${selectedOption.id}">
        <i class="bi bi-check-circle"></i>
        <span class="ms-2">${selectedOption.title}</span>
      </label>
    `;

    template += `
      <div class="position-relative" id="${data.message_id}">
        <div class="d-flex topics flex-column align-items-start">
          ${learnMoreOption}
        </div>
      </div>
    `;
  }

  return template;
};
