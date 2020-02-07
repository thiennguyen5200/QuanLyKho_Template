export const URL = 'http://localhost:8080/';

export interface ServerResponse{
    code: number;
    message?: string;
    data?: any;
}
export interface TitleResponse{
    name: string;
    describe?: string;
}