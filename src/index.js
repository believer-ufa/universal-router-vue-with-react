import "regenerator-runtime/runtime.js"

import React from 'react'
import ReactDOM from 'react-dom'
import UniversalRouter from 'universal-router'

const routes = [
  {
    action: () => ({
      type: 'react',
      component: <h1>Home</h1>,
    })
  },
  {
    path: '/react',
    action: async ({ next }) => ({
      type: 'react',
      component: await next(),
    }),
    children: [
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
]

const router = new UniversalRouter(routes)

router.resolve(location.pathname).then(({ type, component }) => {

  switch (type) {
    case 'react':
      ReactDOM.render(component, document.getElementById('root'))
      break;
  }

})
