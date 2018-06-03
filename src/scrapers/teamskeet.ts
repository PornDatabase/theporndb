import Scraper from './Scraper.js';

class teamskeet extends Scraper {
  protected site: string[] = ['Team Skeet'];
  protected paysite: string[] = ['Team Skeet'];
  protected url: string[] = [
  "https://www.teamskeet.com/t1/updates/load?view=newest&fltrs[tags]=&fltrs[site]=ALL&page=%d&changedOrder=0&fltrs[tags]=&fltrs[time]=ALL&fltrs[site]=ALL&order=DESC&tags_select=&fltrs[title]=",
  ];

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://teamskeet.com';
    $('.white').each(function(i: number, elem: any){
      try {
        let info = $(elem);
        let scene = self.get_sceneObj(self.paysite[0]);
        let scene_url = info.children('a');
        info = $(elem).find('.info');

        scene.set_site(info.find('a').last().text());
        scene.set_title(info.find('a').first().text());
        scene.set_url(scene_url.attr('href'));
        scene.set_image(scene_url.find('img').attr('data-original'));
        scene.set_date(self.format_date(info.find('p').first().text(), 'MM/DD/YYYY'));

        // grab scene description and actors and tags
        self.get_page_content(scene_url.attr('href'), function (url: string, $: any, scene: any) {
          let actor_string = $("h3").text();
          let actors = [];

          if (actor_string.indexOf("and") > -1) {
            actors = [actor_string];
          }
          else {
            actors = actor_string.split(/\s*and\s*/);
          }

          scene.add_actors(actors);
          scene.add_tags($('div:contains("Tags:")').parent().children('div').last().find('a').map(function (i: number, tag: any) {
            return $(tag).text().replace(/\s{2,}/, '');
          }).get());
          scene.set_description($('.gray').last().text());

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
module.exports = teamskeet;