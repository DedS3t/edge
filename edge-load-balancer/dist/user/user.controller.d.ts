import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
export declare class UserController {
    readonly userService: UserService;
    readonly authService: AuthService;
    constructor(userService: UserService, authService: AuthService);
    cur(req: any): Promise<any>;
    login(req: Request): Promise<{
        access_token: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<import("./schema/user.schema").UserDocument>;
}
