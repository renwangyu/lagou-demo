const socket = io('/');
const videoGrid = document.getElementById('video-grid');

const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001',
});

const peers = {};
const remoteIds = [];

const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
}).then(stream => {
  addVideoStream(myVideo, stream);

  myPeer.on('call', call => {
    call.peer && remoteIds.push(call.peer);
    call.answer(stream);
    const video = document.createElement('video');
    video.muted = true;
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on('user-connected', userId => {
    userId && remoteIds.push(userId);
    connectToNewUser(userId, stream);
  });
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) {
    peers[userId].close();
  }
});

myPeer.on('open', id => {
  document.getElementById('myId').innerText = id;
  socket.emit('join-room', ROOM_ID, id);
});

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}

let conn = null;

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');
  video.muted = true;
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  });
  call.on('close', () => {
    video.remove();
  });
  peers[userId] = call;
}