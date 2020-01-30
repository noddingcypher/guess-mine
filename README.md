# guess-mine

Realtime Drawing Game built with SocketIO, Gulp, and Node

project 생성

.gitignore에는 node 항목

git clone (project가 있을 폴더에 git clone)

npm init

npm i nodemon -D

mpn i express

npm i socket.IO

npm i @babel/node

npm i @babel/core

npm i @babel/preset-env

src 폴더 생성 -> server.js 생성

.babelrc 생성 이후
{
"presets" : ["@babel/preset-env"]
}

"scripts": {
"dev:server": "nodemon --exec babel-node src/server"
