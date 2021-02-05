import Home from 'src/components/Home'
import HelloWorld from 'src/components/HelloWorld'
import Login from 'src/components/Login'
import Questions from 'src/components/Questions'
import Recipe from 'src/components/Recipe'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/hello-world', name: 'Hello World', component: HelloWorld },
    { path: '/login', name: 'Login', component: Login },
    { path: '/questions', name: 'Questions', component: Questions }, 
    { path: '/recipe/:id', name: 'Recipe', component: Recipe }
]

export default routes