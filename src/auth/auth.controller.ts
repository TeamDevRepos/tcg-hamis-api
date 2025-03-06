import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/';
import { ParseMongoIdPipe } from '../common/pipes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/users')
  findAll() {
    return this.authService.findAll();
  }

  @Get('/users/:id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.authService.findOne(id);
  }

  @Patch('/users/:id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateAuthDto: UpdateUserDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete('/users/:id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.authService.remove(id);
  }
}
