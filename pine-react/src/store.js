// First import createStore function from Framework7 core
import { createStore } from 'framework7/lite';

const store = createStore({
    state: {
        players: [],
    },
    actions: {
        getPlayers({ state }) {
            fetch('./data/players.json')
                .then((res) => res.json())
                .then((players) => {
                    console.log(players);
                    // state.players = players;
                });
        },
    },
    getters: {
        players({ state }) {
            return state.players;
        }
    }
});

export default store;
