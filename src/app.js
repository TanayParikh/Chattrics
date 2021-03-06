var fs = require('fs');
var keytar = require('keytar');

var settings;
var tabIndex = 0;

Vue.component('tabs', {
  template: `
  <div>
    <div class="tabs is-fullwidth is-large">
      <ul>
        <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
          <a href="#" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>
    <div>
      <slot> </slot>
      <div v-for="(tab,index) in tabs">
        <webview v-bind:id="'view' + index" v-bind:src="tab.url" style="display:inline-flex; width:100%; height:100%"></webview>
      </div>
    </div>
  </div>
  `,

  data() {
    return { tabs: [] };
  },

  created() {
    this.tabs = this.$children
  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab,index) => {
        tab.isActive = (tab.name == selectedTab.name);
        if (tab.isActive) {
          var view = document.getElementById("view" + index);
          var width = window.innerWidth;
          var height = window.innerHeight - 220;

          view.parentNode.setAttribute('style',"width:" + width + "px ; height:" + height + "px");
          view.setAttribute('style',"display:inline-flex; width:" + width + "px ; height:" + height + "px");

          var js = 
            `document.getElementById("email").setAttribute("value","username");
             document.getElementById("pass").setAttribute("value","password");`;

          var username = settings[index-1].username;
          var password = settings[index-1].password;

          if (username) js = js.replace("username", username);
          if (password) js = js.replace("password", password);

          if (username && password) js += 'document.getElementById("loginbutton").click()';

          view.executeJavaScript(js);
          tabIndex = index;
        }
        else{
          var view = document.getElementById("view" + index);
          view.parentNode.setAttribute('style',"width:" + 0 + "px ; height:" + 0 + "px");
          view.setAttribute('style',"display:inline-flex; width:" + 0 + "px ; height:" + 0 + "px");
        }
      });


    }
  }
});

Vue.component('tab', {
  template: `
  <div v-show="isActive"><slot></slot></div>
  `,

  props: {
    name: { required: true },
    url: { required: true },
    selected: { default: false }
  },

  data() {
    return {
      isActive: false
    };
  },

  mounted() {
    this.isActive = this.selected;
  }
});


Vue.component('addtab', {
  template: `
  `,

  methods: {
    addTab(client){
      var newTab = { name: client.name, url: client.url, img: client.img, isActive: false}
      this.$parent.$children[1]._data.tabs.push(newTab);
    }
  }
});

Vue.component('settings',{
  template: `
      <div>

        <div class="section">
          <div v-for="(tab, objKey) in tabs">
            <div v-show="tab.type === 'userPass'">

            <div class="section">
              <h2 class="title is-3">{{tab.name}}</h2>

              <div class="columns">
                <div class="column">
                  <input class="input" type="text" placeholder="Username/Email" v-bind:value="tab.username" v-bind:id="'user' + objKey"/>
                </div>
                <div class="column">
                  <input class="input" type="Password" placeholder="Password" v-bind:value="tab.password" v-bind:id="'pass' + objKey"/>
                </div>
                <div class="column">
                  <button class="button is-primary" v-bind:onClick= "'setUserSettings(' + objKey +') '"> Save</button>
                </div>
              </div>
            </div>


            </div>
          </div>
        </div>
      </div>`,

  data(){
    return { tabs: [] };
  },

  methods: {
    addSetting(setting){
      this.$parent.$children[0]._data.tabs.push(setting);
    }
  }
});

window.onload = function(){
  fs.readFile(__dirname + '/../app/settings.json', (err,data) => {
    settings = JSON.parse(data);
    
    for(var i = 0; i < settings.length; ++i){
      var setting = settings[i];
      getUserPass(i).then(password => setting.password = password);
      vm.$children[1].$children[0].$children[0].addSetting(setting);
    }
  });

  fs.readFile(__dirname + '/../app/services.json', (err,data) => {
    var chatData = JSON.parse(data);

    for(var service in chatData){
      vm.$children[0].addTab(chatData[service]);
    }
  });
}


var vm = new Vue({
  el: '#root'
});

(function () {
  const remote = require('electron').remote;

  function init() {
    document.getElementById("min-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      window.minimize();
    });

    document.getElementById("max-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      window.isMaximized() ? window.unmaximize() : window.maximize();
    });

    document.getElementById("close-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      window.close();
    });
  };

  document.onreadystatechange = function () {
    if (document.readyState == "complete") init();
  };
})();


function setUserSettings(index){
  var userName = document.getElementById("user" + index).value;
  var password = document.getElementById("pass" + index).value;
  settings[index].username = userName;

  //Stores password in native keychain
  keytar.replacePassword('Chattrics', settings[index].name +':'+ userName, password);

  var toSave = JSON.stringify(settings);
  fs.writeFile(__dirname + '/../app/settings.json',toSave);
}

function getUserPass(index){
  var userName = settings[index].username;
  var accountName = settings[index].name +':'+ userName;
  var password = keytar.getPassword('Chattrics', accountName);

  return password;
}

window.onresize = function(e){
  var view = document.getElementsByTagName("webview")[tabIndex];
  var width = window.innerWidth;
  var height = window.innerHeight - 220;
  view.setAttribute('style',"display:inline-flex; width:" + width + "px ; height:" + height + "px");
}
