<?php

it('has updateplayer page', function () {
    $response = $this->get('/updateplayer');

    $response->assertStatus(200);
});
