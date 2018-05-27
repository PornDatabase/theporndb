import Scraper from './Scraper.js';

class joymii extends Scraper {
  protected site: string[] = ['Joymii'];
  protected paysite: string[] = ['Joymii'];
  protected url: string[] = [
  "https://joymii.com/site/videos?tab=latest&page=%d",
  ];

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://joymii.com';
    $('.set').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);

      scene.set_site( "Joymii" );
      scene.set_url( baseurl+info.children('a').attr('href') );
      scene.set_image( info.children('a').find('img').attr('src') );
      scene.set_title( info.find('.box-title.title').find('a').text() );
      scene.add_actors( info.find('.box-actors.actors').find('a').map(function(i: number, actor:any){
        return $(actor).text();
      }).get() );
      scene.set_date(self.format_date( info.find('.box-release_date.release_date').text(), 'MMM DD, YYYY' ));
      scene.set_paysite_id( info.children('a').attr('href').match(/\/(\d+)_.*$/)[1] );

      // grab scene description and actors and tags
      self.get_page_content( baseurl+info.children('a').attr('href'), function(url: string, $: any, scene:any){
        scene.set_description($('.text').text());

        scene.commit();
      }, self.control, scene);
    });
  }

}
module.exports = joymii;