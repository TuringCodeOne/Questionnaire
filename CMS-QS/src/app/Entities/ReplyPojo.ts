export class ShortAns {
    number: number;
    title: string;
    content: string;

}

export class Opti {
    number: number;
    title: string;
    optContent: string[] = [];
    type: string;
    opt: string[] = [];
}
export class ReplyPojo {
    id: number;
    short_ans: ShortAns[];
    option: Opti[];
}
