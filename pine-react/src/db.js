
const playerDB = {
    currentPlayerId: 0,
    players: [],
    loadPlayers() {
        this.players = JSON.parse(localStorage.getItem('pinedb-players')) || [];  
    },
    getPlayers() {
        return JSON.parse(localStorage.getItem('pinedb-players')) || [];        
    },
    getPlayer(playerId) {
        let player = this.getPlayers().find(player => {
            console.log(parseInt(player.id) === parseInt(playerId));
            return parseInt(player.id) === parseInt(playerId);
        });

        // console.log(player);

        return player;
    },
    updatePlayerPlaying(playerId, isPlaying) {
        const playerIndex = this.getPlayers().findIndex(player => parseInt(player.id) === parseInt(playerId));
        players[playerIndex].isPlaying = isPlaying;
        localStorage.setItem('pinedb-players', JSON.stringify(state.players));
    },
    setCurrentPlayerId(playerId) {
        this.currentPlayerId = playerId;
    },
    getCurrentPlayer() {
        return this.getPlayers().find(player => player.id === this.currentPlayerId);
    },
};

export default playerDB;