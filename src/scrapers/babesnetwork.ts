import Scraper from './Scraper.js';

class babesnetwork extends Scraper {
  protected site: string[] = ['babesnetwork'];
  protected paysite: string[] = ['Babes Network'];
  protected url: string[] = [
  "https://www.babes.com/tour/videos/all-sites/all/all/alltime/all/%d/",
  ];

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://babes.com';
    $('.scene').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scene_url = info.children('a');
        let scene_url_s = baseurl + scene_url.attr('href');

        scene.set_site(info.find('.release-site').text());
        scene.set_title(scene_url.attr('title'));
        scene.set_url(scene_url_s);
        scene.set_image('http:'+scene_url.attr('data-imageurl'));
        scene.set_date(self.format_date(info.find('.release-date').text(), 'MM/DD/YYYY'));
        scene.set_paysite_id(scene_url.attr('data-releaseid'));
        scene.add_actors(info.find('.model-names').find('a').map(function (i: number, actor: any) {
          return $(actor).text();
        }).get());

        // grab scene description and actors and tags
        self.get_page_content(scene_url_s, function (url: string, $: any, scene: any) {
          scene.add_tags($('.section-detail--tags').find('a').map(function (i: number, tag: any) {
            return $(tag).text();
          }).get());
          scene.set_description($('.section-detail--description').text().trim());

          scene.commit();
        }, self.control, scene);
      }
      catch(e){
        self.log('Check scraper '+self.paysite[0]);
        return;
      }
    });
  }

}
module.exports = babesnetwork;