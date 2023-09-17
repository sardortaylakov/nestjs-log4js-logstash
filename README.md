# nestjs-log4js-logstash
NestJS sample app that uses Log4js logger with Logstash

## How to run the app

1. Run `docker-compose up` to start the Logstash container.
2. Run `npm run start` to start the NestJS app.

## Implementation steps

1. Create a new project using [Nest CLI](https://docs.nestjs.com/first-steps) by running `nest new nestjs-log4js-logstash`
2. Add sample logs in `src/app.controller.ts` and `src/app.service.ts` using Nest [Logger](https://docs.nestjs.com/techniques/logger)
3. Install Nest [configuration](https://docs.nestjs.com/techniques/configuration) module to configure application properties by running `npm i --save @nestjs/config`
4. Install [log4js](https://www.npmjs.com/package/@nestx-log4js/core) by running `npm i @nestx-log4js/core`
5. Install [log4js-logstash-tcp](https://www.npmjs.com/package/log4js-logstash-tcp) by running `npm i log4js-logstash-tcp`
6. Update `src/app.module.ts` to configure `Log4jsModule` with 2 appenders, logstash and stdout
7. Update `src/main.ts` to use `Log4jsLogger` as app logger
8. Configure [ELK stack](https://www.elastic.co/blog/getting-started-with-the-elastic-stack-and-docker-compose) using docker-compose
    * add `docker-compose.yml` file with container configurations for ELK
    * under `logstash` directory, add config files for logstash

## View logs in Kibana

Once app and containers are running, you can see startup logs both in console and in Kibana by navigating to http://localhost:5601. Index is automatically created with `logstash-` prefix in the name. You can locate index under Management > Stack Management > Data > Index Management. Create index pattern as `logstash-*` under Management > Stack Management > Kibana > Index Patterns and view your logs sent from the application under Analytics > Discover specifying index pattern you created, that is `logstash-*`.