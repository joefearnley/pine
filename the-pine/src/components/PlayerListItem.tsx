import {
  IonItem,
  IonLabel,
  IonReorder,
} from '@ionic/react';
import { Player } from '../data/players';
import './PlayerListItem.css';

interface PlayerListItemProps {
  player: Player;
}

const PlayerListItem: React.FC<PlayerListItemProps> = ({ player }) => {
  return (
    <div>
      <IonItem>
        <IonLabel>{player.name}</IonLabel>
        <IonReorder slot="end"></IonReorder>
      </IonItem>
    </div>
  );
};

export default PlayerListItem;
