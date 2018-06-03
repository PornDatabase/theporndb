import Scraper from './Scraper.js';

class fantasymassage extends Scraper {
  protected site: string[] = [''];
  protected paysite: string[] = ['FantasyMassage'];
  protected url: string[] = [
  "https://www.fantasymassage.com/en/videos/AllCategories/0/Actor/0/updates/%d"
  ];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://fantasymassage.com'
    $('.tlcItem').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scene_url = baseurl + info.find('.tlcTitle').find('a').attr('href');

        scene.set_site(info.find('.tlcSourceSite').find('a').text());
        scene.set_title(info.find('.tlcTitle').find('a').attr('title'));
        scene.set_url(scene_url);
        scene.set_image(info.find('img').attr('data-original'));
        scene.set_date(self.format_date(info.find('.tlcSpecsDate').find('.tlcDetailsValue').text(), 'YYYY-MM-DD'));
        scene.set_paysite_id(info.find('.tlcTitle').find('a').attr('href').match(/(\d+)$/)[0]);

        // grab scene description and actors and tags
        self.get_page_content(scene_url, function (url: string, $: any, scene: any) {
          scene.add_actors($('.actorList').find('.pornstarName').map(function (i: number, actor: any) {
            return $(actor).children('strong').text();
          }).get());
          scene.add_tags($('.sceneCol.sceneColCategories').find('a').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.set_description($('.sceneDesc').text().replace('Video Description:', '').replace(/^\s+/, ''));

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
module.exports = fantasymassage;