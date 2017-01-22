var fs = require('fs')

var settings

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
        <webview  v-show="tab.isActive" v-bind:id="'view' + index" v-bind:src="tab.url" style="display:inline-flex; width:100%; height:480px"></webview>

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
        if(tab.isActive){
         var view = document.getElementById("view" + index)
         var js = 'document.getElementById("email").setAttribute("value","username");document.getElementById("pass").setAttribute("value","password"); document.getElementById("loginbutton").click()'
         js = js.replace("username", settings[index-1].username)
         js = js.replace("password", settings[index-1].password)
         
         view.executeJavaScript(js)
         view.openDevTools()
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
    url: {required: true},
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
        console.log(newTab)
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
            <h2 class="title is-3">{{tab.name}}</h2>
              <input class="input" type="text" placeholder="Username/Email" v-bind:value="tab.username" v-bind:id="'user' + objKey"/>
              <input class="input" type="Password" placeholder="Password" v-bind:value="tab.password" v-bind:id="'pass' + objKey"/>
              <button class="button is-primary" v-bind:onClick= "'setUserSettings(' + objKey +') '"> Save</button>
            </div>
          </div>
        </div>
      </div>`,

  data(){
    return {tabs: []};
  },
  methods: {
    addSetting(setting){
      this.$parent.$children[0]._data.tabs.push(setting);
    }
  }
});

window.onload = function(){

  fs.readFile('settings.json', (err,data) => {
        settings = JSON.parse(data)
        for(var setting in settings){
          vm.$children[1].$children[0].$children[0].addSetting(settings[setting])
        }
    })

  
   fs.readFile('services.json', (err,data) => {
        var chatData = JSON.parse(data)
        for(var service in chatData){
            console.log(vm.$children)
            vm.$children[0].addTab(chatData[service])
            
        }
    })

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
          if (!window.isMaximized()) {
            window.maximize();
          } else {
            window.unmaximize();
          }
        });

        document.getElementById("close-btn").addEventListener("click", function (e) {
          const window = remote.getCurrentWindow();
          window.close();
        });
      };

      document.onreadystatechange = function () {
        if (document.readyState == "complete") {
          init();
        }
      };
})();


function setUserSettings(index){
  var userName = document.getElementById("user" + index).value
  var password = document.getElementById("pass" + index).value
  settings[index].username = userName
  settings[index].password = password
  var toSave = JSON.stringify(settings)
  fs.writeFile("settings.json",toSave)
}
