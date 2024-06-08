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

    $response = $this->getJson(route('teams.index'));

    $response->assertStatus(200)
        ->assertJsonFragment([
            'name' => $team->name,
            'user_id' => $user->id,
        ]);
});
