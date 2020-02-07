export interface User {
    _id: string;
    account: string;
    password: string;
    email: string;
    level?: number;
    avatar?: string;
    name: string;
    phone: string;
    address: string;
    status: boolean;
    create_date?: Date;
    create_by?: string
}

export interface DialogData {
    id: string;
    account: string;
    pass: string;
    name: string;
    email: string;
    phone: string;
    status: boolean;
}