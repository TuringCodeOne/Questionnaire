<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Questionnaire;
use App\Models\Option;
use App\Models\Subject;
use App\Models\ShortAnswer;
use App\Models\Email;

class QuesController extends Controller
{
    public function retrieve()
    {
        $ques = Questionnaire::all();
        return response()->json($ques);
    }

    public function show($id)
    {
        $que = Questionnaire::find($id);
        $subs = Subject::where('q_id',$id)->get();
        foreach($subs as $sub) {
            $opts = Option::where('s_id',$sub->id)->get();
            $ans = ShortAnswer::where('s_id',$sub->id)->get();
            $sub['options'] = $opts;
            $sub['shAns'] = $ans;
        }
        return response()->json(['que'=>$que,'subs'=>$subs]);
    }

    public function create(Request $request)
    {
        $newQue = Questionnaire::create(['title'=>$request->title,
                                         'counts'=>0,'status'=>0,
                                         'description'=>$request->description,
                                         'delete_token'=>0,
                                         'isntReply'=>$request->isntReply]);
        if($newQue->isntReply == 1) {
            Email::create(['qId'=>$newQue->id,
                            'content'=>$request->email,
                            'title'=>$request->emailTitle]);
        }
        return response()->json(['success'=>true,'id'=>$newQue->id]);
    }

    public function updateStatus($id,Request $request){
        $que = Questionnaire::find($id);
        $isnt = $que->update(['status'=>$request->status]);
        if ($isnt) {
            return response()->json(['success'=>true,'msg'=>'更新成功！']);
        } else {
            return response()->json(['success'=>false,'msg'=>'更新失败！']);
        }
    }

    public function delete($id) {
        $que = Questionnaire::find($id);
        $isnt = $que->update(['delete_token'=>1]);
        if ($isnt) {
            return response()->json(['success'=>true,'msg'=>'修改成功！']);
        } else {
            return response()->json(['success'=>false,'msg'=>'修改失败！']);
        } 
    }
}
