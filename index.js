/**
 * Created by fan on 2016/6/21.
 */
const path=require('path');
const fs=require('fs');
const tools=require('./tools');

const BREADTH='breadth';
const DEPTH='depth';
module.exports = class yenoro{
    /**
       * Initialize a new `Application`.
       *
       * @api public
    /*
        config={
            mapType:'breadth', breadth or depth
            path:,must be a absoute path
            filter:['name or path'],
            extname:'will be load'//default is '.js'
        }
    */
    constructor({
        mapType=BREADTH,
        parsePath=__dirname,
        filter=[],
        extname=['.js']
    }={}) {
        const config={mapType,parsePath,filter,extname};
        this.config=config;
    }
    makeRouter(callback){
        const {mapType,parsePath,filter,extname}=this.config;
        if(mapType.toLocaleLowerCase()===BREADTH){
            tools.breadth(parsePath,filter,extname,callback);
        }else if(mapType.toLocaleLowerCase()===DEPTH){
            tools.depth(parsePath,filter,extname,callback);
        }
    }
    
    
}