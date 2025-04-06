import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeORMRepository } from 'src/database';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends TypeORMRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.createQueryBuilder('u')
      .select(['id', 'email'])
      .printSql() // In ra câu lệnh SQL thực tế
      .getMany();
    console.log(user, 'falksdjf');
    return await this.findOne({
      where: { email },
    });
  }
}
