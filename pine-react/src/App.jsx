import { useState } from 'react'
import { 
  IonApp,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNavLink,
  IonButton
} from '@ionic/react';
import { ReactSortable } from "react-sortablejs";

function App() {
  
  const [players, setPlayers] = useState([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "fawf" },
    { id: 4, name: "fiowwwna" },
    { id: 5, name: "fwef" },
    { id: 6, name: "fiona424422" },
  ]);

  return (
    <>
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>The Pine</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>

            <ReactSortable list={players} setList={setPlayers} multiDrag swap>
              {players.map((item) => (
                <IonItem key={item.id}>
                  <IonLabel>{item.name}</IonLabel>
                </IonItem>
              ))}
            </ReactSortable>

          </IonList>
        </IonContent>
      </IonApp>
    </>
  )
}

export default App
