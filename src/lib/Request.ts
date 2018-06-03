import cheerio from 'cheerio';
import Logger from './Logger';
const request:any = require('sync-request');
const log = Logger();

var options:any = options = {
  headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
    'accept-language': 'en-US,en;q=0.5',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, br',
  }
};

class Request {
  public scrape(url: string, callback: any, control: any, ...data: any[]){
    try {
      let res = request('GET', url, options);
      if( res.statusCode >= 300 ){
        log.error(`Cannot scrape url: ${url}`);
      }
      else{
        callback(url, cheerio.load(res.getBody('utf8')), ...data);
      }
    }
    catch(e){
      log.warn(e);
    }
  }

}
export default Request;