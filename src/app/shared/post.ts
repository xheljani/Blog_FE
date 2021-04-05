export class Post {
    
    title: string;
    content: string;
    createTime: Date;
    updateTime: Date;
    userId: string;
    id?: number;
    user?: any;
    filePath?: string;
    comments?: Comment[];

}

export class User {
    userName: string;
}

export class Comment {
    content: string;
    createTime: Date;
    userId: string;
    id?: number;
    user?: any;

}


