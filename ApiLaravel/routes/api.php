<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$api = app('Dingo\Api\Routing\Router');


$api->version('v1', [
    'namespace' =>'App\Http\Controllers'
],function($api) {
    $api->post('users','UserController@retrieve');
    $api->get('ques','QuesController@retrieve');
    $api->post('ques/create','QuesController@create');
    $api->get('ques/{id}','QuesController@show');
    $api->post('ques/{id}/createshort','SubjectController@createShort');
    $api->post('ques/{id}/createmany','SubjectController@createMany');
    $api->post('ques/{id}/status','QuesController@updateStatus');
    $api->get('ques/{id}/delete','QuesController@delete');
    $api->post('ques/{id}/answers','AnsController@create');
    $api->get('ques/{id}/answers','SubjectController@show');
    //test
});