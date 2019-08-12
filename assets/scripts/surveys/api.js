'use strict'

const config = require('../config')
const store = require('../store')

const createSurvey = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    data: formData,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getSurveys = function () {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const takeSurveys = function () {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteSurvey = function (id) {
  return $.ajax({
    url: config.apiUrl + '/surveys/' + id,
    // url: `${config.apiUrl}/books/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateSurvey = function (id, formData) {
  console.log(`id is ${id}`)
  console.log(formData)
  return $.ajax({
    url: config.apiUrl + '/surveys/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'survey': {
        'question': formData.survey.question
      }
    }
  })
}

module.exports = {
  createSurvey,
  getSurveys,
  deleteSurvey,
  updateSurvey,
  takeSurveys
}
