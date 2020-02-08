# guess-mine

Realtime Drawing Game built with SocketIO, Gulp, and Node

## To Do:

- [x] Server
- [x] Pug
- [x] Static
- [x] ESlint
- [] Socket IO

* project 생성

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

- 서버 생성
  const app = express();

  app.listen(PORT, handleListening);

- Pug 생성

  1. npm i pug
  2. views 폴더 생성 (in src)

  app.set("view engine", "pug");
  app.set("views", join(\_\_dirname, "views"));

app.get("/", (req, res) => res.render("home"));

- Static

  1. src 안에 static 폴더 만들기
  2. index.js 생성

  app.use(express.static(join(\_\_dirname, "static")));

- EsLint

HTTP와 WS(websocket) 서버의 차이점

- HTTP는 stateless
- WS는 stateful
- HTTP의 GET/POST는 서버에 req를 보내고 res를 받으면 연결이 끊김. 메모리가 적게 필요.
- WS는 연결이 계속 유지된 상태임. 응답하거나 요청할 떄 새로운 연결 통로를 만들 필요 없다. 메모리가 많이 사용됨.

SocketIO는 websocket을 구현할 수 있도록 만들어짐.

- SocketIO enables real-time, bidirectional and event-based communication. It works on every platform, browser or device, focusing equally on reliability and speed.
  1. Real-time analytics - push data to clients that gets represented as real-time counters, charts or logs
  2. Instant messaging and chat - Socket.IO's "Hello worlds" is a chat app in just a few lines of code
  3. binary streaming - Starting in 1.0, it's possible to send any blob back and forth: image, audio, video
  4. document collaboration - allow users to concurrently edit a document and see each other's changes

Websockets도 비슷한 기능을 함. 빠르게 node.JS를 위한 서버와 클라이언트를 만들 수 있음. socket.IO가 초보자에게 적당해서 니코는 이걸 선택함.

서버 위에 어떻게 다른 서버를 올릴까?

const server = app.listen(PORT, handleListening); 로 기존의 서버를 변수에 담고, socketIO를 이용해서 기존 express 서버 위에 다른 서버가 올라가도록 설정. (같은 포트를 이용, traffic가 다르기 때문에 가능. 다른 http 서버를 같은 포트에서 사용하는 것은 불가능. WS와 http를 같은 포트로 사용하는 것은 가능)

const server = app.listen(PORT, handleListening);

const io = socketIO(server);

localhost:4000/socket.io/socket.io.js -> socketIO 프론트엔드/백엔드가 서로 communicate 할 수 있도록 하는 프론트엔드 코드 파일

socketIO는 서버와 클라이언트 역할을 동시에 할 수 있음.
백엔드/프론트엔드에 둘다 설치해야 서로를 이해할 수 있음.

server를 변수로 저장한 이유는 이렇게 저장한 서버를 socketIO로 넘겨주기 위함.

const io가 event들을 모두 listening 할 수 있음.

HTTP는 get/post/put 등이 있는데 모두 라우터를 가짐.
Socket은 페이지가 없고 연결만 있음.

서버와 클라이언트 둘다 이벤트를 보낼 수 있다.
서버가 hello event 를 보내면 클라이언트는 potatoe event를 보낸다.
가장 중요한 것은 connection.

io.on("connection", handleFunction()); --> 누군가 서버에 연결되면 handleFunction이 작동된다.

- 이 것이 연결의 entry point이다.

views/home.pug 파일에 아래를 추가해준다.

script(src="/socket.io/socket.io.js") -> 프론트엔드에도 연결되어야 함. (백엔드/프론트엔드에 둘다 연결되어야 한다고 했잖은가)
이걸 import 하게 되면 io 변수가 윈도우 안에 생성된다.

서버에 연결하는것은 console에서 io("/")를 쓰면 된다. 같은 서버에 연결하는 경우에만 이 명령어가 유효.
서로 다른 서버에 접속하는 경우도 있음. 그때는 다른 명령어로 입력해야..

다른 창에서 똑같은 주소로 연결하면 서로 다른 socket 연결이 생성됨.

여기서 만드는 guess-mind는 이벤트에 기반함.

서버를 종료하고 다시 켜면 여전히 connected 메세지가 애초에 연결된 수만큼 뜨게 됨. 계속 연결이 유지되고 있다는 말.
서버가 멈추면 socket 은 계속 서버에 연결하려고 하고, 서버가 켜지면 마침내 연결됨.

socket은 req라고 생각할 수 있음. 어떤 요청이나 응답을 받고 console에 req처럼 출력할 수 있음. 
socket에는 id가 있음. 

socketIO를 이용한 chat application
- 두가지 이벤트를 listening
  - 유저가 메세지를 보내는 event
  - 다른 유저가 join 하는 event

누군가 socketIO에 연결되면 연결된 (socket)을 socketIO로 가져와서 "hello"라는 메세지를 보낸다
socket.emit("hello") / 서버가 client에게 "hello"라고 얘기한다. 

index.js에서는 
socket.on("hello", () => console.log("Somebody said hello"));
-> 클라이언트가 hello라는 event( client와 서버에 연결)에 "somebody said hello라고 반응하도록 한다. 

server.js가 서버, index.js가 클라이언트에서 일어나는 일들

서버는 이벤트를 발생시킴. 클라이언트는 그 이번트를 듣고 있다. 

서버로부터 발생된 socket.emit은 방금 연결된 client에게 직접 보내짐. 

클라이언트가 여러개라면? 
연결된 하나의 클라이언트 이외에 다른 클라이언트들에게도 메세지를 보내고 싶다면? 

이때는 socket.broadcast.emit이다. 
broadcast.emit으로 하고 방금의 index.js를 실행하면 somebody ~ 메세지를 출력하지 않는다.
왜냐하면 broadcast는 방금 연결된 클라이언트를 제외하고 나머지 클라이언트들에게 event를 보낸다. 

incognito 페이지에서 localhost에 접속하면 someboday ~ 메세지가 출력된다. 이 클라이언트에게는
hello event가 전송되었기 때문이다. 

io.on("connection", socket => {
  setTimeout(() => socket.broadcast.emit("hello"), 5000);
});

여기서 parameter인 socket은 방금 막 만들어진 socketIO를 의미한다. 

emit : 방금 연결된 클라이언트에게 이벤트 생성
broadcast.emit : 방금 연결된 한 클라이언트를 제외한 나머지 클라이언트에게 이벤트 생성 

클라이언트 (index.js)에서 event를 보내면?

-index.js
setTimeout(() => socket.emit("helloGuys"), 4000);
-server.js
io.on("connection", socket => {
  socket.on("helloGuys", () => console.log("the client said hello"));
});

이렇게 하면 프론트엔드에서 메세지를 보내면 백엔드의 콘솔에서 "the client ~"라는 응답이 발생됨. 

지금까지 한 방식으로 백엔드-프론트엔드간에 커뮤니케이션을 만들 수 있다. 

만들어진 socket 연결은 계속 살아있다. 
사용자가 offline이 되거나(페이지 이동) 서버가 연결을 끊을 때만 연결이 끊어짐. 

연결이 이뤄지면 socket을 받아 올 수 있음. 
- 하나의 socket만 생김. 여기서 모든 것이 빌드됨.
- 이 socket을 통해서 다른 socket 연결을 건드릴 수 있음. 

채팅 앱의 과정
- 클라이언트가 새로 연결되면 서버가 다른 클라이언트들에게 broadcasting
- 그 새로운 클라이언트가 메시지를 보내면 서버가 다른 클라이언트들에게 broadcasting
- 각각의 socket client 마다 이 과정이 반복
- 이 때 각각의 socket들은 new message라는 event를 듣고 있어야 함. 