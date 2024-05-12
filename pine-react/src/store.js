// First import createStore function from Framework7 core
import { createStore } from 'framework7/lite';
import rosteredPlayers from './data/players.json';

const store = createStore({
    state: {
        players: [],
    },
    actions: {
        getPlayers({ state }) {
            console.log(rosteredPlayers);
            state.players = rosteredPlayers;
        },
    },
    getters: {
        players({ state }) {
            return state.players;
        },
        playersPlaying: ({ state }) => {
            return state.players.filter(player => player.isPlaying);
        },
        playersOnBench: ({ state }) => {
            return state.players.filter(player => !player.isPlaying);
        }
    }
});

export default store;
