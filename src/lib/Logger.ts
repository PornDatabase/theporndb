import * as winston from "winston";
let papertrail = require('winston-papertrail').Papertrail;

if( process.env.PAPERTRAIL_HOST ){
  winston.add(papertrail,{
    host: process.env.PAPERTRAIL_HOST,
    port: process.env.PAPERTRAIL_PORT
  });
  winston.remove(winston.transports.Console);
}

class Logger {
  public info(message: string, ...params: any[]){
    winston.log.apply(this,['info',message].concat(params));
  }

  public warn(message: string, ...params: any[]){
    winston.log.apply(this,['warn',message].concat(params)); 
  }

  public error(message: string, ...params: any[]){
    winston.log.apply(this,['error',message].concat(params)); 
  }
}

export default function(): any {
  return new Logger();
};