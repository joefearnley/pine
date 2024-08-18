
const teamDB = {
    name: '',
    getTeam() {
        return JSON.parse(localStorage.getItem('pinedb-team')) || [];
    },
    updateTeam(name) {
        const team = {
            name
        };

        localStorage.setItem('pinedb-team', JSON.stringify(team));
    }
};

const playerDB = {
    currentPlayerId: 0,
    players: [],
    getNextId() {
        const sortedPlayers = this.getPlayers().sort((a, b) => a.id - b.id);
        const nextId = sortedPlayers.pop().id;
        return parseInt(nextId) + 1;
    },
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
        players[playerIndex].number = parseInt(number);

        localStorage.setItem('pinedb-players', JSON.stringify(players));
    },
    getCurrentPlayer() {
        return this.getPlayers().find(player => player.id === this.currentPlayerId);
    },
    addPlayer(name, number) {
        const player = {
            id: this.getNextId(),
            name,
            number
        };

        const players = this.getPlayers();

        players.push(player);

        localStorage.setItem('pinedb-players', JSON.stringify(players));
    },
    removePlayer(playerId) {
        const remainingPlayers = this.getPlayers().filter(player => {
            return parseInt(player.id) !== parseInt(playerId)
        });

        localStorage.setItem('pinedb-players', JSON.stringify(remainingPlayers));
    },
    playersPlaying() {
        return this.getPlayers().filter(player => player.isPlaying);
    },
    playersOnBench() {
        return this.getPlayers().filter(player => !player.isPlaying);
    },
};

export { teamDB, playerDB };