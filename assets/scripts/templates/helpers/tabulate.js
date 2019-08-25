'use strict'

const tabulate = (array, num) => {
  return array.filter(n => n === num).length
}
module.exports = tabulate
