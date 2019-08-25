'use strict'

const config = require('../config')
const store = require('../store')

const createPrompt = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/prompts',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const getPrompts = function () {
  return $.ajax({
    url: config.apiUrl + '/prompts',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const takePrompts = function () {
  return $.ajax({
    url: config.apiUrl + '/prompts',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deletePrompt = function (id) {
  return $.ajax({
    url: config.apiUrl + '/prompts/' + id,
    // url: `${config.apiUrl}/books/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePrompt = function (id, formData) {
  return $.ajax({
    url: config.apiUrl + '/prompts/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'prompt': {
        'question': formData.prompt.question
      }
    }
  })
}

const answerPrompt = function (promptId, questionResponse) {
  return $.ajax({
    url: config.apiUrl + '/responses',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      response: {
        answer: questionResponse,
        survey: promptId
      }
    }
  })
}

module.exports = {
  createPrompt,
  getPrompts,
  deletePrompt,
  updatePrompt,
  takePrompts,
  answerPrompt
}
