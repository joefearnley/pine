<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->name = 'Joe Test';
    $this->email = 'joetest123@gmail.com';
    $this->password = 'secret123';
});

it('must provide a name, email, and password to create account', function () {
    $postData = [];

    $response = $this->postJson(route('register'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
            ['The email field is required.'],
            ['The password field is required.'],
        );
});

it('must provide a name to create account', function () {
    $postData = [
        'name' => '',
        'email' => $this->email,
        'password' => 'secret123',
        'password_confirmation' => 'secret123',
    ];

    $response = $this->postJson(route('register'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
        )
        ->assertJsonMissing(
            ['The email field is required.'],
            ['The password field is required.'],
        );
});

it('must provide an email to create an account', function () {
    $postData = [
        'name' => 'Joe Test',
        'email' => '',
        'password' => 'secret123',
        'password_confirmation' => 'secret123',
    ];

    $response = $this->postJson(route('register'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The email field is required.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
            ['The password field is required.'],
        );
});

it('must provide a password to create an account', function () {
    $postData = [
        'name' => 'Joe Test',
        'email' => $this->email,
        'password' => '',
        'password_confirmation' => '',
    ];

    $response = $this->postJson(route('register'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The password field is required.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
            ['The email field is required.'],
        );
});

it('must provide a password and password confirmation to create an account', function () {
    $postData = [
        'name' => 'Joe Test',
        'email' => $this->email,
        'password' => 'secret123',
        'password_confirmation' => 'secret1234',
    ];

    $response = $this->postJson(route('register'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The password field confirmation does not match.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
            ['The email field is required.'],
            ['The password field is required.'],
        );
});

it('can create an account', function () {
    $postData = [
        'name' => 'Joe Test',
        'email' => $this->email,
        'password' => 'secret123',
        'password_confirmation' => 'secret123',
    ];

    $response = $this->postJson(route('register'), $postData);

    $responseData = $response->json();

    [$id, $token] = explode('|', $responseData['token'], 2);

    $response->assertStatus(200)
        ->assertSee('token')
        ->assertJsonStructure(['token']);

    $this->assertDatabaseHas('users', [
        'name' => $this->deviceName,
        'email' => $this->email,
    ]);
});
