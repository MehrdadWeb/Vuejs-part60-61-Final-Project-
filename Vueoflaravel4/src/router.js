import { createRouter, createWebHistory } from 'vue-router'; // from node_modules(folder)
import Home from './pages/Home.vue';
// Article
import TemplateArticle from './pages/articles/Template.vue';
import IndexArticle from './pages/articles/Index.vue';
import ShowArticle from './pages/articles/Show.vue';
import CreateArticle from './pages/articles/Create.vue';
import EditArticle from './pages/articles/Edit.vue';
// User
import TemplateUser from './pages/users/Template.vue';
import IndexUser from './pages/users/Index.vue';
import ShowUser from './pages/users/Show.vue';
// Post
import TemplatePost from './pages/posts/Template.vue';
import IndexPost from './pages/posts/Index.vue';
import ShowPost from './pages/posts/Show.vue';
import CreatePost from './pages/posts/Create.vue';
import EditPost from './pages/posts/Edit.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    {
        path: '/articles',
        name: 'articleTemplate',
        component: TemplateArticle,
        children: [
            { path: '', name: 'articles', component: IndexArticle },
            { path: ':id', name: 'articleId', component: ShowArticle },
            { path: 'create', name: 'createArticle', component: CreateArticle }, // /posts/create
            { path: 'edit/:id', name: 'editArticle', component: EditArticle }, // /posts/edit/:id
        ]
    },
    {
        path: '/users',
        name: 'userTemplate',
        component: TemplateUser,
        children: [
            { path: '', name: 'users', component: IndexUser }, // /users
            { path: ':id', name: 'userId', component: ShowUser } // /users/:id => :id is a param
        ]
    },
    {
        path: '/posts',
        name: 'postTemplate',
        component: TemplatePost,
        children: [
            { path: '', name: 'posts', component: IndexPost }, // /posts
            { path: ':id', name: 'postId', component: ShowPost }, // /posts/:id => :id is a param
            { path: 'create', name: 'createPost', component: CreatePost }, // /posts/create
            { path: 'edit/:id', name: 'editPost', component: EditPost }, // /posts/edit/:id
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

/**
const routes = [
    { path: '/', name: 'home', component: Home },
    {
        path: '/users', name: 'userTemplate', component: TemplateUser, children: [
            { path: '', name: 'users', component: IndexUser },
            { path: ':id', name: 'userId', component: ShowUser } => path: '/users/:id' & :id is a param , http://192.168.1.100:8080/users/3 & http://192.168.1.100:8080/users/?name=ali&lastname=sheikh & http://192.168.1.100:8080/users/?name=ali&lastname=sheikh#3
        ]
    },
    {
        path: '/posts', name: 'postTemplate', component: TemplatePost, children: [
            { path: '', name: 'posts', component: IndexPost },
            { path: ':id', name: 'postId', component: ShowPost },
            { path: 'create', name: 'createPost', component: CreatePost }
        ]
    }
];	
    <!--<h2>1.{{ title }}</h2>
    <h2>2.{{ route.params}}</h2>	// => http://192.168.1.100:8080/users/3 => route.params == { "id" : "3" }
    <h2>3.{{ route.params.id }}</h2> 
    <h2>2.{{ route.params.id }} , {{ route.params.name }}</h2>
    <h2>5.{{ route.query}}</h2>
    <h2>6.{{ route.query.name }} {{ route.query.lastname }}</h2>
    <h2>7.{{ route.hash }} </h2>-->
*/