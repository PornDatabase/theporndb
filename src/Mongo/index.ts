import Logger from "../lib/Logger";
const mongoose = require('mongoose');
const log = Logger();
mongoose.connect(process.env.MONGODB)
  .catch(function(){
    log.error('Unable to connect to database')
  });

/**
 * Scene document schema definition
 */
let Scene = mongoose.model('Scene',{
  scene_id: {
    type: String,
    required: true,
    unique: true
  },
  site: {
    type: String,
    required: true
  },
  paysite: {
    type: String,
    required: true
  },
  paysite_id: String,
  title: {
    type: String,
    required: true
  },
  url: String,
  image: String,
  date: {
    type: String,
    index: true,
    required: true
  },
  description: String,
  actors: [String],
  tags: [String]
});

/**
 * Returns the input date string as a formatted
 * string for the database query
 * @param {string} date
 * @returns {string}
 */
function get_date(date: number): string{
  var d = new Date(date),
    month = '' + (d.getUTCMonth() + 1),
    day = '' + d.getUTCDate(),
    year = d.getUTCFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

/**
 * Database class to handle all database operations
 */
class Mongo {

  /**
   * Adds scene to database and returns 
   * @param scene
   * @returns {Promise<T | void>}
   */
  public add_scene(scene: scene_data){
    // make sure date is formated correctly
    if( ! /^\d{4}\-\d{2}\-\d{2}/.test(scene.date) ){
      log.warn("Scene not formatted correctly", scene);
      return;
    }

    return new Scene(scene).save()
    .then(()=>log.info('Added scene: ' + scene.scene_id))
    .catch((err: any)=>{
      if( err.message.indexOf('duplicate key error') < 0 ){
        log.error(err.message);
      }
    }); 
  }

  /**
   * Returns all scenes matching the given input query
   * @param {scene_data} scene
   */
  public scene_find(scene: scene_data){
    return Scene.find(scene).sort({date:-1});
  }

  /**
   * Returns scenes released within the last 7 days.
   */
  public get_latest_scenes(){
    let today = new Date();
    let date = get_date(today.setDate(today.getDate()-7));
    return Scene.find({date:{'$gte':date}}).sort({date:-1});
  }
}
export default Mongo;