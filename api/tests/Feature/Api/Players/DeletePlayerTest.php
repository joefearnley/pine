<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;
use App\Models\Player;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('requires a user to be authenitcated when deleting a player', function () {
    $user = User::factory()->create();

    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $player = Player::factory()->create([
        'team_id' => $team->id,
    ]);

    $this->deleteJson(route('players.destroy', $player))
        ->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});

it('can delete a player', function () {
    $user = User::factory()->create();

    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $player = Player::factory()->create([
        'team_id' => $team->id,
    ]);

    Sanctum::actingAs($user, ['*']);

    $response = $this->deleteJson(route('players.destroy', $player))
        ->assertStatus(200)
        ->assertJson(['message' => 'Player successfually deleted.']);

    $this->assertDatabaseMissing('teams', [
        'id' => $player->id,
        'team_id' => $team->id,
        'name' => $player->title,
        'number' => $player->number,
    ]);
});

it('cannot delete a player owned by a different account', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $otherTeam = Team::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    $otherPlayer = Player::factory()->create([
        'team_id' => $otherTeam->id,
    ]);

    Sanctum::actingAs($user, ['*']);

    $this->deleteJson(route('players.destroy', $otherPlayer))
        ->assertStatus(403);
});
