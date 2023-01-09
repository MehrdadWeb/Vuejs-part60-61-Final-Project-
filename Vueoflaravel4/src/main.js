import { createApp } from 'vue' // vue from node_modules,به صورت پکیج نصب میشود vue,node_modules(folder) => vue(folder)
import App from './App.vue' // App.vue is single file component & is the Parent of all components & .vue is the postfix for components
import router from './router.js' // router.js is like web.php or app.php in laravel & router is an extension or plugin
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css' // <= https://getbootstrap.com/docs/5.1/getting-started/webpack/

const app = createApp(App) //app is |a js Object|an instance(object) of Vue class|a component & the First component in the Client browser is App
app.use(router)
app.mount('#app')
    /* 
    ^App.vue => <!-- The <script></script> is BackEnd of Front,The <style></style> & The <template></template> --> is FrontEnd of Front
    ^App.vue => setup(),components:,props:,ref(),reactive(),provide(),inject(),onMounted()
    ^App.vue =>
				export default {
				    components: {
						Home //Home:Home //Local Register
					},
					setup() {
                        props:,ref(),reactive(),provide(),inject(),onMounted() return{}
                        import { ref, reactive,provide,inject,onMounted} from "vue";
                        import { createRouter, createWebHistory } from 'vue-router' //from node_modules(folder)
                        import { useRouter,useRoute } from "vue-router";	
                        =>useRoute()=>info of current route اطلاعات مسیر جاری =>useRoute().params & useRoute().query & useRoute().hash
                        =>useRouter()=>is a jsObject,switch between routes جابجایی بین مسیرها =>useRouter().push('')
                        
                    }
				}

    */