'use strict'
const Chart = require('chart.js')

const yesNoChart = () => {
  window.onLoad = function () {
    const ctx = document.getElementById('yesNoChart').getContext('2d')
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Yes', 'No'],
        datasets: [{
          label: 'Yesses and Nos',
          data: [$('.regular-card').data('yes'),
            $('.regular-card').data('no')],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      }
    })
    return chart
  }
}

module.exports = yesNoChart
