'use strict'

const takePromptsTemplate = require('../templates/take-scaled-survey.handlebars')
const showPromptsTemplate = require('../templates/view-scaled-surveys.handlebars')
const store = require('./../store')

const getPromptsSuccess = data => {
  $('.content').html('')
  const usersPrompts = data.prompts.filter(prompt => prompt.owner === store.user._id)
  const showMyPrompts = showPromptsTemplate({ prompts: usersPrompts })
  $('.content').show()
  $('.content').html(showMyPrompts)
  $('#auth').hide()
  $('#show-my-surveys').hide()
  $('#take-surveys').show()
}

const takePromptSuccess = data => {
  $('.content').html('')
  const showOthersPrompts = takePromptsTemplate({ prompts: data.prompts })
  $('.content').html(showOthersPrompts)
  $('#show-my-surveys').show()
  $('#take-surveys').hide()
}

const deletePromptSuccess = (data) => {
  $('#authNotification').text('successfully deleted survey')
  setTimeout(function () {
    $('#authNotification').text('')
  }, 2000)
}
const deletePromptFailure = (data) => {
  $('#authNotification').text('unable to delete survey, bad request :(')
  setTimeout(function () {
    $('#authNotification').text('')
  }, 2000)
}

const updatePromptSuccess = (data) => {
  const showPromptsHtml = showPromptsTemplate({ prompts: data.prompts })
  $('.content').html(showPromptsHtml)
}

const createPromptSuccessful = () => {
  // Close the modal after a submit event
  $('#create-scaled-modal').modal('hide')

  // Show a success modal
  $('#create-success-modal').modal('show')
  $('form').trigger('reset')
}

const failure = () => {
  $('#authNotification').text('an error occured')
  setTimeout(function () {
    $('#authNotification').text('')
  }, 2000)
  $('.modal').modal('hide')
}

module.exports = {
  getPromptsSuccess,
  deletePromptSuccess,
  updatePromptSuccess,
  createPromptSuccessful,
  takePromptSuccess,
  failure,
  deletePromptFailure
}
