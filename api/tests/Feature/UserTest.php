<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('must be authenticated to access user data', function () {
    $response = $this->getJson(route('users.index'));

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthenticated.'
        ]);
});

it('user can see own data', function () {
    $user = User::factory()->create();

    Sanctum::actingAs($user, ['*']);

    $response = $this->getJson(route('users.index'));

    $response->assertStatus(200)
        ->assertJsonFragment([
            'name' => $user->name,
            'email' => $user->email,
        ]);
});
