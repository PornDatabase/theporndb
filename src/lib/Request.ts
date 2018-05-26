import cheerio from 'cheerio';
import Logger from './Logger';
const phantomPool = require('phantom-pool');
const log = Logger();

const max_pool = (process.env.MAXPOOL)? process.env.MAXPOOL: 10;
const pool = phantomPool({
  max: max_pool,
  min: 1,
  phantomArgs: [['--ignore-ssl-errors=true', '--disk-cache=true'],{}]
});

class Request {
  public scrape(url: string, callback: any, control: any, ...data: any[]){
    pool.use(async(instance: any)=>{
      const page = await instance.createPage();
      const status = await page.open(url);

      if( status != 'success' ){
        log.error('Could not scrape ' + url);
        return;
      }
      control(instance, page);

      const content = await page.property('content');
      callback(url, cheerio.load(content), ...data);

      return content;
    }).catch((error: any)=>{
      log.error( "Phantom browser issues:", error );
    })
  }

}
export default Request;