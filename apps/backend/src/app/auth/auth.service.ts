import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService{
    
    signup() {
        return {msg: 'Yo Signup'}
    }
    signin() {
        return {msg: 'Yo Signup'}
    }
}