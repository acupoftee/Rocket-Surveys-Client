'use strict'

const tabulate = (array, num) => {
  return array.filter(n => n.answer === num).length
}
module.exports = tabulate
