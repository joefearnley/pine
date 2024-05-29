<?php

it('must be authenticated to access user data', function () {
    $response = $this->getJson(route('users.index'));

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthenticated.'
        ]);
});

it('must be authenticated to access user data', function () {
    $response = $this->getJson(route('users.index'));

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthenticated.'
        ]);
});
