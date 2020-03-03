const Slack = require('slack');
const slack = new Slack();

const uid = ["UserID", "@1234ABCDE"];
const name = ["UseName", "@inet-lab"];

ANUM = uid.length;

if (ANUM % 2 == 0){
    for (i = 0; i < ANUM; i += 2){
        uid.push(uid[i+1]);
        uid.push(uid[i]);
        name.push(name[i+1]);
        name.push(name[i]);
    }
    ANUM = uid.length;
}

var json = require('ForJSONPath');

var dt = new Date();
var dow    = (dt.getDay() + 6) % 7;
dt.setDate(dt.getDate()-dow);
month1 = dt.getMonth()+1;
date1  = dt.getDate();

dt.setDate(date1+6);
var month2 = dt.getMonth()+1;
var date2  = dt.getDate();

var txt1 = month1+"月"+date1+"日(月)〜"+month2+"月"+date2+"日(日)\n";
var txt2 = "";

var num1 = json['num'] % ANUM;
var num2 = (json['num'] + 1) % ANUM;

var vacuumID    = uid[num1];
var vacuumName  = name[num1];
var garbageID   = uid[num2];
var garbageName = name[num2];

txt1 += "今週は<" + vacuumID + ">さんが掃除機係、<" + garbageID + ">さんがゴミ捨て係です！掃除が終わったら自分の名前のボタンを押してください！\n";
txt1 += "In this week, <" + vacuumID + "> is a vacuum cleaner engagement, <" + garbageID + "> is a garbage dumper! When the cleaning is over, please push the button of your name!";
txt2 = "<" + vacuumID + "> (vacuum cleaner) has not completed...  :x:\n";
txt2 += "<" + garbageID + "> (garbage dumper) has not completed...  :x:";

var fs = require('fs');

json['num'] = (json['num'] + 2) % ANUM;
fs.writeFile('ForJSONPath', JSON.stringify(json, null, '  '));

slack.chat.postMessage({
    token: 'ACCESS_TOKEN',
    channel: '#general',
    text: txt1,
    attachments: [{
        callback_id: 'osouji_button',
        text: txt2,
        color: "#bd0a24",
        actions: [
        {
            name: vacuumID,
            text: vacuumName,
            value: 0,
            type: "button"
        },
        {
            name: garbageID,
            text: garbageName,
            value: 0,
            type: "button"
        }
    ]
    }]
}).then(console.log).catch(console.error);