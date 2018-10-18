function getCities() {
    console.log('prolaz 1');
    fetch(`https://api.meetup.com/2/cities/?offset=0&format=json&page=500&radius=50&order=size&desc=false&sig_id=215516831&sig=334e0d89ab45bcd4b0127e3d90276321faea8eae`)
    .then(result => {
        // console.log(result);
        console.log('prolaz 2');
        return result.json();
    })
    .then(data => {
        // console.log(data);
        // const today = data.consolidated_weather[0];
        // console.log(`Temperatures today in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`);
        console.log(data);
    })
    .catch(error => console.log(error));
}

 getCities();

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }
  
  // Helper method to parse the title tag from the response.
  function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
  }
  
  // Make the actual CORS request.
  function makeCorsRequest() {
    // This is a sample server that supports CORS.
    console.log("ovde");
    var url = 'https://secure.meetup.com/oauth2/authorize?client_id=29455e37783a2760454c3a57667d656f&response_type=token';
    console.log("ovde 2");
    var xhr = createCORSRequest('GET', url);
    console.log("ovde 3");
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
    console.log("ovde 4");
    // Response handlers.
    xhr.onload = function() {
        console.log(xhr);
      var text = xhr.responseText;
      var title = getTitle(text);
      alert('Response from CORS request to ' + url + ': ' + title);
    };
    console.log(xhr);
    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };
    console.log("ovde 6");
    xhr.send();
    console.log("ovde 7");
  }

 // makeCorsRequest();

// user: bgmirko
// key: u0art5uk5q8a8uhtpk20j6v01s
// secret: rau9huqsshc5mf03d747c359d3