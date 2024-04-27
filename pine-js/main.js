import './style.css'
import { players } from './data/players.js'
import Sortable, { MultiDrag, Swap } from 'sortablejs';

Sortable.mount(new MultiDrag(), new Swap());

const playersOnField = players
    .filter(player => player.isPlaying)
    .map(player => {
    return `<li>${player.name}</li>`;
}).join('');

const playersOnBench = players
    .filter(player => !player.isPlaying)
    .map(player => {
    return `<li data-id="${player.id}">${player.name}</li>`;
}).join('');

document.querySelector('#app').innerHTML = `
    <h1 class="app-title">Pine</h1>
    <div>
        <h2>Players Playing</h2>
        <ul id="players-on-field" class="players">
            ${playersOnField}
        </ul>

        <h2>Players on Bench</h2>
        <ul id="players-on-bench" class="players">
            ${playersOnBench}
        </ul>
    </div>
`;

var playersOnFieldtEl = document.getElementById('players-on-field');
var playersOnBenchtEl = document.getElementById('players-on-bench');

Sortable.create(playersOnFieldtEl, {
    group: 'shared',
    multiDrag: true,
    selectedClass: "selected",
    animation: 150,

    // Element is dropped into the list from another list
    onAdd: function (evt) {
        console.log('adding player to field......');
        console.log(evt.item.innerHTML);
    },
    // Changed sorting within list
    // onUpdate: function (/**Event*/evt) {
    //     console.log('updating. item...');
    //     console.log(evt);
    // },
});
  
Sortable.create(playersOnBenchtEl, {
    group: 'shared',
    multiDrag: true,
    selectedClass: "selected",
    animation: 150,
    onAdd: function (evt) {
        console.log('adding player to bench......');
        console.log(evt.item.innerHTML);
    },

});
