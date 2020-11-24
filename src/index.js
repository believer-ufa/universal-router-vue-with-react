import "regenerator-runtime/runtime.js"

import React from 'react'
import ReactDOM from 'react-dom'
import UniversalRouter from 'universal-router'

import Vue from 'vue'

import vueApp from './vue/vueApp'

const routes = [
  {
    path: '/react',
    action: async ({ next }) => ({
      type: 'react',
      component: await next(),
    }),
    children: [
      {
        action: () => <h1>React App</h1>,
      },
      {
        path: '/posts',
        children: [
          {
            action: () => <h1>Posts</h1>,
          },
          {
            path: '/:id',
            action: (context) => <h1>Post #{context.params.id}</h1>
          }
        ]
      }
    ],
  },
  {
    path: '/vue',
    action: async ({ next }) => ({
      type: 'vue',
      component: await next(),
    }),
    children: [
      {
        action: () => {
          return vueApp
        }
      },
    ],
  },
]

const router = new UniversalRouter(routes)

router.resolve(location.pathname).then(({ type, component }) => {

  switch (type) {
    case 'react':
      ReactDOM.render(component, document.getElementById('root'))
      break
    case 'vue':
      new Vue({
        el: '#root',
        render: h => h(component)
      })
      break
  }

})
