const Vue = require("vue");
const VueRouter = require("vue-router");
Vue.use(VueRouter);

const App = Vue.extend(require("./App.vue"));

const Fetch = require("./utilities/Fetch");

// Stores

// Components

Vue.component("board"               , require("./components/Board.vue"));
Vue.component("board-component"     , require("./components/BoardComponent.vue"));

// Interfaces

Vue.component("initiative"          , require("./components/Interface/Initiative.vue"));
Vue.component("file-dialog"         , require("./components/Interface/FileDialog.vue"));
Vue.component("music-player"        , require("./components/Interface/MusicPlayer.vue"));
Vue.component("chat-panel"          , require("./components/Interface/ChatPanel.vue"));
Vue.component("charactor-detail"    , require("./components/Interface/CharactorDetail.vue"));
Vue.component("component-infomation", require("./components/Interface/ComponentInfomation.vue"));

// Pages

const Welcomes = {
	index: require("./pages/welcomes/index.vue")
};

// Routing

const routes = [
	{
		path: "/",
		component: Welcomes["index"]
	}
];

const router = new VueRouter({
	routes: routes
});

const app = new Vue({
	el: "#app",
	render: h => h(App),
	router
});
