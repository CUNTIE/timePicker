var timePicker = require('../src/timePicker.js').timePicker;

var testArr = ['all','now','-1s@now','-1m@now','-1h@now','-1d@now', '-1w@mow', '-1mon@mow','-1y@now'];

testArr.forEach(function(str){
	console.log('\nstr: ' + str,
	'\nDateTime:' + new Date(timePicker.getTimeStamp(str)),
	'\nMillisecond: ' + timePicker.getTimeStamp(str));
});