var fs = require('fs')

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
      <div v-for="tab in tabs">
        <webview v-show="tab.isActive" v-bind:src="tab.url" style="display:inline-flex; width:100%; height:480px"></webview>

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
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name);
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
          <div v-for="tab in tabs">
            <h2 class="title is-3">{{tab.name}}</h2>
            <form class="control">
              <input class="input" type="text" placeholder="Username/Email" v-bind:name="tab.name + -Username"/>
              <input class="input" type="text" placeholder="Password" v-bind:name="tab.name + -Password"/>
              <button class="button is-primary"> Save</button>
            </form>
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
   fs.readFile('services.json', (err,data) => {
        var chatData = JSON.parse(data)
        for(var service in chatData){
            console.log(vm.$children)
            vm.$children[0].addTab(chatData[service])
            vm.$children[1].$children[0].$children[0].addSetting(chatData[service])
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
