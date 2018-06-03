import cheerio from 'cheerio';
import Logger from './Logger';
import request from 'then-request';
const log = Logger();



class Request {
  public scrape(url: string, callback: any, control: any, ...data: any[]){
    request('GET',url).done((res)=>{
      if( res.statusCode == 200 ) {
        callback(url, cheerio.load(String(res.getBody())), ...data);
      }
      else{
        log.error(`Cannot scrape url: ${url}, status code: ${res.statusCode}`);
      }
    });
  }

}
export default Request;