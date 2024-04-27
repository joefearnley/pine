import './style.css'
import { players } from './data/players.js'
import Sortable, { MultiDrag, Swap } from 'sortablejs';

Sortable.mount(new MultiDrag(), new Swap());

const playingList = players
    .filter(player => player.isPlaying)
    .map(player => {
    return `<li>${player.name}</li>`;
}).join('');

const playersOnBenchList = players
    .filter(player => !player.isPlaying)
    .map(player => {
    return `<li data-id="${player.id}">${player.name}</li>`;
}).join('');

document.querySelector('#app').innerHTML = `
    <div>
        <h2>Players Playing</h2>
        <ul id="players-playing" class="players">
            ${playingList}
        </ul>

        <h2>Players on Bench</h2>
        <ul id="players-on-bench" class="players">
            ${playersOnBenchList}
        </ul>
    </div>
`;

var playersPlayingListEl = document.getElementById('players-playing');
var playersOnBenchListEl = document.getElementById('players-on-bench');

Sortable.create(playersPlayingListEl, {
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
  
Sortable.create(playersOnBenchListEl, {
    group: 'shared',
    multiDrag: true,
    selectedClass: "selected",
    animation: 150,
    onAdd: function (evt) {
        console.log('adding player to bench......');
        console.log(evt.item.innerHTML);
    },

});
