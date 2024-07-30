import { Link } from 'framework7-react';

const PlayerListItem = (props) => {
    return  (
        <li data-player-id={props.playerId}>{props.name}</li>
    );
}

export default PlayerListItem;