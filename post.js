const Slack = require('slack');
const slack = new Slack();

stu = ["UserID"];
stn = ["UserName"];

var json = require('roop.json');
var dt = new Date();
dow = (dt.getDay() + 6) % 7;
dt.setDate(dt.getDate()-dow);
month1 = dt.getMonth()+1;
date1 = dt.getDate();
dt.setDate(date1+6);
month2 = dt.getMonth()+1;
date2 = dt.getDate();

txt1 = month1+"月"+date1+"日(月)〜"+month2+"月"+date2+"日(日)\n";

num1 = json['num'] % 8;
num2 = (json['num'] + 1) % 8;

if (json['status'] == 0){
    vacn = stn[num1];
    vacu = stu[num1];
    garn = stn[num2];
    garu = stu[num2];
} else {
    vacn = stn[num2];
    vacu = stu[num2];
    garn = stn[num1];
    garu = stu[num1];
}

txt1 += "今週は<" + vacu + ">さんが掃除機係、<" + garu + ">さんがゴミ捨て係です！掃除が終わったら自分の名前のボタンを押してください！\n";
txt1 += "In this week, <" + vacu + "> is a vacuum cleaner engagement, <" + garu + "> is a garbage dumper! When the cleaning is over, please push the button of your name!";
txt2 = "<" + vacu + "> (vacuum cleaner) has not completed...  :x:\n";
txt2 += "<" + garu + "> (garbage dumper) has not completed...  :x:";

var fs = require('fs');

json['num'] = (json['num'] + 2) % 8;
if (json['num'] == 0) {
    json['status'] = (json['status'] + 1) % 2;
}

fs.writeFile('roop.json', JSON.stringify(json, null, '  '));

slack.chat.postMessage({
    token: 'BOT_TOKEN',
    channel: '#general',
    text: txt1,
    attachments: [{
        callback_id: 'osouji_button',
        text: txt2,
	color: "#bd0a24",
        actions: [
	    {
		name: vacu,
                text: vacn,
		value: 0,
		type: "button"
	    },
            {
		name: garu,
		text: garn,
		value: 0,
		type: "button"
	    }
	]
    }]
}).then(console.log).catch(console.error);