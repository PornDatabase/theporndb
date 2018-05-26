const fs = require('fs');

class scrapers {
  private scrapers:any = {};

  constructor(){
    let self = this;

    // if we are scraping, skip
    if(process.env.NOSCRAPE){
      return;
    }

    // get list of all scrapers
    let files: string[] = fs.readdirSync(__dirname);
    files.forEach(function(file: string){
      if( file.endsWith('.js') ){
        if( file !== 'index.js' && file !== 'Scraper.js' ){
          let scraper = require(__dirname+"/"+file);
          self.scrapers[file.replace('.js','')] = new scraper();
        }
      }
    });
  }

  public scrape_all( num_pages: number = 1){
    for( let scraper in this.scrapers ){
      this.scrapers[scraper].scrape( num_pages );
    }
  }
}
export default scrapers;