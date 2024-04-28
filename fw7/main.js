import Framework7 from 'framework7/bundle';

import Sortable, { MultiDrag, Swap } from 'sortablejs';
import Roster from './roster.js';

Sortable.mount(new MultiDrag(), new Swap());

let playersOnFieldHtml = `<li class="list-group-title">Field</li>`;
playersOnFieldHtml += Roster.getPlayersOnField().map(player => {
    return `
      <li class="item-content" data-id="${player.id}">
        <div class="item-inner">
            <div class="item-title">
            ${player.name}
            </div>
        </div>
      </li>`;
}).join('');

let playersOnBenchHtml = `<li class="list-group-title">Bench</li>`;
playersOnBenchHtml += Roster.getPlayersOnBench().map(player => {
    return `
      <li class="item-content" data-id="${player.id}">
        <div class="item-inner">
            <div class="item-title">
            ${player.name}
            </div>
        </div>
    </li>`;
}).join('');

var app = new Framework7({
  el: '#app',
  name: 'Pine',
  panel: {
    swipe: true,
  },
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ],
});


const playersOnFieldtEl = document.getElementById('players-on-field');
const playersOnBenchtEl = document.getElementById('players-on-bench');

playersOnFieldtEl.innerHTML = `${playersOnFieldHtml}`;
playersOnBenchtEl.innerHTML = `${playersOnBenchHtml}`;

Sortable.create(playersOnFieldtEl, {
  group: 'shared',
  multiDrag: true,
  selectedClass: "selected",
  animation: 150,
  onAdd: function (evt) {
      const playerId = parseInt(evt.item.dataset.id);
      Roster.movePlayerToField(playerId);
  },
});

Sortable.create(playersOnBenchtEl, {
  group: 'shared',
  multiDrag: true,
  selectedClass: "selected",
  animation: 150,
  onAdd: function (evt) {
      const playerId = parseInt(evt.item.dataset.id);
      Roster.movePlayerToBench(playerId);
  },
});

