import Mongo from '../Mongo';
import Logger from '../lib/Logger';
const log = Logger();
let mongo = new Mongo();

class Scene {
  private scene: scene_data = {
    scene_id: "",
    site: "",
    paysite: "",
    paysite_id: "",
    title: "",
    url: "",
    image: "",
    date: "",
    actors: [],
    tags: []
  }

  /**
   * Paysite to set into scene data
   * @param {string} paysite
   */
  constructor(paysite: string = ""){
    this.scene.paysite = paysite;
  }

  /**
   * Set scene site
   * @param {string} site
   */
  public set_site(site: string): void{
    if( site ){
      this.scene.site = site.trim();
    }
  }

  /**
   * Set scene title
   * @param {string} title
   */
  public set_title(title: string): void{
    if( title ){
      this.scene.title = title.trim();
    }
  }

  /**
   * Set scene url
   * @param {string} url
   */
  public set_url(url: string): void{
    if( url ){
      this.scene.url = url.trim();
    }
  }

  /**
   * Set scene image url
   * @param {string} image
   */
  public set_image(image: string): void{
    if( image ){
      this.scene.image = image.trim();
    }
  }

  /**
   * Set scene date in YYYY-MM-DD format
   * @param {string} date
   */
  public set_date(date: string): void{
    if( date ){
      this.scene.date = date.trim();
    }
  }

  /**
   * Set scene description1
   * @param {string} description
   */
  public set_description(description: string): void{
    if( description ){
      this.scene.description = description.trim();
    }
  }

  /**
   * Set scene actors
   * @param {string[]} actors
   */
  public add_actors(actors: string[]): void{
    if( actors ){
      this.scene.actors= this.scene.actors.concat(actors);
    }
  }

  /**
   * Set scene tags
   * @param {string[]} tags
   */
  public add_tags(tags: string[]): void{
    if( tags ){
      this.scene.tags= this.scene.tags.concat(tags); 
    }
  }

  /**
   * Set unique id to identity scene from paysite
   * @param {string} unique_id
   */
  public set_paysite_id(unique_id: string): void{
    if( unique_id ){
      this.scene.paysite_id = unique_id;
    }
  }

  /**
   * Commit scene to database. The scene_id is generate using site, paysite, (unique_id|date). All non-alphanumeric characters are stripped
   */
  public commit(): void{
    if( this.scene.site && this.scene.date ){
      this.scene.scene_id = [
        this.scene.paysite,
        this.scene.site,
        (this.scene.paysite_id)? this.scene.paysite_id: this.scene.date
      ].join('_').replace(/[^A-Za-z0-9_]+/g,'').toLowerCase();

      mongo.add_scene(this.scene);
    }
    else{
      log.error("Unable to save to db, not scraped properly", this.scene);
    }
  }
}
export default Scene;