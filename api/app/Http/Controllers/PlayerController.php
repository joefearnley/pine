<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StorePlayerRequest;
use App\Http\Requests\UpdatePlayerRequest;
use App\Http\Requests\DeletePlayerRequest;
use App\Models\Player;

class PlayerController extends Controller
{
    /**
     * Display a listing of players.
     */
    public function index(Request $request)
    {
        $players = $request->user()->team->players;

        return response()->json($players);
    }

    /**
     * Store a new player.
     */
    public function store(StorePlayerRequest $request)
    {
        $player = new Player();
        $player->team_id = $request->team_id;
        $player->name = $request->name;
        $player->number = $request->number;
        $player->save();

        return response()->json($player->fresh());
    }

    /**
     * Display the specified player.
     */
    public function show(Player $player)
    {
        //
    }

    /**
     * Update the specified player in storage.
     */
    public function update(UpdatePlayerRequest $request, Player $player)
    {
        $player->name = $request->name;
        $player->number = $request->number;
        $player->is_playing = $request->is_playing ?? $player->is_playing;
        $player->is_goalie = $request->is_goalie ?? $player->is_goalie;
        $player->save();

        return response()->json($player);
    }

    /**
     * Remove the specified player from storage.
     */
    public function destroy(DeletePlayerRequest $request, Player $player)
    {
        $player->delete();

        return response()->json([
            'message' => 'Player successfually deleted.',
        ]);
    }
}
