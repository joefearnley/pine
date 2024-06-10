<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('requires a user to be authenitcated creating a player', function () {

    $postData = [
        'name' => 'Test Team',
    ];

    $this->postJson(route('teams.store'), $postData)
        ->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});

it('requires a team id, name, and number for creating a player', function () {
    $user = User::factory()->create();

    $postData = [];

    Sanctum::actingAs($user, ['*']);

    $this->postJson(route('players.store'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The team id field is required.'],
            ['The name field is required.'],
            ['The number field is required.'],
        );
});

it('requires a team id for creating a player', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $postData = [
        'team_id' => '',
        'name' => 'Test Player',
        'number' => 7,
    ];

    Sanctum::actingAs($user, ['*']);

    $this->postJson(route('players.store'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The team id field is required.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
            ['The number field is required.'],
        );
});

it('requires a name for creating a player', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $postData = [
        'team_id' => $team->id,
        'name' => '',
        'number' => 7,
    ];

    Sanctum::actingAs($user, ['*']);

    $this->postJson(route('players.store'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
        )
        ->assertJsonMissing(
            ['The team id field is required.'],
            ['The number field is required.'],
        );
});

it('requires a number for creating a player', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $postData = [
        'team_id' => $team->id,
        'name' => 'Test Player',
        'number' => '',
    ];

    Sanctum::actingAs($user, ['*']);

    $this->postJson(route('players.store'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The number field is required.'],
        )
        ->assertJsonMissing(
            ['The team id field is required.'],
            ['The name field is required.'],
        );
});

it('can create a player', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $playerName = 'Test Player';
    $playerNumber = 7;

    $postData = [
        'team_id' => $team->id,
        'name' => $playerName,
        'number' => $playerNumber,
    ];

    Sanctum::actingAs($user, ['*']);

    $response = $this->postJson(route('players.store'), $postData)
        ->assertStatus(200)
        ->assertJsonFragment([
            'team_id' =>  $team->id,
            'name' => $playerName,
            'number' => $playerNumber,
            'is_playing' => false,
            'is_goalie' => false,
        ]);

    $this->assertDatabaseHas('players', [
        'team_id' =>  $team->id,
        'name' => $playerName,
        'number' => $playerNumber,
        'is_playing' => false,
        'is_goalie' => false,
    ]);
});
