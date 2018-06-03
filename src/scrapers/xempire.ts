import Scraper from './Scraper.js';

class xempire extends Scraper {
  protected site: string[] = ['DarkX','HardX','LesbianX','EroticaX'];
  protected paysite: string[] = ['XEmpire'];
  protected url: string[] = [
  "https://www.darkx.com/en/videos/AllCategories/0/%d",
  "https://www.hardx.com/en/videos/AllCategories/0/%d",
  "https://www.lesbianx.com/en/videos/AllCategories/0/%d",
  "https://www.eroticax.com/en/videos/AllCategories/0/%d",
  ];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://'+self.site[index]+'.com'
    $('.sceneContainer').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scene_url = info.find('.imgLink.tnoScene');

        scene.set_site(self.site[index]);
        scene.set_title(scene_url.attr('title'));
        scene.set_url(baseurl + scene_url.attr('href'));
        scene.set_image(scene_url.find('img').attr('data-original'));
        scene.set_date(self.format_date(info.find('.sceneDate').text(), 'MM-DD-YYYY'));
        scene.set_paysite_id(scene_url.attr('data-id'));

        // grab scene description and actors and tags
        let scrape_url = baseurl + scene_url.attr('href');
        self.get_page_content(scrape_url, function (url: string, $: any, scene: any) {
          scene.add_actors($('.actorCarousel').find('a').map(function (i: number, actor: any) {
            return $(actor).children('span').text();
          }).get());
          scene.add_tags($('.sceneCol.sceneColCategories').find('a').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.set_description($('.sceneDesc').children('p').text());

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
module.exports = xempire;