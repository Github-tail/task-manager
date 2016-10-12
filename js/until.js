
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // return arr instanceof Array;  //简易判断，准确度差
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // typeof fn === 'function'  //简易判断，准确度差
    return !!fn
        && !fn.nodeName
        && fn.constructor != String
        && fn.constructor != RegExp
        && fn.constructor != Array
        && /function/i.test(fn + '');
}



// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // 对于 数字 字符串 布尔 null undefined
    if (src == null || typeof src != 'object') {
        return src;
    }

    // 对于 Date
    if (src instanceof Date) {
        var clone = new Date(src.getDate());
        return clone;
    }

    // 对于 数组
    if (src instanceof Array) {
        var clone = [];
        for (var i = 0, len = src.length; i < len; i++) {
            clone[i] = src[i];
        }
        return clone;
    }

    // 对于 Object
    if (src instanceof Object) {
        var clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key)) {       // 忽略掉继承属性
                clone[key] = cloneObject(src[key]);
            }
        }
        return clone;
    }
}

// 测试用例：
/*
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);
srcObj.a = 2;
srcObj.b.b1[0] = "Hello";
console.log(abObj.a);
console.log(abObj.b.b1[0]);
console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
*/


// task 2.3
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var new_array = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] !== '' && new_array.indexOf(arr[i]) < 0 ) {
            new_array.push(arr[i]);
        }
    }
    return new_array;
}

// 使用示例
/*
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]
*/


// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var len = str.length;
    for (var i = 0; i < len && (str.charAt(i) === ' ' || str.charAt(i) === '\t'); i++);
    if (i === len) {
        return '';
    }
    for (var j = len; j && (str.charAt(j - 1) === ' ' || str.charAt(j - 1) === '\t'); j--);
    return str.substring(i, j);
}


// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// 使用示例
/*
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
*/

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
/*
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html
*/

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var element = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            element++;
        }
    }
    return element;
}

// 使用示例
/*
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
*/

// task 2.4
// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    phone = phone + '';
    return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}


// task 3.1
function hasClass(element, className) {
    var name = element.className.split(' ');
    if (name.indexOf(className) !== -1) {
        return true;
    }
    return false;

}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        element.className += ' ' + newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        element.className = element.className.replace(oldClassName, '');
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var parent = element.offsetParent;

    while (parent !== null) {
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }

    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    left -= scrollLeft;
    top -= scrollTop;

    return {
        x: left,
        y: top
    }
}


// task 3.2
// 实现一个简单的Query
function $(selector) {
    var allchilds = [];
    var childs = function (element) {    // 递归获取所有子元素
        return element.getElementsByTagName('*');
    }

    var ele = document.getElementsByTagName('html')[0];    // 获取所有元素
    var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割

    for (var i = 0, len = sele.length; i < len; i++) {
        ele = childs(ele);
        var eleLen = ele.length;
        var isGet = false;

        switch (sele[i][0]) {    // 从子节点中查找
            case '#':
                for (var j = 0; j < eleLen; j++) {
                    if (ele[j].id === sele[i].substring(1)) {
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
            case '.':
                for (var j = 0; j < eleLen; j++) {
                    var name = uniqArray(ele[j].className.split(' '));
                    if (name.indexOf(sele[i].substring(1)) !== -1) {
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
            case '[':
                var valueLoc = sele[i].indexOf('=');
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
                    for (var j = 0; j < eleLen; j++) {
                        if (ele[j][key] === value) {
                            ele = ele[j];
                            isGet = true;
                            break;
                        }
                    }
                }
                else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < eleLen; j++) {
                        if (ele[j][key]) {
                            ele = ele[j];
                            isGet = true;
                            break;
                        }
                    }
                }
                break;
            default :
                for (var j = 0; j < eleLen; j++) {
                    if (ele[j].tagName === sele[i].toUpperCase()) {    // tagName 属性的返回值始终是大写的
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
        }
    }

    if (!isGet) {
        ele = null;
    }

    return ele;
}
/*
// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象
// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象
// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象
// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象
$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象
// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
*/


// task 4.1
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    element['on' + event] = listener;
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    element['on' + event] = null;
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.onclick = listener;
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            listener();
        }
    }
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;


// task 4.2
// 对一个列表里所有的<li>增加点击事件的监听
function clickListener(event) {
    console.log(event);
}

/*
$.click($("#item1"), clickListener);
$.click($("#item2"), clickListener);
$.click($("#item3"), clickListener);
*/

// 我们通过自己写的函数，取到id为list这个ul里面的所有li，然后通过遍历给他们绑定事件。这样我们就不需要一个一个去绑定了。
function clickListener(event) {
    console.log(event);
}

function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}

function init() {
    /*
    each($("#list").getElementsByTagName('li'), function(item) {
        $.click(item, clickListener);
    });
    */

    $.click($("#btn"), renderList);
}

// 我们增加了一个按钮，当点击按钮时，改变list里面的项目，这个时候你再点击一下li，绑定事件不再生效了。
// 那是不是我们每次改变了DOM结构或者内容后，都需要重新绑定事件呢？当然不会这么笨，接下来学习一下事件代理，然后实现下面新的方法。
function delegateEvent(element, tag, eventName, listener) {
    element['on' + eventName] = function(e) {
        var e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
        var tname = target.nodeName.toLowerCase();
        if (tname === tag) {
            target['on' + eventName] = listener;
        }
    }
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
/*
$.delegate($("#list"), "li", "click", clickListener);
*/

// task 5.1
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = navigator.userAgent.toLowerCase();
    var ie = ua.match(/rv:([\d.]+)/) || ua.match(/msie ([\d.]+)/);
    if(ie) {
        return ie[1];
    }
    else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    if (expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        var expires = ';expires=' + exdate.toUTCString();
    }
    else {
        expires = '';
    }
    document.cookie = cookieName + '=' + escape(cookieValue) + expires;
}

// 获取cookie值
function getCookie(cookieName) {
    var re = new RegExp(cookieName + '=(.*?)($|;)');
    return re.exec(document.cookie)[1];
}

// task 6.1
// 学习Ajax，并尝试自己封装一个Ajax方法。
function ajax(url, options) {
    // 创建对象
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {        //兼容 IE5 IE6
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 处理data
    if (options.data) {
        var dataarr = [];
        for (var item in options.data) {
            dataarr.push(item + '=' + options.data[item]);
        }
        var data = dataarr.join('&');
    }

    // 处理type
    if (!options.type) {
        options.type = 'GET';
    }
    options.type = options.type.toUpperCase();

    // 发送请求
    if (options.type === 'GET') {
        var myURL = '';
        if (options.data) {
            myURL = url + '?' + data;
        }
        else {
            myURL = url;
        }
        xmlhttp.open('GET', myURL, true);
        xmlhttp.send();
    }
    else if (options.type === 'POST') {
        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(data);
    }

    // readyState
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                if (options.onsuccess) {
                    options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
                }
            }
            else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    }
}

// 使用示例：
/*
ajax(
    'prompt.php',
    {
        data: {
            q: 'a'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        },
        onfail : function () {
            console.log('fail');
        }
    }
);
*/