const TabGroup = require("electron-tabs")
var fs = require('fs')

var chatData;
var currentChat;

function addTab(){
    tabGroup = new TabGroup()
    let testTab = tabGroup.addTab({
        title: "test",
        visible: true,
        webviewAttributes: {
            partition: "persist:google"
        }
    })
}

function addIframe(url){
    var newDiv = document.getElementById("frames")
    var li = document.createElement('li')
    li.setAttribute("style", "position: absolute; list-style-type: none;")
    var newWebview = document.createElement('webview')
    newWebview.setAttribute("src", url)
    newWebview.setAttribute("style", "display:inline-flex; width:640px; height:480px")
    li.appendChild(newWebview)
    newDiv.appendChild(li)
    return newWebview
}

window.onload = function(){
    fs.readFile('test.json', (err,data) =>{
        chatData = JSON.parse(data)
        for(var service in chatData){
            var webView = addIframe(chatData[service].url)
            currentChat = service
            webView.addEventListener('dom-ready', (e) =>{
                var js = 'document.getElementById("pass").addEventListener("click", (e)=>{console.log("click")})' 
                webView.executeJavaScript(js)
                webView.openDevTools()
                
            })
            
        }
    });
}



window.onfocus = function(e){
    e
}

window.onkeydown = function(e){
}