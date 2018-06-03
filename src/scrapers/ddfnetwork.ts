import Scraper from './Scraper.js';

class ddfnetwork extends Scraper {
  protected site: string[] = [
    'HotLegsandFeet', 'HandsonHardcore','DDFBusty','HouseOfTaboo',
    'EuroGirlsOnGirls','EuroTeenErotica'
  ];
  protected paysite: string[] = ['DDFNetwork'];
  protected url: string[] = [
  "https://hotlegsandfeet.com/videos/search/latest/ever/allsite/-/%d",
  "https://handsonhardcore.com/videos/search/latest/ever/allsite/-/%d",
  "https://ddfbusty.com/videos/search/latest/ever/allsite/-/%d",
  "https://houseoftaboo.com/videos/search/latest/ever/allsite/-/%d",
  "https://eurogirlsongirls.com/videos/search/latest/ever/allsite/-/%d",
  "https://euroteenerotica.com/videos/search/latest/ever/allsite/-/%d",
  ];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://'+self.site[index]+'.com'
    $('.card').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scene_url = baseurl + info.children('a').attr('href');

        scene.set_site(self.site[index]);
        scene.set_title(info.children('a').attr('title'));
        scene.set_url(scene_url);
        scene.set_image(info.children('a').find('img').attr('data-lazy'));
        scene.set_date(self.format_date(info.find('.card-footer').find('small').text(), 'MMM DD, YYYY'));
        scene.set_paysite_id(info.children('a').attr('href').match(/(\d+)$/)[0]);


        // grab scene description and actors and tags
        self.get_page_content(scene_url, function (url: string, $: any, scene: any) {
          scene.add_actors($('.actors').find('a').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.add_tags($('.tags').find('a').map(function (i: number, tags: any) {
            return $(tags).text();
          }).get());
          scene.set_description($('#descriptionBox').find('.box-container').text().replace(/\s{2,}/, ''));

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
module.exports = ddfnetwork;