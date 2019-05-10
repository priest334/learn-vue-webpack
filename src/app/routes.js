
import first from '@/first/index.vue'
import second from '@/second/index.vue'


export default {
    routes: [
        {
            path: '/first',
            name: 'first',
            component: first
        },
        {
            path: '/second',
            name: 'second',
            component: second
        }
    ]    
};