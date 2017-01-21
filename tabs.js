const TabGroup = require("electron-tabs")

function initPage (){
    let tabGroup = new TabGroup();
    let messenger = tabGroup.addTab({
        title: "Messanger",
        src: "https://www.messenger.com/login.php",
        visible: true,
        webviewAttributes: {
            partition: "persist:facebook"
        }
    });
    let messangerView = messenger.webview;
    messangerView.addEventListener('did-finish-load', onDomLoad());
    let whatsApp = tabGroup.addTab({
        title: "Whats App",
        src: "https://web.whatsapp.com/",
        visible: true,
    });
    let hangouts = tabGroup.addTab({
        title: "Hangouts",
        src: "https://accounts.google.com/ServiceLogin?service=talk&passive=1209600&continue=https://hangouts.google.com/&followup=https://hangouts.google.com/#identifierl",
        visible: true
    })
}

function onDomLoad(){
    console.log("Loaded")
}