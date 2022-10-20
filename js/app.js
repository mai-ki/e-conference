// valores generados en nuestra Video API
var apiKey = "47592851";
var sessionId = "2_MX40NzU5Mjg1MX5-MTY2NjIyNDQxNDM3MX5mcFpubGhZcTFYdFZqZGJDMlY2Mjc2cnZ-fg";
var token = "T1==cGFydG5lcl9pZD00NzU5Mjg1MSZzaWc9Y2QzYjExM2M5MGJjNTAyMWY0YzRhNzk4MGJkMWFkNzg4MDdjODc2ZTpzZXNzaW9uX2lkPTJfTVg0ME56VTVNamcxTVg1LU1UWTJOakl5TkRReE5ETTNNWDVtY0ZwdWJHaFpjVEZZZEZacVpHSkRNbFkyTWpjMmNuWi1mZyZjcmVhdGVfdGltZT0xNjY2Mjc5ODk4Jm5vbmNlPTAuNTM3MTI4NDc4MzgxMzEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY2ODg3NTQ5OSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

//server code 
initializeSession();

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  //iniciar en el stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // crear el publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // conectar  a la session
  session.connect(token, function(error) {
    // si la coneccion es correcta inicializa el publisherublisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}