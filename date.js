const moment = require('moment');

const today = moment();
console.log(today.format('YYYYMMDD'));

console.log(today.day());
