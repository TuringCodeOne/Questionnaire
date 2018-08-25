<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FullAnswer;
use App\Models\ReOption;
use App\Models\ReShortAnswer;
use App\Models\Email;
use App\Models\Questionnaire;

use DB;
use Mail;

class AnsController extends Controller
{
    public function create($id,Request $request)
    {
        $emailId = '';
        $shortAns = $request->short_ans;
        $que = Questionnaire::where('id',$request->id)->get()[0];
        // 判断邮件格式
        if($que->isntReply == 1 && $shortAns != []) {
            $comeby = true;
            foreach ($shortAns as $shortAn) {
                if(filter_var($shortAn['content'], FILTER_VALIDATE_EMAIL)) {
                    $emailId = $shortAn['content'];
                    $comeby = false;
                } else {
                    continue;
                }
            }
            if($comeby){
            return response()->json(['success'=>false,'msg'=>'邮箱格式不正确！']);
            }
        }
        // 创建一个新的答卷
        $answer = FullAnswer::create([
            'qId' => $request->id,
        ]);
        $counts = $que->counts;
        $counts += 1;
        $que->update(['counts'=>$counts]);


        // $shortAns = json_decode($request->short_ans,true); // 转换成json数组
        foreach ($shortAns as &$shortAn) {
            $shortAn['fuId'] = $answer->id;
        }
        $ishortAns = DB::table('re_short_answers')->insert($shortAns);
        
        $opts = $request->option;
        // $opts = json_decode($request->option,true);
        foreach ($opts as &$op) {
            $op['fuId'] = $answer->id;
            // string 数组序列化存储
            $op['optContent']=serialize($op['optContent']);
            $op['opt']=serialize($op['opt']);
        }
        $isOpts = DB::table('re_options')->insert($opts);

        if($ishortAns==true && $isOpts==true && $emailId!=''){
            $email = Email::where('qId',$request->id)->get()[0];
            $view = 'notice';
            $subject = $email->title;
            $to = $emailId;
            Mail::send($view,['content'=>$email->content], function ($message) use ($to, $subject) {
                $message ->to($to)->subject($subject);
            });
            return response()->json(['success'=>true,'msg'=>'提交成功，请注意查收邮件！']);
        } elseif ($ishortAns==true && $isOpts==true && $emailId=='') {
            // find emailId and sent
            return response()->json(['success'=>true,'msg'=>'提交成功,感谢您的填写！']);
        } else {
            return response()->json(['success'=>false,'msg'=>'请求失败！请重试']);
        }
    }
}
