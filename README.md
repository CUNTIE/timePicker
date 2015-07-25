# timePicker #
Define a time picker method for easy coding

## 背景 ##
在数据统计平台的前端页面，经常需要使用多种时间戳进行数据查询。

*例如：* `今天` `昨天` `一小时内` `一周内` `一年前` `去年`

所以使用 **timePicker** 来语意化时间选择器，方便前端 `HTML`and `JS` 代码的编写

# timepicker 字段定义 #

**所有字段为小写格式**

## 分隔符(**SEPARATOR**) '@'

*用途:*

分割**timepicker**字段内容

*格式：*

包含 **时间倒退值**(**timeBack**) and **时间倒退参考点**(**timeStone**)

> 时间倒退值**@**时间倒退参考点

*示例：* 

> -7d@mon

`-7d` **时间倒退值**

`mon` **时间倒退参考点**

该示例意义：从这个月开始的时刻倒退7天的那个时刻

## 没有分隔符的 timepicker ##

* **now** 表示当前

* **all** 表示不受限制的时间

## 时间倒退值 字段定义 ##

**-x** 表示时间倒退的数值为**x**

**y** 表示时间倒退单位为年

**mon** 表示时间倒退单位为月

**d** 表示时间倒退单位为日

**w** 表示时间倒退单位为周

**h** 表示时间倒退单位为小时

**m** 表示时间倒退单位为分钟

**s** 表示时间倒退单位为秒

## 时间倒退参考点 字段定义 ##

**y** 表示当前年的开始时刻

**mon** 表示当前月的开始时刻

**d** 表示今天的开始时刻

**w** 表示当前周的开始时刻

**h** 表示当前小时的开始时刻

**m** 表示当前分钟的开始时刻

**s** 表示当前秒的开始时刻

## 返回值 ##

* `all` 返回 `-1`

* `[@]now` 返回 `当前UTC毫秒数`

* 其他语法 返回过去该时刻的 `UTC毫秒数`

---

# 时间段(两个时刻间) 定义 #

**date-earliest** 表示开始时间

**date-lastest** 表示结束结束

其值均为 **timepicker字段**

*示例*
    
    <a href="#" class="timepick" date-earliest="-2d@now" date-lastest="now">两天内</a>

`date-earliest = "-2d@now"` 开始时间为 `2d@now` `当前时刻倒退两天的时刻`

`date-lastest = "now"` 结束时间为 `now` `当前时刻`

所以该示例的含义为 `两天内`

# 优点 #

* 参考了 [**splunk**][splunktiem] 的方式

* **HTML**可通过配置文件生成，以及用户自定义时间选择器

* 简化了 **HTML** 和 **JS** 代码的编写

# 前端处理方法 #

    编写HTML代码，必须实现严格的 timepick 语法

* **兼容所有严格的 timepick 语法**

* **对不严格语法尽可能处理**


## 兼容列表 ##

* 对于输入 `" "`（空格） 和 `""`(空) 返回当前时间



[splunktiem]: http://docs.splunk.com/Documentation/Splunk/6.2.4/Search/Specifytimemodifiersinyoursearch