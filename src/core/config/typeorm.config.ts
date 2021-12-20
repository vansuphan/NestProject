import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3066,
  username: 'gotoro',
  password: 'Gotoro@123',
  database: 'gotoro',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
