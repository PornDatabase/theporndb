import Scraper from './Scraper.js';

class realitykings extends Scraper {
  protected site: string[] = ['realitykings','realitykings'];
  protected paysite: string[] = ['RealityKings'];
  protected url: string[] = [
  "https://www.realitykings.com/tour/videos/all-sites/all-categories/all-time/recent/%d/",
  "https://www.realitykings.com/tour/videos/all-sites/all-categories/this-month/most-viewed/%d/"
  ];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://realitykings.com'
    $('.card.card--release').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scene_url = info.find('.card-info__title').children('a')

        scene.set_site(info.find('.card-info__meta').find('a').attr('title'));
        scene.set_title(scene_url.attr('title'));
        scene.set_url(baseurl + scene_url.attr('href'));
        scene.set_image(info.find('.card-thumb__img').find('img').attr('data-original'));
        scene.set_date(self.format_date(info.find('.card-info__meta-date').text(), 'MMMM D, YYYY'));
        scene.set_paysite_id(scene_url.attr('data-trackid').match(/scene\s+\-\s+(\d+)/)[1]);

        // grab scene description and actors and tags
        self.get_page_content(baseurl + scene_url.attr('href'), function (url: string, $: any, scene: any) {
          scene.add_actors($('#trailer-desc-txt').find('h2').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.set_description($('#trailer-desc-txt').children('p').text());

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
module.exports = realitykings;