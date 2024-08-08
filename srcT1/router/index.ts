import { createRouter, createWebHistory } from 'vue-router'
import PassengerListView from '@/views/PassengerListView.vue'
import AboutView from '@/views/Aboutview.vue'
import PassengerDetailView from '@/views/passenger/DetailView.vue'
import PassengerRegisterView from '@/views/passenger/RegisterView.vue'
import PassengerEditView from '@/views/passenger/EditView.vue'
import PassengerLayoutView from '@/views/passenger/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import nProgress from 'nprogress'
import PassengerService from '@/Services/PassengerServices'
import { usePassengerStore } from '@/stores/passenger'
import type { Passenger } from '@/types'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger-list-view',
      component: PassengerListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/passenger/:_id',
      name: 'passenger-layout-view',
      component: PassengerLayoutView,
      props: true,
      beforeEnter: (to) => {
        const _id = to.params._id as string
        const passsengerStore = usePassengerStore()
        return PassengerService.getPassenger(_id)
          .then((response: { data: Passenger }) => {
            passsengerStore.setPassenger(response.data)
          })
          .catch((error: { response: { status: number } }) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'passenger' }
              }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'passenger-detail-view',
          component: PassengerDetailView,
          props: true
        },
        {
          path: 'register',
          name: 'passenger-register-view',
          component: PassengerRegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'passenger-edit-view',
          component: PassengerEditView,
          props: true
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
