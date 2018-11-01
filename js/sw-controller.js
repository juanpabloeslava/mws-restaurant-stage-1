/* 
Off line usage: service workers
*/

// 1 - check if the browser supports service browsers
if (navigator.serviceWorker) {
    // if so, register it
    navigator.serviceWorker.register('./sw.js') // --> this returns a promise
    // it worked
    .then( function (registration) {
        console.log('THIS Service worker registration succeeded:', registration);
    })
    // if the registration fails, catch it
    .catch (function (error) {
        console.log (`There was an error. This one: ${error}`);
    });
} else {
    console.log ("The browser doesn't support Service Workers");
}