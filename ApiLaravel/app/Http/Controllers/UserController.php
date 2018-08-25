<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Auth;

class UserController extends Controller
{
    public function retrieve(Request $request)
    {
        if(Auth::attempt(['name'=> $request->name,'password'=> $request->password])){
            $user = Auth::user();
            return response()->json(['success'=>true,'username'=>$user->name]);
        }
        else{
            return response()->json(['success'=>false,'error'=>'请求错误，没有此用户']);
        }
    }
}
