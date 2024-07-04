// First import createStore function from Framework7 core
import { createStore } from 'framework7/lite';
import { LowSync } from 'lowdb';
import { LocalStorage } from 'lowdb/browser';

const defaultData = {
    teams: [
        {
            "name": 'Team 1'
        }
    ],
    players: [
        {
            "id": 0,
            "name": "Asher",
            "number": 13,
            "isPlaying": true
        },
        {
            "id": 1,
            "name": "Bode",
            "number": 12,
            "isPlaying": true
        },
        {
            "id": 2,
            "name": "Deezhon",
            "number": 45,
            "isPlaying": true
        },
        {
            "id": 3,
            "name": "Ewan",
            "number": 22,
            "isPlaying": true
        },
        {
            "id": 4,
            "name": "Harrison",
            "isPlaying": true
        },
        {
            "id": 5,
            "name": "JahReekis",
            "isPlaying": true
        },
        {
            "id": 6,
            "name": "Jayce",
            "isPlaying": false
        },
        {
            "id": 7,
            "name": "Jase",
            "isPlaying": true
        }
    ],
};

const pineDB = new LowSync(new LocalStorage('pine_db'), defaultData);
pineDB.write()

const store = createStore({
    state: {
        loading: false,
        players: [],
    },
    actions: {
        getPlayers({ state }) {
            state.loading = true;

            pineDB.read();

            state.players = pineDB.data.players;
            state.loading = false;
        },
    },
    getters: {
        loading: ({ state }) => state.loading,
        players: ({ state }) => state.players,
        playersPlaying: ({ state }) => state.players.filter(player => player.isPlaying),
        playersOnBench: ({ state }) => state.players.filter(player => !player.isPlaying),
    }
});

export default store;
