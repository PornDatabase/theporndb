import Scraper from './Scraper.js';

class clubseventeen extends Scraper {
  protected site: string[] = ['clubseventeen'];
  protected paysite: string[] = ['Club Seventeen'];
  protected url: string[] = ["https://www.clubseventeen.com/videos.php?page=%d#page-%d"];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://clubseventeen.com';
    $('.list_item').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);
      let scrape_url = baseurl + info.find('.video-link').attr('href');
      let date = info.find('.title').last().text().split('|')[0].trim();

      if( ! info.find('.pink_border').attr('src') ){
        return;
      }

      scene.set_site( self.site[index] );
      scene.set_url( scrape_url );
      scene.set_image( info.find('.pink_border').attr('src') );
      scene.set_date(self.format_date( date,'MMMM DD, YYYY' ));
      scene.set_paysite_id(info.find('.pink_border').attr('src').match(/static_\d+\/(\d+\/\d+)\//)[1]);
      scene.set_title( info.find('.title').first().text() );

      // grab scene description and actors and tags
      self.get_page_content( scrape_url, function(url: string, $: any, scene:any){
        scene.add_actors( $('.subtitle.row').first().find('a').map(function(i: number, actor:any){
          return $(actor).text();
        }).get() );
        scene.add_tags( $('.niche-label').map(function(i: number, tag:any){
          return $(tag).text();
        }).get() );

        scene.commit();
      },self.control,scene);
    });
  }

}
module.exports = clubseventeen;