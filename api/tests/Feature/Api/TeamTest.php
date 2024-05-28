<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Team;

uses(RefreshDatabase::class);

it('must be authenticated to access team index page ', function () {

    $response = $this->get(route('teams.index'));

    dd($response->decodeResponseJson());


    $response->assertStatus(404);
});

// it('team index page', function () {
//     $user = User::factory()->create();

//     $team = Team::factory()->create([
//         'user_id' => $user->id,
//     ]);

//     $response = $this->get(route('teams.index'));

//     $response->assertStatus(200)
//         ->assertJsonFragment([
//             'name' => $team->name,
//         ]);
// });
