<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('must be authenticated to access team data', function () {
    $this->getJson(route('teams.index'))
        ->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthenticated.'
        ]);
});

it('can access team data', function () {
    $user = User::factory()->create();

    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    Sanctum::actingAs($user, ['*']);

    $this->getJson(route('teams.index'))
        ->assertStatus(200)
        ->assertJsonFragment([
            'name' => $team->name,
            'user_id' => $user->id,
        ]);
});

it('cannot access team data from a different account', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $otherTeam = Team::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    Sanctum::actingAs($user, ['*']);

    $this->getJson(route('teams.index'))
        ->assertStatus(200)
        ->assertJsonFragment([
            'name' => $team->name,
            'user_id' => $user->id,
        ])
        ->assertJsonMissing([
            'name' => $otherTeam->name,
            'user_id' => $otherUser->id,
        ]);
});

it('cannot access team data when no teams exist', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $otherTeam = Team::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    Sanctum::actingAs($user, ['*']);

    $this->getJson(route('teams.index'))
        ->assertStatus(200)
        ->assertJsonCount(0)
        ->assertJsonMissing([
            'name' => $otherTeam->name,
            'user_id' => $otherUser->id,
        ]);
});
