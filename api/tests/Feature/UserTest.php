<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('must be authenticated to access user data', function () {
    $this->getJson(route('users.index'))
        ->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthenticated.'
        ]);
});

it('user can see own data', function () {
    $user = User::factory()->create();

    Sanctum::actingAs($user, ['*']);

    $this->getJson(route('users.index'))
        ->assertStatus(200)
        ->assertJsonFragment([
            'name' => $user->name,
            'email' => $user->email,
        ]);
});
