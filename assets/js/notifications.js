const notifications = document.getElementById("jsNotifications");

const handleNewUser = ({ nickname }) => {
  console.log(nickname, " just joined");
};

window.socket.on(window.events.newUser, handleNewUser);
