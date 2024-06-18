<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;
use App\Models\Player;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();

    $this->team = Team::factory()->create([
        'user_id' => $this->user->id,
    ]);

    $this->player = Player::factory()->create([
        'team_id' => $this->team->id,
    ]);
});

it('requires a user ID to move to field', function () {
    $postData = [];

    $this->patchJson(route('players.status', $this->player), $postData)
        ->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});

it('requires a status for moving a player to the field', function () {
    $postData = [];

    Sanctum::actingAs($this->user, ['*']);

    $this->patchJson(route('players.status', $this->player), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The is playing field is required.'],
        );
});


it('requires a boolean status for moving a player to the field', function () {
    $postData = [
        'is_playing' => 'test string',
    ];

    Sanctum::actingAs($this->user, ['*']);

    $this->patchJson(route('players.status', $this->player), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The is playing field must be true or false.'],
        );
});

it('can move a player to the field', function () {
    $postData = [
        'is_playing' => true,
    ];

    Sanctum::actingAs($this->user, ['*']);

    $this->patchJson(route('players.status', $this->player), $postData)
        ->assertStatus(200);

    $this->assertDatabaseHas('players', [
        'id' => $this->player->id,
        'is_playing' => true,
    ]);
});

it('can remove a player from the field', function () {
    $postData = [
        'is_playing' => false,
    ];

    Sanctum::actingAs($this->user, ['*']);

    $this->patchJson(route('players.status', $this->player), $postData)
        ->assertStatus(200);

    $this->assertDatabaseHas('players', [
        'id' => $this->player->id,
        'is_playing' => false,
    ]);
});
