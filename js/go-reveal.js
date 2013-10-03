var goreveal = (function() {

  var GO_REVEAL_APP_URL = 'https://goinstant.net/elgordo/GoReveal';
  var PLATFORM_URL = 'https://cdn.goinstant.net/v1/platform.min.js';
  var ORIGIN_GO_REVEAL = 'goreveal';
  var GO_REVEAL_ID = 'go_reveal_room';
  var QUERY_REGEX = new RegExp('\\?(.*)\\b' + GO_REVEAL_ID + '=([^&#\/]*)(.*)');


  var platform;
  var roomName;
  var presentation;
  var slide;
  var query;


  function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
  }

  function _handleDocumentKeyDown(evt) {
    // Check for element that has focus
    var activeElement = document.activeElement;
    var hasFocus = !!(document.activeElement && (
      document.activeElement.type ||
      document.activeElement.href ||
      document.activeElement.contentEditable !== 'inherit'
    ));

    if (!hasFocus && event.keyCode === 71 && event.ctrlKey) {
      var parser = document.createElement('a');
      parser.href = window.location.toString();

      // if the query has changed then reload the page with the new query.
      if (parser.search) {
        parser.search += '&' + GO_REVEAL_ID + '=' + roomName;
      } else {
        parser.search = '?' + GO_REVEAL_ID + '=' + roomName;
      }

      alert('Your sharing URL is:\n\n' + parser.href);
    }

    return false;
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

    document.addEventListener('keydown', _handleDocumentKeyDown, false);
  }

  function _handleDisplayChanged(value, context) {
    Reveal.slide(value.h, value.v, value.f, ORIGIN_GO_REVEAL);
  }

  function _handleQueryChanged(value, context) {
    var parser = document.createElement('a');
    parser.href = window.location.toString();

    // if the query has changed then reload the page with the new query.
    if (value !== parser.search) {
      parser.search = value;
      window.location = parser.href;
    }
  }

  function initializeSharing() {
    slide = presentation.key('slide');
    slide.on('set', _handleDisplayChanged);

    query = presentation.key('query');
    query.on('set', _handleQueryChanged);

    // We are interested in knowing if there is a new query on the URL when the
    // slide show is loaded. This detects the use of the query parameter in the
    // default slide deck to change the transitions and themes.
    var parser = document.createElement('a');
    parser.href = window.location.toString();
    query.set(parser.search);

    // if the query has changed then reload the page with the new query.
    if (parser.search) {
      parser.search += '&' + GO_REVEAL_ID + '=' + roomName;
    } else {
      parser.search = '?' + GO_REVEAL_ID + '=' + roomName;
    }

    // Create Share Button
    var shareBtn = document.createElement('a');
    var cssBtn = 'display: block; position: fixed; bottom: 1em; left: 0; z-index: 9999; height: 17px; padding: 9px; font-size: 15px; font-family: sans-serif; font-weight: bold; background: white; border-radius: 0 3px 3px 0; border: 1px solid #ccc; text-decoration: none; color: #15A815;';
    var cssURL = 'font-weight: regular;';

    shareBtn.href = '#';
    shareBtn.innerHTML = 'Share';
    shareBtn.style.cssText = cssBtn;

    var reveal = document.getElementsByClassName(reveal);

    document.body.insertBefore(shareBtn, reveal);

    shareBtn.onmouseenter = function(){
      this.innerHTML += '<input id="gi-share-button" type="text" value="'+parser.href+'" style="margin: -5px 0 0 15px; padding: 5px; width: 180px;"/>';
      document.getElementById('gi-share-button').select();
      this.style.width = '250px';
    };
    shareBtn.onmouseleave = function(){
      this.innerHTML = 'Share';
      this.style.width = 'auto';
    };

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

  function setRoomName() {
    // if we have the go-reveal room in sessionStorage then just connect to
    // the room and continue with the initialization.
    roomName = sessionStorage.getItem(GO_REVEAL_ID);
    if (roomName) {
      return true;
    }

    // if we do not have the name in storage then check to see if the window
    // location contains a query string containing the id of the room.

    // creating an anchor tag and assigning the href to the window location
    // will automatically parse out the URL components ... sweet.
    var parser = document.createElement('a');
    parser.href = window.location.toString();

    var hasRoom = QUERY_REGEX.exec(parser.search);
    var roomId = hasRoom && hasRoom[2];
    if (roomId) {
      roomName = roomId.toString();
      // add the cookie to the document.
      sessionStorage.setItem(GO_REVEAL_ID, roomName);

      // regenerate the URI without the go-reveal query parameter and reload
      // the page with the new URI.
      var beforeRoom = hasRoom[1];
      if (beforeRoom[beforeRoom.length - 1] === '&') {
        beforeRoom = beforeRoom.slice(0, beforeRoom.lengh - 1);
      }
      var searchStr = beforeRoom + hasRoom[3];
      if (searchStr.length > 0) {
        searchStr = '?' + searchStr;
      }

      parser.search = searchStr;

      // set the new location and discontinue the initialization.
      window.location = parser.href;
      return false;
    }

    // there is no room to join for this presentation so simply create a new
    // room and set the cookie in case of future refreshes.
    var id = Math.floor(Math.random() * Math.pow(2, 32));
    roomName = id.toString();
    sessionStorage.setItem(GO_REVEAL_ID, roomName);

    return true;
  }

  function initialize() {
    if (setRoomName()) {
      addListeners();

      connectToPlatform();
    }
  }

  return {
    initialize: initialize
  };
})();

goreveal.initialize();
