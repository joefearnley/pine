<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('requires a user to be authenitcated when deleting a team', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $this->deleteJson(route('teams.destroy', $team))
        ->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});

it('can delete a team', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    Sanctum::actingAs($user, ['*']);

    $this->deleteJson(route('teams.destroy', $team))
        ->assertStatus(200)
        ->assertJson(['message' => 'Team successfually deleted.']);

    $this->assertDatabaseMissing('teams', [
        'id' => $team->id,
        'name' => $team->title,
        'user_id' => $user->id,
    ]);
});

it('cannot delete a team owned by a different account', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $otherTeam = Team::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    Sanctum::actingAs($user, ['*']);

    $this->putJson(route('teams.destroy', $otherTeam))
        ->assertStatus(403);
});
