import bodyParser from "body-parser";
import express from "express";
import Mongo from "./Mongo";
import scrapers from "./scrapers";
import Logger from "./lib/Logger";
const log = Logger();

if(! process.env.NOAPI ){
  // define some useful params to be used
  let rarbgAPI = require('rarbg');
  let rarbg = new rarbgAPI();
  let mongo = new Mongo();
  const port: number = Number(process.env.PORT) || 8080;

  // define API http express server
  let app: express.Application = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // define API routes
  app.all('/api/scenes/',function(req ,res){
    let scene: any = req.body;
    if( Object.keys(scene).length !== 0 ){
      mongo.scene_find(scene).exec(function(err: string, docs: scene_data[]){
        res.send(docs);
      })
    }
    else{
      mongo.get_latest_scenes().exec(function(err: string,docs: scene_data[]){
        res.send(docs);
      })
    }
  });
  app.all('/api/search/',function(req,res){
    let query = req.body.query;

    rarbg.search({
      search_string: query,
      sort: 'seeders',
      category: rarbg.categories.XXX,
      min_seeders: 10
    })
    .then(function(torrents: any){
      res.send(torrents);
    })
    .catch(function(err: string){
      res.send([err]);
    })
  });

  // start server
  app.listen(port);
  log.info('Webserver has started');
}

if(! process.env.NOSCRAPE ){
  let schedule = require('node-schedule');
  let scraper = new scrapers();
  log.info('Scraping server started');

  // scrape every 6 hours
  schedule.scheduleJob('0 */6 * * *',function(){
    log.info('Beginning to scrape');
    scraper.scrape_all();
  });
}