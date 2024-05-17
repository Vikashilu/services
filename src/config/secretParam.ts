const conf = require(`./appConfig`);

//
export async function setConfigParams() {

   /*++ SET ENVIORNMENT VARAIBELS */
   process.env.TYPEORM_CONNECTION = conf.dbConn.type
   process.env.TYPEORM_HOST = conf.dbConn.host
   process.env.TYPEORM_USERNAME = conf.dbConn.username
   process.env.TYPEORM_PASSWORD = conf.dbConn.password
   process.env.TYPEORM_DATABASE = conf.dbConn.database
   process.env.TYPEORM_PORT = conf.dbConn.port
   process.env.TYPEORM_SYNCHRONIZE = conf.dbConn.synchronize
   process.env.TYPEORM_ENTITIES = conf.dbConn.entities
   process.env.TYPEORM_MIGRATIONS = conf.dbConn.migrations
}