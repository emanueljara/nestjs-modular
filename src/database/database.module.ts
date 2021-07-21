import { Module, Global } from '@nestjs/common';

const API_KEY = '12345'; //es como una variable global al poderse injectar en el constructor de la clase
const API_KEY_PROD = 'ABC123'; //es una variable global dinamica

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
