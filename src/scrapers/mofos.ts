import Scraper from './Scraper.js';

class mofos extends Scraper {
  protected site: string[] = ['Mofos'];
  protected paysite: string[] = ['Mofos'];
  protected url: string[] = [
  "https://www.mofos.com/tour/videos/all-videos/all-models/all-categories/alltime/bydate/%d/",
  ];

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://mofos.com';
    $('.widget-release-card').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);

      scene.set_site( info.find('.site-name').text().replace(/\s{2,}/,'') );
      scene.set_title( info.children('a').find('img').attr('alt').replace(/^[^\-]+\-\s+/,'') );
      scene.set_url( baseurl+info.children('a').attr('href') );
      scene.set_image( 'https:'+info.children('a').find('img').attr('src') );
      scene.set_date(self.format_date( info.find('.date-added').text(), 'MMM DD, YYYY' ));
      scene.set_paysite_id( info.children('a').attr('href').match(/(\d+)\/$/)[1] );

      // grab scene description and actors and tags
      self.get_page_content(baseurl+info.children('a').attr('href'), function(url: string, $: any, scene:any){
        scene.add_actors($('.girls-site-box ').find('.model-name').map(function(i: number, actor:any){
          return $(actor).text().replace(/\s{2,}/,'').replace(/^\s+/,'');
        }).get() );
        scene.add_tags( $('.categories').find('a').map(function(i: number, tag:any){
          return $(tag).text();
        }).get() );
        scene.set_description( $('p.desc').text() );

        scene.commit();
      }, self.control, scene);
    });
  }

}
module.exports = mofos;