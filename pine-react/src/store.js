// First import createStore function from Framework7 core
import { createStore } from 'framework7/lite';
import { LowSync } from 'lowdb';
import { LocalStorage } from 'lowdb/browser';

const defaultData = {
    teams: [],
    players: [],
};

const pineDB = new LowSync(new LocalStorage('pine_db'), defaultData);

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
