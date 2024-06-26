// First import createStore function from Framework7 core
import { createStore } from 'framework7/lite';
import { LocalStorage } from 'lowdb/browser'

const pineDB = new LowSync(new LocalStorage('pine_db   '), {})

pineDB.data = {
    teams: [],
    players: [],
}
db.write();

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
        loading: ({ state }) => state.loading,
        players: ({ state }) => state.players,
        playersPlaying: ({ state }) => state.players.filter(player => player.isPlaying),
        playersOnBench: ({ state }) => state.players.filter(player => !player.isPlaying),
    }
});

export default store;
