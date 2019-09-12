import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {User} from '../../models';
import {Sequelize} from 'sequelize-typescript';
import {Op} from 'sequelize';

interface CreateUserDto {
  name: string;
  email: string;
}

@Controller('user')
export class UserController {
  @Get()
  async getUsers() {
    return User.findAll();
  }

  @Delete()
  async deleteUsers() {
    return User.destroy();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return User.create(createUserDto);
  }

  @Get('/:id')
  async getUser(@Param() params) {
    return User.findOne({where: {id: params.id}});
  }

  @Delete('/:id')
  async deleteUser(@Param() params) {
    return User.destroy({where: {id: params.id}});
  }
}
