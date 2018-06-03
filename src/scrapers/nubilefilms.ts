import Scraper from './Scraper.js';

class nubilefilms extends Scraper {
  protected site: string[] = ['Nubile Films'];
  protected paysite: string[] = ['Nubile Films'];
  protected url: string[] = ["https://nubilefilms.com/video/gallery/%d"];
  protected increment: number=15;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://nubilefilms.com'
    $('.videoset').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scene_url: string = baseurl + info.find('.title').attr('href');

        scene.set_site('Nubile Films');
        scene.set_title(info.find('.title').text());
        scene.set_url(scene_url);
        scene.set_date(self.format_date(
          info.find('.date').text(),
          'MMM DD, YYYY'
        ));
        scene.add_actors(info.find('.model').map(function (i: number, actor: any) {
          return $(actor).text();
        }).get());
        scene.set_image('https:' + info.find('.img-responsive').attr('src'));
        scene.set_paysite_id(info.find('.title').attr('href').match(/watch\/(\d+)\//)[1]);

        self.get_page_content(scene_url, function (url: string, $: any, scene: any) {
          scene.set_description($(".video-description").children('article').text());
          scene.add_tags($('.tags').find('a').map(function (i: number, tag: any) {
            return $(tag).text();
          }).get());

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
module.exports = nubilefilms;