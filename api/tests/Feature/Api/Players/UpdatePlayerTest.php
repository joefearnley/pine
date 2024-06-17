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

it('requires a user to be authenitcated when updating a player', function () {
    $postData = [];

    $this->putJson(route('players.update', $this->player), $postData)
        ->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});

it('requires a name, and number for updating a player', function () {
    $postData = [];

    Sanctum::actingAs($this->user, ['*']);

    $this->putJson(route('players.update', $this->player), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
            ['The number field is required.'],
        );
});

it('requires a name for updating a player', function () {
    $postData = [
        'name' => '',
        'number' => 5,
    ];

    Sanctum::actingAs($this->user, ['*']);

    $this->putJson(route('players.update', $this->player), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
        )
        ->assertJsonMissing(
            ['The number field is required.'],
        );
});

it('requires a number for updating a player', function () {
    $postData = [
        'name' => 'John Doe',
        'number' => '',
    ];

    Sanctum::actingAs($this->user, ['*']);

    $this->putJson(route('players.update', $this->player), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The number field is required.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
        );
});


it('can update a player', function () {
    $newName = 'John Doe';
    $newNumber = 7;

    $postData = [
        'name' => $newName,
        'number' => $newNumber,
    ];

    Sanctum::actingAs($this->user, ['*']);

    $this->putJson(route('players.update', $this->player), $postData)
        ->assertStatus(200)
        ->assertJsonFragment([
            'name' => $newName,
            'number' => $newNumber,
            'is_playing' => false,
            'is_goalie' => false,
        ]);

    $this->assertDatabaseHas('players', [
        'name' => $newName,
        'number' => $newNumber,
    ]);
});

it('can add a player to field', function () {

    $postData = [
        'is_playing' => true,
    ];

    Sanctum::actingAs($this->user, ['*']);

    $this->putJson(route('players.update', $this->player), $postData)
        ->assertStatus(200)
        ->assertJsonFragment([
            'name' => $this->user->name,
            'number' => $this->user->number,
            'is_playing' => true,
            'is_goalie' => false,
        ]);

    $this->assertDatabaseHas('players', [
        'name' => $newName,
        'number' => $newNumber,
        'is_playing' => true,
        'is_goalie' => false,
    ]);
});
