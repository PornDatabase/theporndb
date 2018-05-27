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
  paysite: String,
  paysite_id: String,
  title: String,
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
   * Returns 100 most recent scenes (release date)
   */
  public get_latest_scenes(){
    return Scene.find().limit(100).sort({date:-1});
  }
}
export default Mongo;