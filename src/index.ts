import fastify from 'fastify';
import { createConnection } from 'typeorm';
import { setConfigParams } from './config/secretParam';
import { registerRoutes } from "./routes/router";


async function bootstrap(): Promise<void> {
  console.log("Start Bootstrap Function");
  //fetch params from aws ssm and set env
  await setConfigParams();
  //create db connection
  console.log("Start DB connection");
  await createConnection();
  console.log("DB connection is created");
}


async function start() {
  try {
    console.log("Start Function");

    //bootstrap the function
    await bootstrap();

    //create the fastify server instance
    const server = fastify({ logger: false });

    //register fastify plugins
    server.register(registerRoutes);
    //start http listener
    server.listen(8080, "0.0.0.0", async () => {
      console.log("Server listening on port 8080");
    })
  }
  catch (error) {
    console.log(`process exiting gracefully`);
    console.log(error);
    process.exit(1);
  }

}

start();
