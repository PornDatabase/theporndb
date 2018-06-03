import Scraper from './Scraper.js';

class xart extends Scraper {
  protected site: string[] = ['nb'];
  protected paysite: string[] = ['X-Art'];
  protected url: string[] = ["https://www.x-art.com/videos/recent/%d"];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://www.x-art.com'
    $('#allvideos > li').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);
      let scene_url: string = info.find('a').first().attr('href');

      scene.set_site( 'X-Art' );
      scene.set_title( info.find('.item-header').find('h1').first().text().trim() );
      scene.set_url( scene_url );
      scene.set_date(self.format_date(
        info.find('.item-header').find('h2').text(),
        'MMM DD, YYYY'
      ));

      self.get_page_content( scene_url, function(url:string, $: any, scene:any){
        scene.add_actors( $('.info').find('h2').find('a').map(function(i: number, actor:any){
          return $(actor).text();
        }).get() );
        scene.set_image( $('.gallery-item').find('img').first().attr('src') );

        scene.commit();
      },self.control,scene);
    });
  }

}
module.exports = xart;