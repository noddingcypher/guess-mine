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
