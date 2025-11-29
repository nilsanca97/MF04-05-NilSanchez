interface Client {
    id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    premium: boolean;
    age: number;
    password?: string;
    addresses?: Array<string | undefined>;
}
export default Client;
