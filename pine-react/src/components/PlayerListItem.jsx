const PlayerListItem = (props) => {
    return <li key={props.key} data-player-id={props.playerId}>{props.title}</li>;
}

export default PlayerListItem;