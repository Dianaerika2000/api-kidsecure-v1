import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IndividualUser } from './entities/individual-user.entity';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(IndividualUser)
    private readonly individualRepository: Repository<IndividualUser>,
  ) { }

  create(createUserDto: CreateUserDto) {
    let user;

    if (createUserDto.type == 'individual') {
      user = new IndividualUser();
      user.name = createUserDto.name;
      user.lastname = createUserDto.lastname;
      user.username = createUserDto.username;
      user.birthDate = createUserDto.birthDate;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.activationToken = createUserDto.activationToken;
      user.photo_url = createUserDto.photo_url != null ? createUserDto.photo_url : null;

      console.log(user)
    } else if (createUserDto.type == 'group') {
      //TODO: Código para crear usuarios tipo grupo
    }

    return this.individualRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateProfileDto) {
    const user = await this.individualRepository.findOne({ where: {id} });

    console.log('USER FIND',user);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.lastname) {
      user.lastname = updateUserDto.lastname;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.gender) {
      user.gender = updateUserDto.gender;
    }
    if (updateUserDto.nationality) {
      user.nationality = updateUserDto.nationality;
    }
    if (updateUserDto.photo_url) {
      user.photo_url = updateUserDto.photo_url;
    }

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const userToRemove = await this.userRepository.findOne({ where: {id} });

    if (!userToRemove) {
      throw new NotFoundException(`User with ID ${id} not found`);   
    }
    return this.userRepository.remove(userToRemove);
  }

  findOneByEmail(email: string) {
    return this.individualRepository.findOne({ where: { email } });
  }

  async findOneByToken(token: string) {
    return this.individualRepository.findOne({ where: { activationToken: token } });
  }

  async save(individualUser: IndividualUser) {
    return this.individualRepository.save(individualUser);
  }
}
