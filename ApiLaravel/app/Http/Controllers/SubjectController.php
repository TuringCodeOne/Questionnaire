<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\FullAnswer;
use App\Models\ReOption;
use App\Models\ReShortAnswer;
use App\Models\ShortAnswer;
use App\Models\Subject;
use App\Models\Option;
use DB;

class SubjectController extends Controller
{
    public function show($id)
    {
        $data=Array();
        $answers = FullAnswer::where('qId',$id)->get();
        foreach($answers as $answer) {
            $reOpts = ReOption::where('fuId',$answer->id)->get();
            $reAns = ReShortAnswer::where('fuId',$answer->id)->get();

            // 反序列化
            foreach($reOpts as &$reOpt){
                $reOpt['optContent']=unserialize($reOpt['optContent']);
                $reOpt['opt']=unserialize($reOpt['opt']);
            }
            $reply=Array();
            for($i=1;$i<=(count($reAns)+count($reOpts));$i++){
                foreach($reAns as $reAn) {
                    if($reAn->number==$i){
                        array_push($reply,$reAn);
                    }
                }
                foreach($reOpts as $reopt) {
                    if($reopt->number==$i){
                        array_push($reply,$reopt);
                    }
                }
            }
            array_push($data,$reply);
        }
        return response()->json(['success'=>true,'data'=>$data]);
    }
    public function createShort($id, Request $request)
    {
        $numbers = DB::table('subjects')->where('q_id',$id)->pluck('number');
        // return $numbers;
        $number=count($numbers)+1;
        $sub=Subject::create(['q_id'=>$id,'title'=>$request->title,'type'=>$request->type,'option_count'=>0,'number'=>$number]);
        $shortans=ShortAnswer::create(['s_id'=>$sub->id,'answer'=>'']);
        return response()->json(['success'=>true]);
    }
    public function createMany($id, Request $request)
    {
        $numbers = DB::table('subjects')->where('q_id',$id)->pluck('number');
        // return $numbers;
        $number=count($numbers)+1;
        $contents=$request->optContent;
        $option_count=count($contents);
        $sub=Subject::create(['q_id'=>$id,'title'=>$request->title,'type'=>$request->type,'option_count'=>$option_count,'number'=>$number]);
        for($i=1;$i<=$option_count;$i++){
        $opts=Option::create(['s_id'=>$sub->id,'number'=>$i,'title'=>$contents[$i-1],'select_count'=>0]);
        }
        return response()->json(['success'=>true]);
    }
}
