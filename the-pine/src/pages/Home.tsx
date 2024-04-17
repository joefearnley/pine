import PlayerListItem from '../components/PlayerListItem';
import { useState } from 'react';
import { Player, getPlayers } from '../data/players';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  const [players, setPlayers] = useState<Player[]>([]);

  useIonViewWillEnter(() => {
    const players = getPlayers();
    setPlayers(players);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const handleReorder = (e: CustomEvent<ItemReorderEventDetail>) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', e.detail.from, 'to', e.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    e.detail.complete();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Players</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Game
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {players.filter(p => p.inGame).map(p => <PlayerListItem key={p.id} player={p} />)}
          </IonReorderGroup>
        </IonList>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Pine
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {players.filter(p => !p.inGame).map(p => <PlayerListItem key={p.id} player={p} />)}
          </IonReorderGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
