import { get } from 'env-var';

export default (): Record<string, any> => ({
  node: {
    env: get('NODE_ENV').default('local').required().asString(),
    name: get('NODE_NAME').default('gotoro').required().asString(),
    url: get('NODE_URL').default('http://localhost:8080').asUrlString(),
    debug: get('NODE_DEBUG').default('false').required().asBool(),
    port: get('NODE_PORT').default(8080).required().asPortNumber(),
    admin_mode: get('NODE_ADMIN_MODE').default('false').required().asBool(),
  },
  app: {
    basePath: get('BASE_PATH').default('/').required().asString(),
  },
  db: {
    type: get('DB_DRIVER').default('mysql').required().asString(),
    host: get('DB_HOST').default('localhost').required().asString(),
    port: get('DB_PORT').default(3066).required().asPortNumber(),
    database: get('DB_NAME').default('gotoro').required().asString(),
    username: get('DB_USER').asString(),
    password: get('DB_PASS').asString(),
    entities: get('DB_ENTITIES').asString(),
    synchronize: true,
  },
  jwtUser: {
    secretKey: get('JWT_USER_SECRET')
      .default('ba7nH{zBs$}6H4mu')
      .required()
      .asString(),
    options: {
      expiresIn: get('JWT_USER_EXPIRE').default('8h').required().asString(),
    },
  },
});
