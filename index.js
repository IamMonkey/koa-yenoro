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
            extname:'will be parse'//default is '.js'
        }
    */
    constructor({
        mapType=BREADTH,
        parsePath=__dirname,
    }={}) {
        this.config={mapType,parsePath};
    }
    makeRouter(callback){
        if(typeof callback==='function'){
            const {mapType,parsePath}=this.config;
            if(mapType.toLocaleLowerCase()===BREADTH){
                tools.breadth(parsePath,callback);
            }else if(mapType.toLocaleLowerCase()===DEPTH){
                tools.depth(parsePath,callback);
            }else{
                console.error('mapType mast be breadth or depth');
                console.error('node we choice breadth');
                tools.breadth(parsePath,callback);
            }
        }else{
            console.error('makeRouter need a callback');
        }
    }
}