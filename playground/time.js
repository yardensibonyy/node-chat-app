const moment = require('moment');
// Jan 1st 1970 00:00:00 am
//1,000 = 1sec; 10,000 = 10sec

console.log(moment().format());
var date = moment();
console.log(date.format('H:mm a'));

console.log(moment().valueOf()); //creating timestamp. equals to new Date().getTime();
