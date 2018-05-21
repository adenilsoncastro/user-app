import { Car } from './car';
export class User {
    constructor() {
        this.usertype = 1;
    }

    _id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
    usertype: number;
    car: Car = new Car();
}