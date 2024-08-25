
const PlayerListItem = (props) => {
    return  (
        <li data-player-id={props.player.id}>
            <div className="item-content">
                <div className="item-inner">
                    <div className="item-title-row">
                        <div className="item-title">{props.player.name}</div>
                        <div className="item-after">
                            <span># {props.player.number}</span>
                        </div>
                    </div>
                    {props.player.isPlaying && 
                        <div className="item-text">{props.player.position}</div>
                    }
                </div>
            </div>
        </li>
    );
}

export default PlayerListItem;