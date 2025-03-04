<?php

use Illuminate\Support\Facades\Route;

Route::get('test', function(){
    return 'yes';
});


Route::get('/patata', function () {


    return 'patata';
});