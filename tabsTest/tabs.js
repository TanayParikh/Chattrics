const TabGroup = require("electron-tabs")


function init(){
    tabGroup = new TabGroup()
    let testTab = tabGroup.addTab({
        title: "test",
        src: "http://google.ca",
        visible: true
    })
}