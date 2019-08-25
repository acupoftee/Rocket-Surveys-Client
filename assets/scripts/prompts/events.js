'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')

// create settings id variable
let sid = ''

// set settings id to the survey that was clicked - for update & delete
const onSettings = event => {
  sid = $(event.target).data('id')
}

const onTakePrompts = event => {
  event.preventDefault()
  $('#content').html('')
  api.takePrompts()
    .then(ui.takePromptSuccess)
    .catch(ui.failure)
}

const onGetPrompts = () => {
  api.getPrompts()
    .then(ui.getPromptsSuccess)
    .catch(ui.failure)
}

// update survey
const onUpdatePrompt = (event) => {
  event.preventDefault()
  const id = sid
  const form = event.target
  const formData = getFormFields(form)
  api.updatePrompt(id, formData)
    .then(() => {
      // need to "re-get" to see newly updated surveys
      onGetPrompts(event)
      $('#settings-modal').modal('hide')
      $('.modal-backdrop').hide()
    },
    $('#authNotification').text('Survey updated.')
    )
    .then(setTimeout(function () {
      $('#authNotification').text('')
    }, 2000))
    // .then($('#change-password-modal').modal('hide'))
    // $('.modal-backdrop').hide()
    .catch(ui.failure)
}

const onDeletePrompt = (event) => {
  const id = sid
  api.deletePrompt(id)
    .then(() => {
      onGetPrompts(event)
      $('.modal-backdrop').hide()
    })
    .then(ui.deletePromptSuccess)
    .catch(ui.deletePromptFailure)
}

const onCreatePrompt = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.createPrompt(formData)
    .then(ui.createPromptSuccessful)
    .then(() => onGetPrompts(event))
    .catch(ui.failure)
}

const onAnswerPrompt = event => {
  event.preventDefault()
  const surveyId = $(event.target).data('id')

  let questionResponse

  if ($('input[type=radio][name=answer]:checked').val() === 'yes') {
    // yes += 1
    questionResponse = true
    $('#authNotification').text('Response recorded.')
  } else if ($('input[type=radio][name=answer]:checked').val() === 'no') {
    // no += 1
    questionResponse = false
    $('#authNotification').text('Response recorded.')
  } else {
    $('#authNotification').text('Please enter a response.')
  }
  api.answerPrompt(surveyId, questionResponse)
    .then(() => {
      onTakePrompts(event)
      $('#settings-modal').modal('hide')
    })
    // .then($('#authNotification').text('Response recorded.'))
    .then(setTimeout(function () {
      $('#authNotification').text('')
    }, 2000))
    .catch(ui.failure)
}

const addHandlers = () => {
  $('body').on('click', '.settings', onSettings)
  $('body').on('submit', '.edit-prompt', onUpdatePrompt)
  $('body').on('click', '.delete-prompt-button', onDeletePrompt)
  $('#create-scaled-survey').on('submit', onCreatePrompt)
  $('body').on('click', '.survey-response', onAnswerPrompt)
}

module.exports = {
  addHandlers,
  onGetPrompts,
  onTakePrompts,
  onAnswerPrompt
}
