export interface Player {
  name: string;
  postition: string;
  id: number;
  inGame: boolean;
}

const players: Player[] = [
  {
    name: 'Asher',
    postition: 'Forward',
    id: 0,
    inGame: true,
  },
  {
    name: 'Bode',
    postition: 'Forward',
    id: 1,
    inGame: false,
  },
  {
    name: 'Deezhon',
    postition: 'Defense',
    id: 2,
    inGame: true,
  },
  {
    name: 'Elliot',
    postition: 'Defense',
    id: 3,
    inGame: false,
  },
  {
    name: 'Ewan',
    postition: 'Forward',
    id: 4,
    inGame: true,
  },
  {
    name: 'Harrison',
    postition: 'Defense',
    id: 5,
    inGame: true,
  },
  {
    name: 'JahReekis',
    postition: 'Defense',
    id: 6,
    inGame: true,
  },
  {
    name: 'Jace',
    postition: 'Goalie',
    id: 7,
    inGame: true,
  },
  {
    name: 'Jayce',
    postition: 'Forward',
    id: 8,
    inGame: true,
  },
];

export const getPlayers = () => players;

export const getPlayer = (id: number) => players.find(m => m.id === id);
