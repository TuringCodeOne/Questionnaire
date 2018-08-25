export class AnalyPojo {
    id: number;
    qId: number;
    created_at: string;
    updated_at: string;
    reOpts: ReOpts[] = [];
    reAns: ReAns[] = [];
}
class ReOpts {
    id: number;
    fuId: number;
    number: number;
    opt: string;
    type: string;
    optContent: string;
    created_at: string;
    update_at: string;
    title: string;
}

class ReAns {
    id: number;
    fuId: number;
    number: number;
    created_at: string;
    updated_at: string;
    title: string;
}

export class AnalysPojo {
    id: number;
    fuId: number;
    number: number;
    title: string;
    created_at: string;
    updated_at: string;
    content?: string;
    opt?: string[];
    type?: string;
    optContent?: string[];
}
