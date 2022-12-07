var apiKey;
var session;
var sessionId;
var token;

function initializeSession() {
  session = OT.initSession(apiKey, sessionId);
  //<<<<<<<<<<<<<<<<<Subscriber>>>>>>>>>>>>>>>>>>>>

  session.on('streamCreated', function streamCreated(event) {
    var subscriberOptions = {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      style: { nameDisplayMode: 'on', buttonDisplayMode: 'on'}
    };
    session.subscribe(event.stream, 'subscriber', subscriberOptions, function callback(error) {
      
      if (error) {
        console.error('There was an error publishing: ', error.name, error.message);
      }
      if (subscriber.stream.hasVideo) {
        var imgData = subscriber.getImgData();
        subscriber.setStyle('backgroundImageURI', imgData);
      } else {
        subscriber.setStyle('backgroundImageURI',
          'https://tokbox.com/img/styleguide/tb-colors-cream.png'
        );
      }
    });
  });

  session.on('sessionDisconnected', function sessionDisconnected(event) {
    console.error('You were disconnected from the session.', event.reason);
  });
//<<<<<<<<<<<<<<<<<Publisher>>>>>>>>>>>>>>>>>>>>
  var publisherOptions = {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    name: "",
    style: { nameDisplayMode: 'on',  buttonDisplayMode: 'on'}
  };
  var publisher = OT.initPublisher('publisher', publisherOptions, function initCallback(initErr) {
    if (initErr) {
      console.error('There was an error initializing the publisher: ', initErr.name, initErr.message);
      return;
    }
  });

  session.connect(token, function callback(error) {
    if (!error) {
      session.publish(publisher, function publishCallback(publishErr) {
        if (publishErr) {
          console.error('Hubo un error al publicar: ', publishErr.name, publishErr.message);
        }
      });
    } else {
      console.error('Hubo un error al conectarse a la sesión: ', error.name, error.message);
    }
  });

  var msgHistory = document.querySelector('#history');
  session.on('signal:msg', function signalCallback(event) {
    var msg = document.createElement('p');
    msg.textContent = event.data;
    msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
    msgHistory.appendChild(msg);
    msg.scrollIntoView();
  });
}

var form = document.querySelector('form');
var msgTxt = document.querySelector('#msgTxt');

form.addEventListener('submit', function submit(event) {
  event.preventDefault();

  session.signal({
    type: 'msg',
    data: msgTxt.value
  }, function signalCallback(error) {
    if (error) {
      console.error('Error sending signal:', error.name, error.message);
    } else {
      msgTxt.value = '';
    }
  });
});

if (API_KEY && TOKEN && SESSION_ID) {
  apiKey = API_KEY;
  sessionId = SESSION_ID;
  token = TOKEN;
  initializeSession();
} else if (SAMPLE_SERVER_BASE_URL) {
  fetch(SAMPLE_SERVER_BASE_URL + '/session').then(function fetch(res) {
    return res.json();
  }).then(function fetchJson(json) {
    apiKey = json.apiKey;
    sessionId = json.sessionId;
    token = json.token;

    initializeSession();
  }).catch(function catchErr(error) {
    console.error('There was an error fetching the session information', error.name, error.message);
    alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
  });
}