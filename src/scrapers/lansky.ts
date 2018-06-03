import Scraper from './Scraper.js';

class lansky extends Scraper {
  protected site: string[] = ['Blacked','Tushy','Vixen'];
  protected paysite: string[] = ['Lansky'];
  protected url: string[] = [
  "https://www.blacked.com/videos/?page=%d",
  "https://www.tushy.com/videos/?page=%d",
  "https://www.vixen.com/videos/?page=%d"
  ];
  protected increment: number=1;

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://'+self.site[index]+'.com'
    $('.videolist-panel-item').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);

        let img = info.find('img.panel-img').attr('srcset').split(' ')[0];
        scene.set_site(self.site[index]);
        scene.set_title(info.find('h3.videolist-panel-caption-title').find('a').text());
        scene.set_url(baseurl + info.children('a').attr('href'));
        scene.set_image(img);
        scene.set_date(self.format_date(
          info.find('.icon-calendar').parent()
            .find('.videolist-panel-caption-video-info-data').text(),
          'MMM D, YYYY'
        ));
        scene.set_description(info.find('.moreless.js-readmore').text());
        scene.add_actors(info.find('.videolist-panel-caption-text').find('a').map(function (i: number, actor: any) {
          return $(actor).text();
        }).get());
        scene.set_paysite_id(img.match(/\.com\/\w+\/(\d+)\//)[1]);

        scene.commit();
      }
      catch(e){
        self.log('Check scraper '+self.paysite[0]);
        return;
      }
    });
  }

}
module.exports = lansky;