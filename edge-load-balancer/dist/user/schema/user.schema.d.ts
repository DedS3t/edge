import * as mongoose from 'mongoose';
export declare type UserDocument = User & mongoose.Document;
export declare class User {
    username: string;
    password: string;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, {}>, mongoose.Model<any, any>, undefined>;
