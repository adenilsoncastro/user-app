import { Car } from './car';
export class User{
    constructor(){}

    name: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
    car: Car = new Car();
}