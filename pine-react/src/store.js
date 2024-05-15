// First import createStore function from Framework7 core
import { createStore } from 'framework7/lite';

const store = createStore({
    state: {
        loading: false,
        players: [],
    },
    actions: {
        getPlayers({ state }) {
            state.loading = true;

            fetch('./data/players.json')
                .then((res) => res.json())
                .then((players) => {
                    state.players = players;
                    state.loading = false;
                });
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
