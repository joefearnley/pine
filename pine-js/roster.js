import { LowSync } from 'lowdb';
import { LocalStorage } from 'lowdb/browser';
import { players } from './data/players.js'

const lowDb = new LowSync(new LocalStorage('db'), { players });

const Roster = {
    getAllPlayers: () => {
        return lowDb.data.players;
    },
    getPlayersOnField: () => {
        return lowDb.data.players.filter(player => player.isPlaying);
    },
    getPlayersOnBench: () => {
        return lowDb.data.players.filter(player => !player.isPlaying);
    },
    movePlayerToBench: (playerId) => {
        lowDb.update(({ players }) => {
            lowDb.data.players.find((p) => p.id === playerId).isPlaying = false;
        });
    },
    movePlayerToField: (playerId) => {
        lowDb.update(({ players }) => {
            lowDb.data.players.find((p) => p.id === playerId).isPlaying = true;
        });
    }
};

export default Roster;
