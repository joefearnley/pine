<?php

it('has deleteplayer page', function () {
    $response = $this->get('/deleteplayer');

    $response->assertStatus(200);
});
