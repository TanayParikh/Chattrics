const TabGroup = require("electron-tabs")

function initPage (){
    let tabGroup = new TabGroup();
    let tab = tabGroup.addTab({
        title: "Test",
        src: "http://github.com",
        visible: true
    });
}