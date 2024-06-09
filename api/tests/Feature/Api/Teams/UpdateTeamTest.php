<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('requires a user to be authenitcated updating a team', function () {
    $postData = [];

    $this->postJson(route('teams.store'), $postData)
        ->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});

it('requires a name for updating a team', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $postData = [
        'name' => '',
    ];

    Sanctum::actingAs($user, ['*']);

    $this->putJson(route('teams.update', $team), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
        );
});

it('can update a team name', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $newTeamName = 'New Test Team';

    Sanctum::actingAs($user, ['*']);

    $postData = [
        'name' => $newTeamName,
    ];

    Sanctum::actingAs($user, ['*']);

    $this->putJson(route('teams.update', $team), $postData)
        ->assertStatus(200)
        ->assertJsonFragment([
            'name' => $newTeamName,
            'user_id' => $user->id,
        ]);

    $this->assertDatabaseHas('teams', [
        'user_id' => $user->id,
        'name' => $newTeamName,
    ]);
});

it('can update a team age group', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create([
        'user_id' => $user->id,
    ]);

    $ageGroup = 'U9';

    Sanctum::actingAs($user, ['*']);

    $postData = [
        'name' => $team->name,
        'age_group' => $ageGroup,
    ];

    Sanctum::actingAs($user, ['*']);

    $this->putJson(route('teams.update', $team), $postData)
        ->assertStatus(200)
        ->assertJsonFragment([
            'id' => $team->id,
            'name' => $team->name,
            'age_group' => $ageGroup,
        ]);

    $this->assertDatabaseHas('teams', [
        'id' => $team->id,
        'user_id' => $user->id,
        'name' => $team->name,
        'age_group' => $ageGroup,
    ]);
});

it('cannot update a team owned by a different account', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $otherTeam = Team::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    $newTeamName = 'New Test Team';

    Sanctum::actingAs($user, ['*']);

    $postData = [
        'team_id' => $otherTeam->id,
        'name' => $newTeamName,
    ];

    Sanctum::actingAs($user, ['*']);

    $this->putJson(route('teams.update', $otherTeam), $postData)
        ->assertStatus(403);
});
