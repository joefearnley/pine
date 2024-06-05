<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->password = 'secret123';
    $this->deviceName = 'My iPhone';

    $this->user = User::factory()->create([
        'password' => bcrypt($this->password)
    ]);
});

it('must provide a email and password to authenticate', function () {
    $postData = [];

    $response = $this->postJson(route('authenticate'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The email field is required.'],
            ['The password field is required.'],
            ['The device name field is required.'],
        );
});

it('must provide a email to authenticate', function () {
    $postData = [
        'email' => '',
        'password' => $this->password,
        'device_name' => $this->deviceName ,
    ];

    $response = $this->postJson(route('authenticate'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The email field is required.'],
        )
        ->assertJsonMissing(
            ['The password field is required.'],
            ['The device name field is required.'],
        );
});

it('must provide a password to authenticate', function () {
    $postData = [
        'email' => $this->user->email,
        'password' => '',
        'device_name' => $this->deviceName,
    ];

    $response = $this->postJson(route('authenticate'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The password field is required.'],
        )
        ->assertJsonMissing(
            ['The email field is required.'],
            ['The device name field is required.'],
        );
});

it('must provide a device name to authenticate', function () {
    $postData = [
        'email' => $this->user->email,
        'password' => $this->password,
        'device_name' => '',
    ];

    $response = $this->postJson(route('authenticate'), $postData);

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['The device name field is required.'],
        )
        ->assertJsonMissing(
            ['The email field is required.'],
            ['The password field is required.'],
        );
});

it('authenticates a user and returns a token', function () {
    $postData = [
        'email' => $this->user->email,
        'password' => $this->password,
        'device_name' => $this->deviceName,
    ];

    $response = $this->postJson(route('authenticate'), $postData);

    $responseData = $response->json();

    [$id, $token] = explode('|', $responseData['token'], 2);

    $response->assertStatus(200)
        ->assertSee('token')
        ->assertJsonStructure(['token']);

    $this->assertDatabaseHas('personal_access_tokens', [
        'tokenable_id' => $this->user->id,
        'name' => $this->deviceName,
        'token' => hash('sha256', $token),
    ]);
});

