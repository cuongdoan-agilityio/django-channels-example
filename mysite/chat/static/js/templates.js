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
  return `
    <div class="message d-flex ${data.engagement_name != 'Machine' ? 'message-out' : ''}">
      <p class="username">${data.engagement_name || 'Machine'}</p>
      <div class="message-inner">
        <div class="message-body">
          <div class="message-content">
            <div class="message-text">
              <p class="mb-0">${data.message }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
