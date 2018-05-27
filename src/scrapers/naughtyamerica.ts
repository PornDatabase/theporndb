import Scraper from './Scraper.js';

class naughtyamerica extends Scraper {
  protected site: string[] = ['naughtyamerica'];
  protected paysite: string[] = ['Naughty America'];
  protected url: string[] = [
  "https://tour.naughtyamerica.com/new-porn-videos?nats=4.4.8.8.1169.0.0.0.0&page=%d",
  ];

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://naughtyamerica.com';
    $('.grid-item-large').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);

      scene.set_url( info.children('a').attr('href') );
      scene.set_image( 'https:'+info.children('a').find('img').attr('src') );
      scene.set_date(self.format_date( info.find('.entry-date').text(), 'MMM DD, YYYY' ));
      scene.set_paysite_id( info.children('a').attr('href').match(/\-(\d+)$/)[1] );

      // grab scene description and actors and tags
      self.get_page_content( info.children('a').attr('href'), function(url: string, $: any, scene:any){
        scene.add_tags( $('#scene-info').find('p').find('a').map(function(i: number, tag:any){
          return $(tag).text();
        }).get() );
        scene.add_actors( $('#scene-info').find('p').first().find('a').map(function(i: number, actor:any){
          return $(actor).text();
        }).get() );
        scene.set_description($('.synopsis_txt').text());
        scene.set_site( $('#synopsis').find('p').first().find('a').text() );
        scene.set_title( $('[itemprop="name"]').find('h1').text().replace(/\s{2,}/g," ") );

        scene.commit();
      }, self.control, scene);
    });
  }

}
module.exports = naughtyamerica;