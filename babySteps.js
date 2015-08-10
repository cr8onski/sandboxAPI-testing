console.log("What's up!!!");

//see https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
//Step 1 - I am ignoring the if statement to comply with older browsers
//since I am working with the VWSandbox
// I can put a test(if) in and log an error message
var xhr;
// if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
// } else {
//     console.log("Sorry, you're browser is too old.");
//     return;
// }
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        console.log(xhr.statusText+"\n"+xhr.responseText);
    }
};
xhr.open("GET", "localhost:3000/adl/sandbox/vwfdatamanager.svc/profiles/");
xhr.send();
console.log("This is the end.");
