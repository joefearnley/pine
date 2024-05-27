<?php

it('has home page', function () {
    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'hello world'
        ]);
});
