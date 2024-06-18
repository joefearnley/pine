<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class PlayerStatusController extends Controller
{
    public function changePlayingStatus(Request $request, Player $player)
    {
        $request->validate([
            'is_playing' => 'required|bool',
        ]);

        $player->is_playing = $request->is_playing;
        $player->save();

        return response()->json($player);
    }
}
