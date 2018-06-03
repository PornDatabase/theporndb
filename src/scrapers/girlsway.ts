import Scraper from './Scraper.js';

class girlsway extends Scraper {
  protected site: string[] = ['Girlsway'];
  protected paysite: string[] = ['Girlsway'];
  protected url: string[] = ["https://www.girlsway.com/en/videos//updates/0/Pornstar/%d/0"];
  protected increment: number=1;
  protected baseurl = 'https://girlsway.com';

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    $('.tlcDetails').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[index]);

        scene.set_site(info.find('.tlcSourceSite').find('a').text());
        scene.set_title(info.children('.tlcTitle').find('a').text());
        scene.set_url(self.baseurl + info.children('.tlcTitle').find('a').attr('href'));
        scene.set_image(info.parent().children('a').find('img').attr('data-original'));
        scene.set_date(self.format_date(info.find('.tlcSpecsDate').find('.tlcDetailsValue').text()));
        scene.set_description(info.find('.tlcItemDescriptionSpan').parent().children('span').last().text());
        scene.add_actors(info.find('.tlcActors').find('a').map(function (i: number, actor: any) {
          return $(actor).text();
        }).get());
        scene.add_tags(info.find('.tlcCategories').find('a').map(function (i: number, tag: any) {
          return $(tag).text();
        }).get());
        scene.set_paysite_id(info.children('.tlcTitle').find('a').attr('href').match(/(\d+)$/)[0]);
        scene.commit();
      }
      catch(e){
        self.log('Check scraper '+self.paysite[0]);
        return;
      }
    });
  }

}
module.exports = girlsway;