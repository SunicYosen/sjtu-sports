// ==UserScript==
// @name         SJTU Sports
// @namespace    Sunic.SJTU
// @version      0.1
// @description  More Sports!
// @author       Sunic Yosen
// @match        https://www.google.com/search?q=Tampermonkey&oq=Tampermonkey&aqs=chrome..69i57j69i60l4.685j0j7&sourceid=chrome&ie=UTF-8
// @icon         https://www.google.com/s2/favicons?domain=sunicyosen.github.io
// @include      https://sports.sjtu.edu.cn/*
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    function get_day(day) {
				//Date()返回当日的日期和时间。
				var days = new Date();
				//getTime()返回 1970 年 1 月 1 日至今的毫秒数。
				var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
				//setTime()以毫秒设置 Date 对象。
				days.setTime(gettimes);
				var year = days.getFullYear();
				var month = days.getMonth()+1;
				if(month<10){
					month="0"+month;
				}
				var today = days.getDate();
				if(today<10){
					today="0"+today;
				}
				return year + "-" + month + "-" + today;
	}

    function is_booking_page(){
        return (document.getElementsByClassName("inner-seat-wrapper").length != 0);
    }

    function select_seat(time){
        if(time >= 7){
            var seat_table = document.getElementsByClassName('inner-seat-wrapper')[0];
            var seats_time   = seat_table.getElementsByClassName('clearfix')[time-7];
            var seats_unselect = seats_time.getElementsByClassName('unselected-seat');
            Math.seed = new Date().getTime();

            if (seats_unselect != null){
                var random_seat = Math.floor(Math.random()*seats_unselect.length);
                seats_unselect[random_seat].click();
            }
        }
    }

    function select_seats(){
        // var seat_table = document.getElementsByClassName('inner-seat-wrapper')[0];
        // var seats_20   = seat_table.getElementsByClassName('clearfix')[13];
        // var seats_unselect = seats_20.getElementsByClassName('unselected-seat');
        // Math.seed = new Date().getTime();

        // if (seats_unselect != null){
        //     var random_seat = Math.floor(Math.random()*seats_unselect.length);
        //     seats_unselect[random_seat].click();
        // }

        // Get select time
        var time_selectors = document.getElementsByClassName("sunic_selector");
        for (var i=0; i<time_selectors.length; i++){
            var select_time = GM_getValue("sunic_selector"+i+"_value");
            select_seat(select_time);
        }

        // var array = document.getElementsByClassName('unselected-seat');
        // array[array.length - 2].click();
        // array[array.length - 1].click();
        
        var array_zhifu = document.getElementsByClassName("butMoney");
        array_zhifu[0].getElementsByTagName("button")[0].click();
        document.getElementsByClassName("el-checkbox__inner")[0].click();
        document.getElementsByClassName("el-dialog__footer")[0].getElementsByTagName("button")[1].click();
        setTimeout('alert("已完成，请付款！")', 1000);
        // alert("已完成，请付款！");
        // document.getElementsByClassName("placeAnOrder")[0].getElementsByTagName("button")[0].click();
        // document.getElementsByClassName("el-dialog__footer")[0].getElementsByTagName("button")[1].click();
    }

    function select_date(){
        document.getElementById(localStorage.getItem("sunic_date_id")).click();
        setTimeout(select_seats, 200);
    }

    function refreshing(){
        // alert("开启");
        var date_id = 'tab-' + document.getElementById("sunic_date").value;
        localStorage.setItem("sunic_date_id", date_id);

        // Save select time
        var time_selectors = document.getElementsByClassName("sunic_selector");
        for (var i=0; i<time_selectors.length; i++){
            var select_index = time_selectors[i].selectedIndex;
            var select_time = time_selectors[i].options[select_index].value;
            GM_setValue("sunic_selector"+i+"_value", select_time);
        }

        GM_setValue("sunic_booking_date", document.getElementById("sunic_date").value);
        GM_setValue("sunic_start_time", document.getElementById("sunic_time").value);
        GM_setValue("timeout_refresh", 1);
        location.reload();

        // var current=location.href;
        // location.replace(current);
        // setTimeout(select_date, 100);
    }

    function is_login(){
        return (document.getElementsByClassName("characterInformation").length != 0);
    }

    function is_enabled(){
        return document.getElementById("sunic_enable").checked;
    }

    function get_start_time(){
        var start_time_str = document.getElementById('sunic_time').value;
        var start_time         = new Date(start_time_str);
    }

    var sunic_ext_elements = '<div id="sunic_ext" style="z-index: 9999; position: fixed ! important; right: 0px; top: 1%; width:50%;"> <div id="date_text" style="float: left; margin-left:5px;">预定日期: </div> <div style="float: left;"> <input id="sunic_date" style="border:1px solid #131313; margin-left:5px; margin-right:5px; style="width: 100%;"/></div> <div id="time_text" style="float: left; margin-left:5px;">开始时间: </div> <div style="float: left;"> <input id="sunic_time" style="border:1px solid #131313; margin-left:5px; margin-right:5px;" value="12:00"  style="width: 100%;"/></div> <div style="text-align:center; float: left;"> <select class="sunic_selector" id="sunic_1_selector"> <option value=0>None</option> <option value=7>7</option> 	<option value=8>8</option> 	<option value=9>9</option> 	<option value=10>10</option> 	<option value=11>11</option> 	<option value=12>12</option> 	<option value=13>13</option> 	<option value=14>14</option> 	<option value=15>15</option> 	<option value=16>16</option> 	<option value=17>17</option> 	<option value=18>18</option> 	<option value=19>19</option> 	<option value=20 selected="selected">20</option> 	<option value=21>21</option> </select> <select class="sunic_selector" id="sunic_2_selector"> <option value=0>None</option> <option value=7>7</option> 	<option value=8>8</option> 	<option value=9>9</option> 	<option value=10>10</option> 	<option value=11>11</option> 	<option value=12>12</option> 	<option value=13>13</option> 	<option value=14>14</option> 	<option value=15>15</option> 	<option value=16>16</option> 	<option value=17>17</option> 	<option value=18>18</option> 	<option value=19>19</option> 	<option value=20  selected="selected">20</option> 	<option value=21>21</option> </select> </div> <div style="float: left; margin-left:5px;"><input id="sunic_enable" type="checkbox" style="margin-left:5px;"/></div> <div style="text-align:center; float: left;"> 开启 </div></div>';

    if(window.location.origin == "https://sports.sjtu.edu.cn"){
        if(is_login()){
            let div=document.createElement("div");
            div.innerHTML=sunic_ext_elements
            document.body.append(div);
        }

        var after_refresh = GM_getValue("timeout_refresh");

        if(after_refresh == 1) {
            GM_setValue("timeout_refresh", 0);
            document.getElementById("sunic_date").value=GM_getValue("sunic_booking_date");
            document.getElementById("sunic_time").value=GM_getValue("sunic_start_time");
            // select_date()
            setTimeout(select_date, 100);
        }
        else{
            var default_date = get_day(7);
            document.getElementById("sunic_date").value=default_date;
            var start_time = get_day(0) + ' ' + '12:00:00';
            document.getElementById("sunic_time").value=start_time;
        }

        // if(is_booking_page() == false){
        //     document.getElementById("sunic_enable").setAttribute("disabled", "true");
        // }
        // else {
        //     document.getElementById("sunic_enable").setAttribute("disabled", "false");
        // }
    }

    // $('#sunic_enable').click(function () {
    //     var target_time  = new Date(document.getElementById("sunic_time").value);
    //     var current_time = new Date();
    //     var time_out_ms = target_time.getTime() - current_time.getTime() + 10;
    //     if (time_out_ms >= 0){
    //         setTimeout(location.reload(),time_out_ms);
    //     }
    // })

    document.getElementById("sunic_enable").onclick = function(){
        if(is_booking_page()){
            var target_time  = new Date(document.getElementById("sunic_time").value);
            var current_time = new Date();
            var time_out_ms = target_time.getTime() - current_time.getTime() + 10;
            // document.getElementById("sunic_time").value="等待: " + time_out_ms + " ms";
            setTimeout(refreshing, time_out_ms);
            // setTimeout('alert("开启")', time_out_ms);
        } else{
            alert("请在预定页面开启");
            document.getElementById("sunic_enable").checked = false;
        }
    }

    // Your code here...
})();