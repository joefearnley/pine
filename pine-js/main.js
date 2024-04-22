// import './style.css'
// import Sortable from 'sortablejs';

import Framework7 from 'framework7';
import 'framework7/css/framework7.bundle.css';

// document.querySelector('#app').innerHTML = `
// <ul id="items">
// 	<li>item 1</li>
// 	<li>item 2</li>
// 	<li>item 3</li>
// </ul>
// `;

// var el = document.getElementById('items');
// var sortable = Sortable.create(el);


var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'My App',
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ],
  // ... other parameters
});
