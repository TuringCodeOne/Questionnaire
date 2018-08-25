export class QuestionnairePojo {
    id: number;
    title: string;
    counts: number;
    start_time: string;
    end_time: string;
    delete_token: number;
    status: number;
    created_at: string;
    updated_at: string;
    description: string;
}
export class SubjectInfoPojo {
    id: number;
    q_id: number;
    number: number;
    title: string;
    type: string;
    option_count: number;
    created_at: string;
    updated_at: string;
    options: Option[];
    shAns: ShortAnswer[];

}
export class Option {
    id: number;
    s_id: number;
    number: string;
    title: string;
    select_count: number;
    created_at: string;
    updated_at: string;
}

export class ShortAnswer {
    id: number;
    s_id: number;
    answer: string;
    created_at: string;
    updated_at: string;
}

export class QuesSubject {
    que: QuestionnairePojo;
    subs: SubjectInfoPojo[];
}
