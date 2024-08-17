
const PlayerListItem = (props) => {
    return  (
        <li data-player-id={props.player.id}>
            <div className="item-content">
                <div className="item-inner">
                    <div className="item-title">{props.player.name}</div>
                    <div className="item-after">
                        <span># {props.player.number}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default PlayerListItem;