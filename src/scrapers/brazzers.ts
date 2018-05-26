import Scraper from './Scraper.js';

class brazzers extends Scraper {
  protected site: string[] = ['brazzers','brazzers'];
  protected paysite: string[] = ['Brazzers'];
  protected url: string[] = [
  "https://www.brazzers.com/videos/all-sites/all-pornstars/all-categories/alltime/bydate/%d/",
  "https://www.brazzers.com/videos/all-sites/all-pornstars/all-categories/thismonth/mostviewed/%d/"
  ];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://brazzers.com'
    $('.release-card.scene').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);
      let scrape_url = baseurl + info.find('.card-image').children('a').attr('href');

      scene.set_site( info.find('.collection.label-small').attr('title') );
      scene.set_title( info.find('.card-image').children('a').attr('title') );
      scene.set_url( scrape_url );
      scene.set_image( 'https:'+info.find('.card-image').find('img').attr('data-src') );
      scene.set_date(self.format_date( info.find('time').text(),'MMMM DD, YYYY' ));
      scene.set_paysite_id( 
        info.find('.card-image').children('a').attr('data-trackid').match(/sceneid=(\d+)/)[1] 
      );

      // grab scene description and actors and tags
      self.get_page_content( scrape_url, function(url: string, $: any, scene:any){
        scene.add_actors( $('.related-model').find('a').map(function(i: number, actor:any){
          return $(actor).text();
        }).get() );
        scene.add_tags( $('.tag-card-container').find('a').map(function(i: number, actor:any){
          return $(actor).text();
        }).get() );
        scene.set_description( 
          $('.video-description').children('p').text().replace('Collapse','').replace(/\s+$/,'') 
        );

        scene.commit();
      },self.control,scene);
    });
  }

}
module.exports = brazzers;