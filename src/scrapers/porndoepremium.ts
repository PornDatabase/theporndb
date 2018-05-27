import Scraper from './Scraper.js';

class porndoepremium extends Scraper {
  protected site: string[] = ['porndoepremium'];
  protected paysite: string[] = ['Porndoe Premium'];
  protected url: string[] = [
  "https://porndoepremium.com/videos?sort=recent&page=%d",
  ];

  protected scrape_page(url: string, $:any, index: number, self: any):void {
    let baseurl = 'https://porndoepremium.com';
    $('.video-item-big').each(function(i: number, elem: any){
      let info = $(elem);
      let scene = self.get_sceneObj(self.paysite[0]);

      scene.set_site( info.find('.v-channel.d-lg-none').text() );
      scene.set_title( info.find('.v-title').text() );
      scene.set_url( baseurl+info.children('.preview').attr('href') );
      scene.set_image( info.children('.preview').find('img').first().attr('src') );
      scene.set_date(self.format_date( info.find('.ico.ico-calendar').parent().children('.txt').text(), 'DD.MM.YY' ));
      scene.set_paysite_id( info.children('.preview').attr('href').match(/trailer\/(\d+)/)[1] );
      scene.add_actors( info.find('.v-models').find('a').map(function(i: number, actor:any){
        return $(actor).text();
      }).get() );

      // grab scene description and actors and tags
      self.get_page_content(baseurl+info.children('a').attr('href'), function(url: string, $: any, scene:any){
        scene.add_tags( $('.card.card-body').children('p').first().find('a').map(function(i: number, tag:any){
          return $(tag).text();
        }).get() );
        scene.set_description($('.description').text());

        scene.commit();
      }, self.control, scene);
    });
  }

}
module.exports = porndoepremium;