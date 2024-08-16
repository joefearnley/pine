import { createStore } from 'framework7/lite';

const store = createStore({
    state: {
        loading: false,
        team: {},
        players: [],
        currentPlayerId: 0,
    },
    actions: {
        loadPlayers({ state }) {
            state.loading = true;

            state.team = JSON.parse(localStorage.getItem('pinedb-team')) || {};
            state.players = JSON.parse(localStorage.getItem('pinedb-players')) || [];

            state.loading = false;
        },
        updatePlayerPlaying({ state }, { playerId, isPlaying }) {
            let playerIndex = state.players.findIndex(player => parseInt(player.id) === parseInt(playerId));
            state.players[playerIndex].isPlaying = isPlaying;
            localStorage.setItem('pinedb-players', JSON.stringify(state.players));
        },
        setCurrentPlayerId({ state }, { playerId }) {
            state.currentPlayerId = playerId;
        },
    },
    getters: {
        loading: ({ state }) => state.loading,
        team: ({ state }) => state.team,
        players: ({ state }) => state.players,
        playersPlaying: ({ state }) => state.players.filter(player => player.isPlaying),
        playersOnBench: ({ state }) => state.players.filter(player => !player.isPlaying),
        currentPlayer: ({ state }) => state.players.find(player => player.id === state.currentPlayerId),
    }
});

export default store;
