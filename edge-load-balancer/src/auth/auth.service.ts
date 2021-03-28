import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // here is the authentication
  // password must be called pass for some reason
  // and username is actually email :|
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // logging in, NOT authenticating (that already happened)
  async login(user: any) {
    const payload = { user_id: user._doc._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
