import cheerio from 'cheerio';
import Logger from './Logger';
const request:any = require('request');
const log = Logger();



class Request {
  public scrape(url: string, callback: any, control: any, ...data: any[]){
    try {
      request(url, function(error: string,response:any,body:string){
        if ( ! error ) {
          callback(url, cheerio.load(body), ...data);
        }
        else {
          log.error(`Cannot scrape url: ${url}, status code: ${error}`);
        }
      });
    }
    catch(e){
      log.warn(e);
    }
  }

}
export default Request;