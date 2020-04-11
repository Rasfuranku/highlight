// Put all the javascript code here, that you want to execute after page load.
// console.log("Aasdfasf");
// function printing(grettings) {
//     document.getElementById('myHeading').style.color = 'black'
//     alert(grettings);
//     console.log("Action");
//     console.log(grettings);
// };
// function reportExecuteScriptError(error) {
//     console.log(error);
// }
// function startContent() {
//     let selectedText = '';
    
//     if (window.getSelection) {
//         console.log(0);
//         selectedText = window.getSelection();
//         console.log(selectedText);
//     }
//     if (document.getSelection) {
//         console.log(1);
//         selectedText = document.getSelection();
//     }
    
//     console.log(selectedText.toString());
// }
// startContent();

window.addEventListener("click", notifyExtension);

function notifyExtension(e) {
  if (e.target.tagName != "A") {
    return;
  }
  browser.runtime.sendMessage({"url": e.target.href});
}