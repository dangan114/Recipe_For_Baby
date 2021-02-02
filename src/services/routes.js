import Home from 'src/components/Home'
import HelloWorld from 'src/components/HelloWorld'
import Login from 'src/components/Login'
import Questions from 'src/components/Questions'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/hello-world', name: 'Hello World', component: HelloWorld },
    { path: '/login', name: 'Login', component: Login },
    { path: '/questions', name: 'Questions', component: Questions }
]

export default routes