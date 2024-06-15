<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;
use App\Models\Player;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('requires a user to be authenitcated when updating a player', function () {
    $user = User::factory()->create();

    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $player = Player::factory()->create([
        'team_id' => $team->id,
    ]);

    $postData = [];

    $response = $this->putJson(route('players.update', $player), $postData)
        ->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});

it('requires a name, and number for creating a player', function () {
    $user = User::factory()->create();

    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $player = Player::factory()->create([
        'team_id' => $team->id,
    ]);

    $postData = [];

    Sanctum::actingAs($user, ['*']);

    $this->putJson(route('players.update', $player), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
            ['The number field is required.'],
        );
});
