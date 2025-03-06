import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException('Credenciales invalidas');
    }

    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({ userName: loginUserDto.userName })
      .exec();

    if (!user) throw new UnauthorizedException('Credenciales invalidas');

    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      throw new UnauthorizedException('Credenciales invalidas');

    const { password: _, __v, ...userData } = user.toObject();

    return {
      user: userData,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  findAll() {
    return this.userModel.find().select('-password -__v').exec();
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('-password -__v')
      .exec();
    if (!user)
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, ...toUpdateUser } = updateUserDto;

    if (password) {
      updateUserDto.password = bcrypt.hashSync(password, 10);
    }
    
    const user = await this.findOne(id);
    
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    await user.updateOne({ $set: updateUserDto });
    const updatedUser = await this.findOne(id);
    const { password: _, __v, ...userData } = updatedUser.toObject();
    return userData;
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    await user.deleteOne();
    return { message: `Usuario con id: ${id} eliminado correctamente` };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
