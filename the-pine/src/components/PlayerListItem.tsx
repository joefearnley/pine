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
      <IonReorder>
        <IonItem>
          <IonLabel>{player.name}</IonLabel>
        </IonItem>
      </IonReorder>
    </div>
  );
};

export default PlayerListItem;
