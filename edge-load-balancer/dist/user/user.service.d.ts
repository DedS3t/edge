import * as mongoose from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: mongoose.Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findById(id: User | string): Promise<UserDocument>;
    findByUsername(username: string): Promise<UserDocument>;
}
