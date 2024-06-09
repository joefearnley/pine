<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('requires a name for creating a team', function () {
    $user = User::factory()->create();

    $postData = [];

    Sanctum::actingAs($user, ['*']);

    $this->postJson(route('teams.store'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
        );
});

it('can create a team', function () {
    $user = User::factory()->create();
    $teamName = 'Test Team';

    Sanctum::actingAs($user, ['*']);
    $postData = [
        'name' => $teamName,
    ];

    Sanctum::actingAs($user, ['*']);

    $this->postJson(route('teams.store'), $postData)
        ->assertStatus(200)
        ->assertJsonFragment([
            'name' => $teamName,
            'user_id' => $user->id,
        ]);

    $this->assertDatabaseHas('teams', [
        'user_id' => $user->id,
        'name' => $teamName,
    ]);
});
