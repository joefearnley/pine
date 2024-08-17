
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
        return this.getPlayers().find(player => {
            return parseInt(player.id) === parseInt(playerId);
        });
    },
    updatePlayerPlaying(playerId, isPlaying) {
        const players = this.getPlayers();
        const playerIndex = players.findIndex(player => parseInt(player.id) === parseInt(playerId));
        players[playerIndex].isPlaying = isPlaying;
        localStorage.setItem('pinedb-players', JSON.stringify(players));
    },
    setCurrentPlayerId(playerId) {
        this.currentPlayerId = playerId;
    },
    updatePlayer(playerId, name, number) {
        const players = this.getPlayers();
        const playerIndex = players.findIndex(player => {
            return parseInt(player.id) === parseInt(playerId)
        });

        players[playerIndex].name = name;
        players[playerIndex].number = number;

        localStorage.setItem('pinedb-players', JSON.stringify(players));
    },
    getCurrentPlayer() {
        return this.getPlayers().find(player => player.id === this.currentPlayerId);
    },
    removePlayer(playerId) {
        const remainingPlayers = this.getPlayers().filter(player => {
            return parseInt(player.id) !== parseInt(playerId)
        });

        localStorage.setItem('pinedb-players', JSON.stringify(remainingPlayers));
    }
};

export default playerDB;