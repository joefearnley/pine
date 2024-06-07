<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->name = 'Joe Test';
    $this->email = 'joetest123@gmail.com';
    $this->password = 'secret123';
    $this->deviceName = 'My iPhone';
});

it('must provide a name, email, and password to create account', function () {
    $postData = [];

    $this->postJson(route('register'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
            ['The email field is required.'],
            ['The password field is required.'],
            ['The device name field is required.'],
        );
});

it('must provide a name to create account', function () {
    $postData = [
        'name' => '',
        'email' => $this->email,
        'password' => 'secret123',
        'password_confirmation' => 'secret123',
        'device_name' => $this->deviceName,
    ];


    $this->postJson(route('register'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The name field is required.'],
        )
        ->assertJsonMissing(
            ['The email field is required.'],
            ['The password field is required.'],
            ['The device name field is required.'],
        );
});

it('must provide an email to create an account', function () {
    $postData = [
        'name' => $this->name,
        'email' => '',
        'password' => 'secret123',
        'password_confirmation' => 'secret123',
        'device_name' => $this->deviceName,
    ];

    $this->postJson(route('register'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The email field is required.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
            ['The password field is required.'],
            ['The device name field is required.'],
        );
});

it('must provide a password to create an account', function () {
    $postData = [
        'name' => $this->name,
        'email' => $this->email,
        'password' => '',
        'password_confirmation' => '',
        'device_name' => $this->deviceName,
    ];

    $this->postJson(route('register'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The password field is required.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
            ['The email field is required.'],
            ['The device name field is required.'],
        );
});

it('must provide a password and password confirmation to create an account', function () {
    $postData = [
        'name' => $this->name,
        'email' => $this->email,
        'password' => 'secret123',
        'password_confirmation' => 'secret1234',
        'device_name' => $this->deviceName,
    ];

    $this->postJson(route('register'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The password field confirmation does not match.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
            ['The email field is required.'],
            ['The password field is required.'],
            ['The device name field is required.'],
        );
});

it('must provide a device name to create an account', function () {
    $postData = [
        'name' => $this->name,
        'email' => $this->email,
        'password' => 'secret123',
        'password_confirmation' => 'secret1234',
        'device_name' => '',
    ];

    $this->postJson(route('register'), $postData)
        ->assertStatus(422)
        ->assertJsonFragment(
            ['The device name field is required.'],
        )
        ->assertJsonMissing(
            ['The name field is required.'],
            ['The email field is required.'],
            ['The password field is required.'],
            ['The password field confirmation does not match.'],
        );
});

it('can create an account and access token', function () {
    $postData = [
        'name' => $this->name,
        'email' => $this->email,
        'password' => 'secret123',
        'password_confirmation' => 'secret123',
        'device_name' => $this->deviceName,
    ];

    $response = $this->postJson(route('register'), $postData);

    $responseData = $response->json();

    [$id, $token] = explode('|', $responseData['token'], 2);

    $response->assertStatus(200)
        ->assertSee('token')
        ->assertJsonStructure(['token'])
        ->assertJsonFragment(
            ['name' => $this->name],
            ['email' => $this->email],
        );

    $this->assertDatabaseHas('users', [
        'name' => $this->name,
        'email' => $this->email,
    ]);

    $this->assertDatabaseHas('personal_access_tokens', [
        'tokenable_id' => $responseData['user']['id'],
        'name' => $this->deviceName,
        'token' => hash('sha256', $token),
    ]);
});
