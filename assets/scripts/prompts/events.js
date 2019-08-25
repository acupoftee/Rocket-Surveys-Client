'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
// const surveyEvents = require('../surveys/events')

// create settings id variable
let pid = ''

// set settings id to the survey that was clicked - for update & delete
const onSettings = event => {
  pid = $(event.target).data('id')
}

const onTakePrompts = event => {
  event.preventDefault()
  $('#empty-content').html('')
  $('#rating-content').html('')
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
  const id = pid
  const form = event.target
  const formData = getFormFields(form)
  api.updatePrompt(id, formData)
    .then(() => {
      // need to "re-get" to see newly updated surveys
      onGetPrompts(event)
      $('.r-settings-modal').modal('hide')
      $('body').removeClass('modal-open')
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
  const id = pid
  api.deletePrompt(id)
    .then(() => {
      onGetPrompts(event)
      $('body').removeClass('modal-open')
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
  if (!$('input[type=radio][name=answer]:checked').val()) {
    $('#authNotification').text('Please enter a response.')
  } else {
    questionResponse = +$('input[type=radio][name=answer]:checked').val()
    $('#authNotification').text('Response recorded.')
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
  $('body').on('click', '.rating-settings', onSettings)
  $('body').on('submit', '.edit-prompt', onUpdatePrompt)
  $('body').on('click', '.delete-prompt-button', onDeletePrompt)
  $('#create-scaled-survey').on('submit', onCreatePrompt)
  $('body').on('click', '.prompt-response', onAnswerPrompt)
}

module.exports = {
  addHandlers,
  onGetPrompts,
  onTakePrompts,
  onAnswerPrompt
}
