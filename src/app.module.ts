import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensagesController } from './mensages/mensages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensagesService } from './mensages/mensages.service';
import { Mensage } from './mensages/entities/mensage.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ //configuraçaõ para com o baco de dado
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'junior',
      password: 'Bwi280281*',
      database: 'sendmeapp_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensage])
  ],
  controllers: [AppController, MensagesController],
  providers: [AppService, MensagesService],
})
export class AppModule {}
