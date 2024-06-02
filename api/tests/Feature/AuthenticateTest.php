<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->password = 'secret';
    $this->deviceName = "Joe's iPhone";
});

it('must provide a username and password to authenticate', function () {
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

    $response->dd();

    $response->assertStatus(422)
        ->assertJsonFragment(
            ['token'],
        );
});
