import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormconfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: 'xxx',
  database: 'mediumclone',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/src/migrations/*.{ts,.js}'],
};
// console.log(__dirname + '/src/**/*.entity{.ts,.js}');
// console.log(__dirname + '/src/migrations/*.{ts,.js}');
export default ormconfig;
