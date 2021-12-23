import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const typeOrmConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'gotoro',
  password: 'Gotoro@123',
  database: 'gotoro',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migrations',
  },
  synchronize: true, // process.env.NODE_ENV === 'development' ? true: false,
  debug: true,
};
