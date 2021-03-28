import { Body, Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor (
    readonly userService: UserService,
    readonly authService: AuthService,
  ) {}

  // TODO: replace with client-side code
  @UseGuards(JwtAuthGuard)
  @Get('/cur')
  async cur(@Req() req) {
    return req.user._id;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
