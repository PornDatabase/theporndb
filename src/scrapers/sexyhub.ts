import Scraper from './Scraper.js';

class sexyhub extends Scraper {
  protected site: string[] = [''];
  protected paysite: string[] = ['SexyHub'];
  protected url: string[] = ["https://www.sexyhub.com/tour/videos/%d/"];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://sexyhub.com'
    $('.article-wrapper').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);
      let scene_url: string = baseurl + info.children('a').attr('href');

      scene.set_site( info.find('.site-domain').text() );
      scene.set_title( info.find('.card-title').find('a').attr('title') );
      scene.set_url( scene_url );
      scene.set_image( baseurl + info.children('a').find('img').attr('src') );
      scene.set_date(self.format_date(
        info.find('.release-date').text().trim(),
        'MMM DD, YYYY'
      ));
      scene.add_actors( info.find('.model-name').find('a').map(function(i: number, actor:any){
        return $(actor).text();
      }).get() );
      scene.set_paysite_id( info.children('a').attr('href').match(/video\/(\d+)\//)[1] );

      self.get_page_content( scene_url, function(url:string, $: any, scene:any){
        scene.add_tags( $('.col-tags').find('a').map(function(i: number, tag:any){
          return $(tag).text().trim();
        }).get() );
        scene.set_description( $('.overview').children('p').text() );
        scene.commit();
      },self.control,scene);
    });
  }

}
module.exports = sexyhub;