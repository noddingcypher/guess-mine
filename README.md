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

이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용하십시오.

정적 자산이 포함된 디렉토리의 이름을 express.static 미들웨어 함수에 전달하면 파일의 직접적인 제공을 시작할 수 있습니다. 예를 들면, 다음과 같은 코드를 이용하여 public이라는 이름의 디렉토리에 포함된 이미지, CSS 파일 및 JavaScript 파일을 제공하십시오.

Express는 정적 디렉토리에 대해 상대적으로 파일을 검색하며, 따라서 정적 디렉토리의 이름은 URL의 일부가 아닙니다.

static is for the front-end

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

const io = socketIO(server); (express 서버 위에서 놀아라)

localhost:4000/socket.io/socket.io.js -> socketIO 프론트엔드/백엔드가 서로 communicate 할 수 있도록 하는 프론트엔드 코드 파일

socketIO는 서버와 클라이언트 역할을 동시에 할 수 있음.
백엔드/프론트엔드에 둘다 설치해야 서로를 이해할 수 있음.

- socketIO로 서버를 코딩할 수 있고
- 클라이언트도 (같은 라이브러리로) 코딩할 수 있다

server를 변수로 저장한 이유는 이렇게 저장한 서버를 socketIO로 넘겨주기 위함.

socketIO 연결을 io로 저장한 이유. const io가 event들을 모두 listening 할 수 있게 하기 위함.

HTTP는 get/post/put 등이 있는데 모두 라우터를 가짐.
Socket은 페이지가 없고 연결만 있음.

서버와 클라이언트 둘다 이벤트를 보낼 수 있다.
서버가 hello event 를 보내면 클라이언트는 potatoe event를 보낸다.
가장 중요한 것은 connection.

io.on("connection", handleFunction()); --> 누군가 서버에 연결되면 handleFunction이 작동된다.

(morgan을 설치-> log를 보여준다)

- 이 것이 연결의 entry point이다. 근데 연결(connection)이 완성되려면 프론트엔드에서도 연결해줘야 한다.
  지금은 서버에만 연결된 상태

views/home.pug 파일에 아래를 추가해준다.

script(src="/socket.io/socket.io.js") -> 프론트엔드에도 연결되어야 함. (백엔드/프론트엔드에 둘다 연결되어야 한다고 했잖은가)
이걸 import 하게 되면 io 변수가 윈도우 안에 생성된다.
(기억하자 백엔드와 프론트엔드에 동시에 연결해줘야 서로가 이벤트를 보내고 받을 수 있음)

서버에 연결하는것은 console에서 io("/")를 쓰면 된다. 같은 서버에 연결하는 경우에만 이 명령어가 유효.
서로 다른 서버에 접속하는 경우도 있음. 그때는 다른 명령어로 입력해야..

다른 창에서 똑같은 주소로 연결하면 서로 다른 socket 연결이 생성됨.

여기서 만드는 guess-mind는 이벤트에 기반함.

서버를 종료하고 다시 켜면 여전히 connected 메세지가 애초에 연결된 수만큼 뜨게 됨. 계속 연결이 유지되고 있다는 말.
서버가 멈추면 socket 은 계속 서버에 연결하려고 하고, 서버가 켜지면 마침내 연결됨.

socket은 req라고 생각할 수 있음. 어떤 요청이나 응답을 받고 console에 req처럼 출력할 수 있음.
socket에는 id가 있음.

socketIO를 이용한 chat application

https://poiemaweb.com/nodejs-socketio

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

function sendMessage(message) {
socket.emit("newMessage", { message }); // 이 부분이 data에 들어가는 부분. data에서 message key에 해당하는 부분의 값은 인자로 받은 message라는 말. message : message
}

socket.on("newMessage", ({ message }) => {
socket.broadcast.emit("messageNotif", { message });
});
-> socket에서 메세지를 받으면 다른 socket에게 메시지 도착 사실과 data를 보내줌

io.on("connection", socket)
여기서 connection event 이후에 생기는 socket 은 객체임.
이 객체에 속성을 추가할 수 있음. 함수를 만들 수 있음.

io.on("connection", socket => {
socket.on("newMessage", ({ message }) => {
socket.broadcast.emit("messageNotif", { message });
});
socket.on("setNickname", ({ nickname }) => {
socket.nickname = nickname; // 여기서 socket 객체에 nickname이란 속성을 추가해줌. 이렇게만 하면 끝.
});
});

저장하면 nodemon 떄문에 서버가 다시 시작. 그러면 socket 메모리가 지워져서 socket 속성들이 reset 됨. 이걸 막으려면 db에 저장해놔야함.

static folder에는 사용자들에게 보내지는 파일들이 담긴다.
백엔드에서는 import 같은 구문이 사용가능하지만 프론트에서는 이러한 구문들을 이해할 수 없으므로(크롬 등의 브라우저에서) 적절하게 변환되어야 한다.

- build라는 작업을 통해서 우리가 작성한 코드를 프론트에서도 사용할 수 있는 코드로 변환
- babel도 쓰고 싶고, scss도 쓰고 싶다.
- 이러한 작업을 할 수 있도록 해주는 것이 우리가 wetube에서 썼던 express. express가 input으로 들어간 ES6,babel,scss등을 normal JS와 CSS로 변환해줬다.
- 여기서는 gulp를 써줄 것임.

function html() {
return src('client/templates/\*.pug')
.pipe(pug())
.pipe(dest('build/html'))
}

function css() {
return src('client/templates/\*.less')
.pipe(less())
.pipe(minifyCSS())
.pipe(dest('build/css'))
}

function js() {
return src('client/javascript/\*.js', { sourcemaps: true })
.pipe(concat('app.min.js'))
.pipe(dest('build/js', { sourcemaps: true }))
}

src에서 dest까지 (input -> output)

webpack에서는 webpack을 실행시키면 webpack.config.js가 생성.
이러한 역할은 gulpfile.babel.js가 함.

assets 폴더 생성 -> scss 폴더 생성 -> styles.scss 파일
gulp가 이 파일을 인식해서 css로 변환해서 src의 statics 폴더에 .css 파일을 넣어주도록 하자.

npm i gulp
npm i gulp-sass node-sass

https://www.npmjs.com/package/gulp-sass의 basic usage document는 gulp 예전 버전에 대한 사용법 같음
task 라는 작업은 예전에 있었고 지금은 없음.

gulpfile.babel.js에서는 source 파일이 어떤 식으로 변환을 거쳐야 하는지를 써주면 됨.
각각을 함수로 만들어줌.

- pipe() 파일을 관(pipe)를 통해서 보내준다. 변환해준다.

File not found with singular glob error : 해당 폴더 안에서 파일을 찾을 수 없을 때 발생. 탐색기에서 파일의 위치를 정확히 확인.

npm i gulp-autoprefixer

- webkit prefix 같은 것은 안 써도 되게끔 해주는 것. 브라우저 별로 다른 명령어들을 고려하지 않아도 됨.
  npm i gulp-csso

gulpfile.babel.js에 sass.compiler = require("node-sass") 추가. (based on the document)

저장할 때마다 함수를 계속 npm run buld:styles를 실행해줘야 하는 번거로움을 해결하기 위한 방법

- watchFiles 구문

function watchFiles() {
gulp.watch(paths.styles.watch, styles);
}

const dev = gulp.series([styles, watchFiles]);

export default dev;

여기까지가 css 파트. js로 넘어가기 전에 del을 설치할것. (폴더를 삭제하기 위한 package)

browserify

- wetube의 경우 코드가 그리 방대하지 않았기 때문에 굳이 필요없었음
- browserify lets you require('modules') in the browser by bundling up all of your dependencies
- 프로젝트가 크니 파일을 여러개 만들게 될 것임. divide and conquer
- gulp 에서 사용하려고 만들었음.

assets/js/main.js 생성 후 index.js 복사하자. 이제 여기가 client의 js 코드가 될것임.
target은 static/js/main.js

gulp-browserify (현재는 maintaineance되지 않음. gulp-bro로 변경)

- import, require를 마음대로 쓸 수 있게 해주는 package

ParseError: 'import' and 'export' may appear only with 'sourceType: module' 에러

- babelify 설치 필요함

localStorage.getItem("keyname_string")
The getItem() method of the Storage interface, when passed a key name, will return that key's value, or null if the key does not exist, in the given Storage object.

localStorge.setItem("keyname", value)
https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage

querySelector method
Document.querySelector()는 제공한 선택자 또는 선택자 뭉치와 일치하는 문서 내 첫 번째 Element를 반환합니다. 일치하는 요소가 없으면 null을 반환합니다.

className method
className 특정 엘리먼트의 클래스 속성의 값을 가져오거나 설정할 수 있다.
var cName = elementNodeReference.className;
elementNodeReference.className = cName;

localStorage에 nickname에 대한 value가 있으면
  -> login 함수 실행
localStorage에 nickname에 대한 value가 없으면
 -> nickname을 입력받은 이후에 login 함수 실행

login 함수는 
- socket에 연결해주고
- nickname을 설정해준다. 다른 socket에게 emit 시켜준다

const logIn = nickname => {
  const socket = io("/");
  socket.emit("setNickname", {nickname});
  )
}

보통은 이렇게 하면 socket이 연결된다. 그런데!
이렇게 하면 함수 안에서만 socket이 선언됨. 다른 함수에서는 이 socket에 접근하지 못한다는 말. 
우리는 socket.on, socket.emit, socket.., socket...  socket을 쓸 일이 많기 떄문에
---> 이 socket 변수를 global화 시켜줘야 함. 어떻게??

socketController.js 
- 프론트엔드에서 보낸 socket 에 응답해주는 function

events 들을 일일이 "" 안에 string type으로 입력하는 것은 오타날 수 있는 위험.
따로 표준화를 시키자. 
src 안에 events.js를 만들고 그 안에 events를 object로 만듦.

그런데 server에서 만든 events object를 프론트엔드에서는 어떻게 쓸까?
단순한 import는 불가하다. 
서버에서 rendering 명령 시에 같이 보내줘야 함. 

app.get("/", (req,res) => res.render("home", {events: events}))
-> pug template에 백엔드의 변수를 보내는 방법임.

이렇게 한 후에 프론트엔드의 pug template에서 이를 import한다. 

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

script. 
      window.events = !{events}
script(src="/socket.io/socket.io.js")
script(src="/js/main.js")

 window.events = !{events} 이부분은 백엔드의 events object를 모든 파일에서 사용할 수 있게 만들어주는 역할. 
-> 서버랑 클라이언트에서 한 파일을 같이 사용할 수 있게 된다고 하네..
  