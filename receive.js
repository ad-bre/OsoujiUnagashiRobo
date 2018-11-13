const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.post('/', bodyParser.urlencoded({ extended: false }), (req, res) => {
    const payload = JSON.parse(req.body.payload);
    console.log(payload.original_message.attachments[0].actions);
    name1 = payload.original_message.attachments[0].actions[0].name;
    name2 = payload.original_message.attachments[0].actions[1].name;
    txt1 = payload.original_message.attachments[0].actions[0].text;
    txt2 = payload.original_message.attachments[0].actions[1].text;
    value1 = payload.original_message.attachments[0].actions[0].value;
    value2 = payload.original_message.attachments[0].actions[1].value;
    text = "";

    if (payload.user.id != payload.actions[0].name.replace('@', '') && payload.user.id != "ADMIN_ID") {
        res.end();
	return;
    }

    if (payload.actions[0].name == name1) {
	value1 = (value1-'0'+1) % 2;
    } else {
	value2 = (value2-'0'+1) % 2;
    }
    if (value1 == 1) {
	text = "<"+name1+"> (vacuum clearner) has completed!!!  :white_check_mark:\n";
    } else {
	text = "<"+name1+"> (vacuum clearner) has not completed yet...  :x:\n";
    }
    if (value2 == 1) {
        text += "<"+name2+"> (garbage dumper) has completed!!!  :white_check_mark:";
    } else {
        text += "<"+name2+"> (garbage dumper) has not completed yet...  :x:";
    }
    res.json({
        text: payload.original_message.text,
        attachments: [{
            callback_id : payload.original_message.attachments[0].callback_id,
            text: text,
            color: "#bd0a24",
            actions: [
                {
                    name: name1,
                    text: txt1,
                    value: value1,
                    type: "button"
                },
                {
                    name: name2,
                    text: txt2,
                    value: value2,
                    type: "button"
                }
            ]
        }]
    });
});

app.listen(3000);