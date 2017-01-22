Vue.component('tabs', {
  template: `
  <div>
    <div class="tabs">
      <ul>
        <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
          <a href="#" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
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
        console.log(tab.name)
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
  <button @click='addTab("newTab","http://github.com")'>Add a new tab</button>
  `,

  methods: {
    addTab(name, url){
        var container = document.getElementById("root");
        var newTab = document.createElement('tab');
        newTab.setAttribute("name","vool");

        var para = document.createElement("h1");
        var node = document.createTextNode("This is new.");
        para.appendChild(node);


        newTab.appendChild(para);

        var newWebview = document.createElement('webview');
        newWebview.setAttribute("src", url);
        newWebview.setAttribute("style", "display:inline-flex; width:640px; height:480px");
        // newTab = '<tab name="vool" :selected="true"><h1>This is new.</h1></tab>';
        console.log(newTab);
        var newTab = { name: "Tester2"}
        this.$parent.$children[1]._data.tabs.push(newTab);
    }
  }
});


var vm = new Vue({
  el: '#root'
});
