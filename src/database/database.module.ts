import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow<string>('MYSQL_HOST'),
        port: configService.getOrThrow<number>('MYSQL_PORT'),
        username: configService.getOrThrow<string>('MYSQL_USERNAME'),
        password: configService.getOrThrow<string>('MYSQL_PASSWORD'),
        database: configService.getOrThrow<string>('MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
