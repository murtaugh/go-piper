var goreveal = (function() {
  var GO_REVEAL_APP_URL = 'https://goinstant.net/elgordo/GoReveal';
  var PLATFORM_URL = 'https://cdn.goinstant.net/v1/platform.min.js';
  var ORIGIN_GO_REVEAL = 'goreveal';

  var platform;
  var roomName;
  var presentation;
  var slide;
  var fragment;


  function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.goinstant.net/v1/platform.min.js';

    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
  }

  function _handleDisplayEvent(evt) {
    // do not forward the change to be shared if there is nowhere to share the
    // value to or if this event is triggered from our response to an update
    // from the sharing server.
    if (!slide || evt.origin === ORIGIN_GO_REVEAL) {
      return;
    }

    var val = Reveal.getIndices();
    slide.set(val);
  }

  function addListeners() {
    Reveal.addEventListener('slidechanged', _handleDisplayEvent);
    Reveal.addEventListener('fragmentshown', _handleDisplayEvent);
    Reveal.addEventListener('fragmenthidden', _handleDisplayEvent);
  }

  function _handleDisplayChanged(value, context) {
    Reveal.slide(value.h, value.v, value.f, ORIGIN_GO_REVEAL);
  }

  function initializeSharing() {
    slide = presentation.key('slide');
    slide.on('set', _handleDisplayChanged);
  }

  function connectToPlatform() {
    loadScript(PLATFORM_URL, function() {;

      platform = new goinstant.Platform(GO_REVEAL_APP_URL);
      platform.connect(function (err) {
        if (err) {
          throw err;
        }

        presentation = platform.room(roomName);
        presentation.join(function (err) {
          if (err) {
            throw err;
          }

          initializeSharing();
        });
      });
    });
  }

  function setRoomId() {
    var url = window.location.toString();
    var roomRegex = /\?.*\broom=([^&#\/]*)/;
    var hasRoom = roomRegex.exec(url);

    var roomId = hasRoom && hasRoom[1];
    if (roomId) {
      roomName = 'presentation' + roomId;
      return true;
    }

    var id = Math.floor(Math.random() * Math.pow(2, 32));
    var hashParts = url.split('#');
    var after = hashParts[1] ? '#' + hashParts[1] : '';
    window.location = hashParts[0] + '?room=' + id + after;

    return false;
  }

  function initialize(roomId) {
    if (setRoomId()) {
      addListeners();

      connectToPlatform();
    }
  }

  return {
    initialize: initialize
  };
})();

goreveal.initialize();
