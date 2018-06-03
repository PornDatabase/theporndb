import Scraper from './Scraper.js';

class bangbros extends Scraper {
  protected site: string[] = ['bangbros'];
  protected paysite: string[] = ['Bangbros'];
  protected url: string[] = ["https://bangbros.com/videos/%d"];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://bangbros.com'
    $('.echThumb').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);
      let url = baseurl + info.find('.thmb_lnk').attr('href');

      try {
        scene.set_site(info.find('a.thmb_mr_lnk').text());
        scene.set_title(info.find('.thmb_lnk').attr('title'));
        scene.set_url(url);
        scene.set_image('https:' + info.find('img').attr('data-initial-image-url'));
        scene.set_date(self.format_date(info.find('.thmb_mr_cmn.thmb_mr_2.clearfix').text(), 'MMM D, YYYY'));

        scene.add_actors(info.find('.cast-wrapper').find('a').map(function (i: number, actor: any) {
          return $(actor).text();
        }).get());

        // grab scene description and actors and tags
        self.get_page_content(url, function (url: string, $: any, scene: any) {
          scene.add_tags($('.vdoTags').find('a').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.set_description($('.vdoDesc').text());
          scene.set_paysite_id($('.vdoCast').text().match(/Release:\s(\w+)/)[1]);

          scene.commit();
        }, self.control, scene);
      }
      catch(e){
        self.log('Check scraper '+self.paysite[index]);
      }
    });
  }

}
module.exports = bangbros;