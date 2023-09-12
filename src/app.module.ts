import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Log4jsModule } from '@nestx-log4js/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Log4jsModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          config: {
            appenders: {
              logstash: {
                type: 'log4js-logstash-tcp',
                host: config.get<string>('LOGSTASH_HOST', 'localhost'),
                port: config.get<number>('LOGSTASH_PORT', 5044),
                fields: {
                  application_name: config.get<string>('APPLICATION_NAME', 'nestjs-log4js-logstash')
                }
              },
              stdout: {
                type: 'stdout'
              }
            },
            categories: {
              default: {
                enableCallStack: true,
                appenders: ['logstash', 'stdout'],
                level: 'info'
              }
            }
          }
        };
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
