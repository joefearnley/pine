import './style.css'
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import Roster from './roster.js';

Sortable.mount(new MultiDrag(), new Swap());

const playersOnFieldHtml = Roster.getPlayersOnField().map(player => {
    return `<li data-id="${player.id}">${player.name}</li>`;
}).join('');

const playersOnBenchHtml = Roster.getPlayersOnBench().map(player => {
    return `<li data-id="${player.id}">${player.name}</li>`;
}).join('');

document.querySelector('#app').innerHTML = `
    <h1 class="app-title">Pine</h1>
    <div>
        <h2>Players Playing</h2>
        <ul id="players-on-field" class="players">
            ${playersOnFieldHtml}
        </ul>

        <h2>Players on Bench</h2>
        <ul id="players-on-bench" class="players">
            ${playersOnBenchHtml}
        </ul>
    </div>
`;

const playersOnFieldtEl = document.getElementById('players-on-field');
const playersOnBenchtEl = document.getElementById('players-on-bench');

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
