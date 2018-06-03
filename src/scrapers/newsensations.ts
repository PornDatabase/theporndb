import Scraper from './Scraper.js';

class newsensations extends Scraper {
  protected site: string[] = ['newsensations'];
  protected paysite: string[] = ['New Sensations'];
  protected url: string[] = ["https://www.newsensations.com/tour_ns/category.php?id=5&page=%d&s=d"];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://newsensations.com/';
    $('.update_details').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scrape_url = baseurl + info.find('a').first().attr('href');
        let date = info.find('.date_small').text().trim().replace(/Released:\s/, '');

        scene.set_site("New Sensations");
        scene.set_url(scrape_url);
        //scene.set_image( info.find('.update_thumb').attr('src0_2x') );
        scene.set_date(self.format_date(date, 'MM/DD/YYYY'));
        scene.set_paysite_id(info.attr('data-setid'));

        // grab scene description and actors and tags
        self.get_page_content(scrape_url, function (url: string, $: any, scene: any) {
          scene.add_actors($('.update_models').find('a').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.add_tags($('.update_tags').find('a').map(function (i: number, actor: any) {
            return $(actor).text();
          }).get());
          scene.set_description($('.update_description').text().trim());
          scene.set_title($('.update_title').text().trim());

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
module.exports = newsensations;