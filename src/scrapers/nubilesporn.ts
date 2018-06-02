import Scraper from './Scraper.js';

class nubilesporn extends Scraper {
  protected site: string[] = ['nb'];
  protected paysite: string[] = ['Nubiles Porn'];
  protected url: string[] = ["https://nubiles-porn.com/video/gallery/%d"];
  protected increment: number=15;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://nubiles-porn.com'
    $('.videoset').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);
      let scene_url: string = baseurl + info.find('.inner-wrapper').find('a').attr('href');

      scene.set_site( info.find('.website').text().trim() );
      scene.set_title( info.find('.title').text().trim() );
      scene.set_url( scene_url );
      scene.set_image( 'https:'+ info.children('.inner-wrapper').find('img').attr('src') );
      scene.set_date(self.format_date(
        info.find('.date').text().trim(),
        'MMM DD, YYYY'
      ));
      scene.add_actors( info.find('.model').map(function(i: number, actor:any){
        return $(actor).text().trim();
      }).get() );
      scene.set_paysite_id( info.find('.inner-wrapper').find('a').attr('href').match(/watch\/(\d+)\//)[1] );

      self.get_page_content( scene_url, function(url:string, $: any, scene:any){
        scene.add_tags( $('.tags').find('a').map(function(i: number, tag:any){
          return $(tag).text();
        }).get() );
        scene.set_description( $('.video-description').find('p').first().text() );
        scene.commit();
      },self.control,scene);
    });
  }

}
module.exports = nubilesporn;