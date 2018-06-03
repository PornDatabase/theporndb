import Scene from '../Scene';
import moment from 'moment';
import Request from '../lib/Request';
import Logger from '../lib/Logger';
const log = Logger();

/**
 * General Scraper class
 *
 * this class will serve as the general scraper class to all
 * of the available website scrapers
 */
class Scraper {

  protected site: string[] = [];
  protected paysite: string[] = [];
  protected url: string[] = [];
  protected increment: number=1;
  protected request: any = new Request();

  /**
   *
   * @param {string} url - to the website including a %d to increment pages
   * @param {number} increment - to use when incrementing pages
   * @param {string} site
   * @param {string} paysite
   */
  constuctor(url: string, increment: number = 1, site: string, paysite: string): void {
    if( increment ) this.increment = increment;
    if( url ) this.url = [url];
    if( site ) this.site = [site];
    if( paysite ) this.paysite = [paysite];
  }

  /**
   * Method to be overridden
   * @param {string} url - url of current state
   * @param $ - jQuery page object
   * @param {number} index - of current state
   * @param self
   */
  protected scrape_page(url: string, $: any, index: number,self: any):void {
    log.warn("scrape_page() not properly overridden for ", self.paysite);
  }

  /**
   * Logs the given message
   * @param {string} message
   */
  protected log(message: string){
    log.error(message);
  }

  /**
   * Allows to control web page before passing to scraper
   * @param instance - phantom js page instance
   * @param page - page instance of current state
   */
  protected control(instance: any, page: any): void{
  }  

  /**
   * Starts scraping process for a webpage by incrementing defined url
   * by an increment for num_pages starting at start_page.
   * @param {number} num_pages - the number of pages to scrape after start_page
   * @param {number} start_page - the page to start at
   */
  public scrape( num_pages: number = 1, start_page: number = 1 ): void{
    for(let j=0; j<this.url.length; j++){
      for(let i=0; i<num_pages; i++){
        let page: string = (i==0)? String(start_page): String(start_page + i * this.increment);
        let url: string =this.url[j].replace("%d",page); 

        this.get_page_content(url,this.scrape_page,this.control,j,this);
      }
    }
  }

  /**
   * Grabs the page content and sends it to the site specific processor
   * @param {string} url - url to scrape
   * @param callback - scrape_page function
   * @param control - function to control browser before scraping
   * @param data - any other data to pass along
   */
  protected get_page_content(url: string, callback:any, control: any, ...data: any[]): void{
    this.request.scrape(url,callback,control,...data);
  }

  /**
   * Returns with scene object to be populated with data
   * @param {string} paysite
   * @returns {Scene}
   */
  protected get_sceneObj(paysite: string): Scene{
    return new Scene(paysite);
  }

  /**
   * Converts given date to YYYY-MM-DD format
   * @param {string} date  - date to be formatted
   * @param {string} format - input date format (default YYYY-MM-DD)
   * @returns {string} - formatted date
   */
  protected format_date(date: string, format? :string): string {
    if(format){
      return moment(date,format).utc().format('YYYY-MM-DD');
    }
    else{
      return moment(date).utc().format('YYYY-MM-DD'); 
    }
  }

}
export default Scraper;