<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class PlayerStatusController extends Controller
{
    /**
     * Set if player is playing or not.
     */
    public function setPlayerPlayingStatus(Request $request, Player $player)
    {
        $request->validate([
            'is_playing' => 'required|bool',
        ]);

        $player->is_playing = $request->is_playing;
        $player->save();

        return response()->json($player);
    }

    /**
     * Set if player is goalie or not.
     */
    public function setPlayerGoalieStatus(Request $request, Player $player)
    {
        $request->validate([
            'is_goalie' => 'required|bool',
        ]);

        $player->is_goalie = $request->is_goalie;
        $player->save();

        return response()->json($player);
    }
}
