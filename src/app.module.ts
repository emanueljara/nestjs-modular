import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { Enviroments } from './enviroments';
import config from './config';

//const API_KEY = '12345'; //es como una variable global al poderse injectar en el constructor de la clase
//const API_KEY_PROD = 'ABC123'; //es una variable global dinamica
@Module({
  imports: [
    /*ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),*/
    ConfigModule.forRoot({
      envFilePath: Enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        API_KEY2: joi.number().required(),
        DATA_BASE: joi.string().required(),
        DATA_BASE_PORT: joi.number().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, //Hay dos tipos de injectable 'useClass' para el principio de 'SINGLETON'
    /*{
      //y viene implicito en el lenguaje al injectar el nombre del servicio en los providers
      provide: 'API_KEY', //El otro tipo de injectable es 'useValue' para poder injectar en los controladores
      useValue: API_KEY, //cualquier valor (objeto, string).etc
    },*/

    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
