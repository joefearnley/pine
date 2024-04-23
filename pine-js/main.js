// import './style.css'
// import Sortable from 'sortablejs';

import Framework7 from 'framework7/bundle';

// document.querySelector('#app').innerHTML = `
// <ul id="items">
// 	<li>item 1</li>
// 	<li>item 2</li>
// 	<li>item 3</li>
// </ul>
// `;

// var el = document.getElementById('items');
// var sortable = Sortable.create(el);


const app = new Framework7({
    el: '#app',
    name: 'Pint',
    panel: {
        swipe: true,
    },
    routes: [
        {
            path: '/roster/',
            url: 'pages/roster.html',
        },
    ],
});
