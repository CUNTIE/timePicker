var exports = exports || {};

var timePicker = timePicker || {};
(function() {
  var SEPARATOR = '@';
  var timeArr = ['y', 'mon', 'd', 'w', 'h', 'm', 's'];
  var TimePickRexExp = /(\-?\d+(y|mon|d|w|h|m|s))?@?(all|now|y|mon|d|w|h|m|s)/;
  var defaultTimeStamp = -1;

  function BeYoungAgain(timeRuleStr) {
    timeRuleStr = timeRuleStr.toLowerCase();

    if (!TimePickRexExp.test(timeRuleStr)) {
      return defaultTimeStamp;
    }

    var timeBackNum,
      timeBackUnit,
      timeStoneUnit;
    // 分词器
    if (timeRuleStr.indexOf(SEPARATOR) <= 0) { // 没有时间倒退值和分隔符 // 没有时间倒退值
      timeStoneUnit = timeRuleStr.replace(SEPARATOR, '');
    } else {
      timeBackNum = parseInt(timeRuleStr.split(SEPARATOR)[0].replace(/^\-?/, '-').replace(/(y|mon|d|w|h|m|s)$/, ''));
      timeBackUnit = timeRuleStr.split(SEPARATOR)[0].replace(/^\-?\d+/, '');
      timeStoneUnit = timeRuleStr.split(SEPARATOR)[1];
    }

    if ('all' === timeStoneUnit) {
      return defaultTimeStamp;
    }

    if (null === timeBackNum && null === timeBackUnit) {
      return getTimeStoneDate(timeStoneUnit).getTime();
    } else {
      return getTimeBackDate(timeBackNum, timeBackUnit, timeStoneUnit).getTime();
    }
  }

  function getTimeBackDate(timeBackNum, timeBackUnit, timeStoneUnit) {
    var date = getTimeStoneDate(timeStoneUnit);

    var index = timeArr.indexOf(timeBackUnit);
    index === timeArr.indexOf('y') ? (function() {
      date.setYear(date.getFullYear() + timeBackNum);
    })() : {};
    index === timeArr.indexOf('mon') ? (function() {
      date.setUTCMonth(date.getUTCMonth() + timeBackNum);
    })() : {};
    index === timeArr.indexOf('d') ? (function() {
      date.setUTCDate(date.getUTCDate() + timeBackNum);
    })() : {};
    index === timeArr.indexOf('w') ? (function() {
      date.setUTCDate(date.getUTCDate() + timeBackNum * 7)
    })() : {};
    index === timeArr.indexOf('h') ? (function() {
      date.setUTCHours(date.getUTCHours() + timeBackNum);
    })() : {};
    index === timeArr.indexOf('m') ? (function() {
      date.setUTCMinutes(date.getUTCMinutes() + timeBackNum);
    })() : {};
    index === timeArr.indexOf('s') ? (function() {
      date.setUTCSeconds(date.getUTCSeconds() + timeBackNum);
    })() : {};
    return date;
  }

  function getTimeStoneDate(timeStoneUnit) {
    var date = new Date();

    var index = timeArr.indexOf(timeStoneUnit);
    index < timeArr.indexOf('y') ? (function() {
      index = timeArr.length;
    })() : {};
    index < timeArr.indexOf('mon') ? (function() {
      date.setUTCMonth(0);
    })() : {};
    index < timeArr.indexOf('d') ? (function() {
      date.setUTCDate(1);
    })() : {};
    index === timeArr.indexOf('w') ? (function() {
      date.setUTCDate(date.getUTCDate() - date.getUTCDay());
    })() : {};
    index < timeArr.indexOf('h') ? (function() {
      date.setUTCHours(0);
    })() : {};
    index < timeArr.indexOf('m') ? (function() {
      date.setUTCMinutes(0);
    })() : {};
    index < timeArr.indexOf('s') ? (function() {
      date.setUTCSeconds(0);
    })() : {};

    return date;
  }
  timePicker = {
    getTimeStamp: BeYoungAgain
  };
})();

exports.timePicker = timePicker;