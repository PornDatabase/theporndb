import Scraper from './Scraper.js';

class kink extends Scraper {
  protected site: string[] = ['kink'];
  protected paysite: string[] = ['Kink'];
  protected url: string[] = ["https://www.kink.com/shoots/latest/page/%d"];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://kink.com'
    $('.shoot').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scrape_url = baseurl + info.find('.shoot-thumb-image').children('a').attr('href');

        scene.set_url(scrape_url);
        scene.set_image(info.find('.roll-image').first().attr('data-imagesrc'));
        scene.set_date(self.format_date(info.find('.date').text(), 'MMM DD, YYYY'));
        scene.set_paysite_id(
          info.find('.shoot-thumb-image').children('a').attr('href').replace(/\D+/g, '')
        );

        // grab scene description and actors and tags
        self.get_page_content(scrape_url, function (url: string, $: any, scene: any) {
          scene.set_site($('.column.shoot-logo').find('a').attr('href').replace('/channel/', ''));
          scene.set_title($('.shoot-title').text());
          scene.add_actors($('.names').find('a').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.add_tags($('.starring').find('a').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.set_description($('.description').text());

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
module.exports = kink;