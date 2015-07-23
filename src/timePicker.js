var exports = exports || {};

var timePicker = timePicker || {};
(function (){
  var SEPARATOR = '@';
  var timeArr = ['y','mon','d','w','h','m','s'];
  var TimePickerRexExp = /(\-?\d+(y|mon|d|w|h|m|s))?@?(all|now|y|mon|d|w|h|m|s)/;
  var defaultTimeStamp = -1;

  function BeYoungAgain(timeRuleStr){
    timeRuleStr = timeRuleStr.toLowerCase();

    if(!TimePickerRexExp.test(timeRuleStr)){
      return defaultTimeStamp;
    }

    var timeBackNum,
        timeBackUnit,
        timeStoneUnit;
    // 分词器
    if(timeRuleStr.indexOf(SEPARATOR) <= 0){// 没有时间倒退值和分隔符 或 没有时间倒退值
        timeStoneUnit = timeRuleStr.replace(SEPARATOR, '');
    }
    else {
      timeBackNum = parseInt(timeRuleStr.split(SEPARATOR)[0].replace(/^\-?/, '-').replace(/(y|mon|d|w|h|m|s)$/, ''));
      timeBackUnit = timeRuleStr.split(SEPARATOR)[0].replace(/^\-?\d+/, '');
      timeStoneUnit = timeRuleStr.split(SEPARATOR)[1];
    }
    console.log(timeRuleStr, timeBackNum, timeBackUnit, timeStoneUnit);

    if('all' === timeStoneUnit){
      return defaultTimeStamp;
    }

    if(null === timeBackNum && null === timeBackUnit){
       return getTimeStoneDate(timeStoneUnit).getTime();
    }else{
       return getTimeBackDate(timeBackNum, timeBackUnit, timeStoneUnit).getTime();
    }
  }

  function getTimeBackDate(timeBackNum, timeBackUnit, timeStoneUnit){
    var date = getTimeStoneDate(timeStoneUnit);

    var index = timeArr.indexOf(timeBackUnit);
    index === timeArr.indexOf('y')?(function (){date.setYear(date.getFullYear() + timeBackNum);})():{};
    index === timeArr.indexOf('mon')?(function (){date.setMonth(date.getMonth() + timeBackNum);})():{};
    index === timeArr.indexOf('d')?(function (){date.setDate(date.getDate() + timeBackNum);})():{};
    index === timeArr.indexOf('w')?(function (){date.setDate(date.getDate() + timeBackNum*7)})():{};
    index === timeArr.indexOf('h')?(function (){date.setHours(date.getHours() + timeBackNum);})():{};
    index === timeArr.indexOf('m')?(function (){date.setMinutes(date.getMinutes() + timeBackNum);})():{};
    index === timeArr.indexOf('s')?(function (){date.setSeconds(date.getSeconds() + timeBackNum);})():{};

    return date;
  }

  function getTimeStoneDate(timeStoneUnit){
    var date = new Date();

    var index = timeArr.indexOf(timeStoneUnit);
    index < timeArr.indexOf('y')?(function (){index=timeArr.length})():{};
    index < timeArr.indexOf('mon')?(function (){date.setMonth(0);})():{};
    index < timeArr.indexOf('d')?(function (){date.setDate(1);})():{};
    index === timeArr.indexOf('w')?(function (){date.setDate(date.getDate() - date.getDay());})():{};
    index < timeArr.indexOf('h')?(function (){date.setHours(0);})():{};
    index < timeArr.indexOf('m')?(function (){date.setMinutes(0);})():{};
    index < timeArr.indexOf('s')?(function (){date.setSeconds(0);})():{};

    return date;
 }

 timePicker = {
    getTimeStamp: BeYoungAgain
 };
})();

exports.timePicker = timePicker;