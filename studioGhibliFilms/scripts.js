/*In order to display information on the front end of a site, we'll be working 
with the DOM, which is actually an API itself that allows JavaScript to communicate 
with HTML.
As well, we have to concider the requests dispatch to other sourse – sends to other 
domen (or even subdomen), or protocol, or port – requires the special headers from 
remote site. This policy is called CORS: Cross-Origin Resource Sharing (сумісне 
використання ресурсів між різними джерелами).*/

const app = document.getElementById('root'); // access a root 'div' as 'app' variable

const logo = document.createElement('img'); // create the image element
logo.src = 'logo.png'; // set the src attribute

const container = document.createElement('div'); // create another div-element - 'container'
container.setAttribute('class', 'container'); // set the 'class' attribute to 'container'

app.appendChild(logo); // to place logo into the website
app.appendChild(container); // to place container into the website

/*
1) use of XHR objects (XMLHttpRequest JavaScript ES5);
  XMLHttpRequest is used for three reasons:
    - For historical reasons: There is a lot of code that uses XMLHttpRequest that needs to be supported.
    - The need to support older browsers and the reluctance to use polyfills (for example, to reduce the amount of code).
    - The need for functionality that fetch does not currently provide, such as tracking the progress of a push to the server.
*/

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest(); // a HTTP request to retrieve the API endpoint

request.withCredentials = true; // to be able to make requests to other sites, you need to send cookies and HTTP authorization headers

// Open a new connection, using the GET request on the URL endpoint (or configure the request)
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true); // the request will be executed asynchronously

request.responseType = 'json'; // specify the expected response type

request.send(); // directly send request

// Listen to events on request to get a response
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(request.response); // to parse the response - convert that JSON in to JavaScript objects

  // HTTP response status message (string): usually 'OK' for 200, 'Not Found' for 404, 'Forbidden' for 403, and so on
  if (request.status >= 200 && request.status < 400) {
    data.forEach((movie) => {
      // Create a div with a card class
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // create an 'h1' and set the text content to the film's title
      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      // create a 'p' and set the text content to the film's description
      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300); // Limit to 300 chars
      p.textContent = `${movie.description}...`; // End with an ellipses

      // append the cards to the 'container' element
      container.appendChild(card);

      // each card will contain an 'h1' and a 'p'
      card.appendChild(h1); // append 'h1' to the 'card' element
      card.appendChild(p); // append 'p' to the 'card' element
    });
    console.log(`Done, got  ${request.response.length} bytes`); // 'response' - is the server's response
    // 'response' (may appear as 'responseText' in old code)
  } else {
    // HTTP status code (number): 200, 404, 403, 503, can be 0 and so on in case the error is not related to HTTP
    console.log(`Error ${request.status}: ${request.statusText}`);
  }
};

// occurs periodically during response loading, reports progress
request.onprogress = function (event) {
  // event.lengthComputable = true if the server sends a "Content-Length" header
  if (event.lengthComputable) {
    console.log(`Has gotten ${event.loaded} out of ${event.total} bites`);
  } else {
    console.log(`Has gotten ${event.loaded} bites`); // if there is no header in the server's response "Content-Length"
  }
};

// when a request cannot be completed, such as no connection or invalid URL
request.onerror = function () {
  // occurs only when the request fails at all
  alert('Connection error or invalid URL');
};

// 2) Alternatively, we can use the fetch API with JavaScript ES6(async/await)
/*
async function catchJson() {
  // fetch returns a promise, which is executed with an object of the built-in class 'Response' as the result
  let response = await fetch('https://ghibliapi.herokuapp.com/films');
  // if the HTTP status is in the range 200-299, we will get the response body
  let films = await response.json(); // method to access response body, this one - decodes the response in JSON format

  films.forEach((movie) => {
    // create a 'div' with a 'card' class
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    // create an 'h1' and set the text content to the film's title
    const h1 = document.createElement('h1');
    h1.textContent = movie.title;

    // create a 'p' and set the text content to the film's description
    const p = document.createElement('p');
    movie.description = movie.description.substring(0, 300); // limit to 300 chars
    p.textContent = `${movie.description}...`; // end with Ellipses

    // append the cards to the container element
    container.appendChild(card);

    // each card will contain an 'h1' and a 'p' element
    card.appendChild(h1);
    card.appendChild(p);
  });
}

catchJson();
*/
