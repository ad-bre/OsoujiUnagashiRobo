# OsoujiUnagashiRobo
https://api.slack.com/apps
から新規作成

## Interactive Components
のところでレスポンスを返すURLを入力

## Bots
でAdd Bot
名前と表示名入力

## OAuth & Permissions
Bot User OAuth Access Token
を取得してpost.jsのtokenに入れる

## Permission
CONVERSATIONS   
Access user’s public channels

channels:history
Access information about user’s public channels

channels:read
Access content in user’s private channels

groups:history
Access information about user’s private channels

groups:read
Access content in user’s direct messages

im:history
Access information about user’s direct messages

im:read
Post to specific channels in Slack

incoming-webhook
EMOJI   
Access the workspace’s emoji

emoji:read
INTERACTIVITY   
Add a bot user with the username @osouji

bot

でインストール

## サーバ
nodejsをインストール

slackモジュールが必要なので
npm install slack

expressモジュールも必要なので
npm install express

ngrokのインストール
公式サイトからzipをダウンロード
unzip
で
./ngrok aututoken xxxxxxxxxxx
で認証

## 月曜日昼12時に定期実行
crontab -e
0 12 * * 1 /usr/bin/node /home/user/bot/post.js
