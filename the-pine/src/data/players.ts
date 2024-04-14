export interface Player {
  name: string;
  postition: string;
  id: number;
}

const players: Player[] = [
  {
    name: 'Bode',
    postition: 'Forward',
    id: 0
  },
  {
    name: 'Jace',
    postition: 'Goalie',
    id: 1,
  }
  {
    name: 'Harrison',
    postition: 'Defense',
    id: 2
  }
];

export const getPlayers = () => players;

export const getPlayer = (id: number) => players.find(m => m.id === id);
