import Scraper from './Scraper.js';

class metartx extends Scraper {
  protected site: string[] = ['Viv Thomas','Sex Art'];
  protected paysite: string[] = ['MetArtX'];
  protected url: string[] = [
    "https://www.vivthomas.com/movies/latest/%d/",
    "https://www.sexart.com/movies/latest/%d/"
  ];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://'+self.site[index]+'.com'
    $('.list-group-item').each(function(i: number, elem: any){
      let info = $(elem).children('.custom-list-item-detailed');
      let scene = self.get_sceneObj(self.paysite[0]);
      let scrape_url = info.find('.custom-list-item-detailed-photo').find('a').attr('href');

      scene.set_url( scrape_url );
      scene.set_image( info.find('.custom-list-item-detailed-photo').find('img').attr('src') );
      scene.set_date(self.format_date( info.find('.custom-age').text().replace('Released:',''),'MMM DD, YYYY' ));
      scene.set_paysite_id( scrape_url.match(/movie\/(\d+)/)[1] );
      scene.set_site( self.site[index] );
      scene.add_actors( $(elem).find('.custom-list-item-name-model').map(function(i: number, actor:any){
          return $(actor).text();
        }).get() );

      // grab scene description and actors and tags
      self.get_page_content( scrape_url, function(url: string, $: any, scene:any){
        scene.set_title( $('.gallery-title').attr('title') );
        scene.set_description( $('.custom-description-long').text() );

        scene.commit();
      },self.control,scene);
    });
  }

}
module.exports = metartx;