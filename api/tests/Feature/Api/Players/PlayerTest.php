<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;
use App\Models\Player;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('must be authenticated to access player data', function () {
    $this->getJson(route('players.index'))
        ->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthenticated.'
        ]);
});

it('authenticated users can access player data', function () {
    $user = User::factory()->create();

    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $players = Player::factory()->count(3)->create([
        'team_id' => $team->id,
    ]);

    Sanctum::actingAs($user, ['*']);

    $this->getJson(route('players.index'))
        ->assertStatus(200)
        ->assertJsonFragment([
            'name' => $players[0]->name,
            'number' => $players[0]->number,
            'is_playing' => false,
            'is_goalie' => false,
        ])
        ->assertJsonFragment([
            'name' => $players[1]->name,
            'number' => $players[1]->number,
            'is_playing' => false,
            'is_goalie' => false,
        ])
        ->assertJsonFragment([
            'name' => $players[2]->name,
            'number' => $players[2]->number,
            'is_playing' => false,
            'is_goalie' => false,
        ]);
});
