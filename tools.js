/**
 * Created by fan on 2016/6/21.
 */


//var routesDir=null;

//路由设置

//function makeRouter(dir,callback) {
//    routesDir=dir.replace(/\\/g, '/');
//    yenoroBreadth(routesDir,function (url,jsPath) {
//        callback(url,jsPath);
//    });
//}

const path=require('path');
const fs=require('fs');

function pathParse(initdir,pathname){
    return pathname.replace(/\\/g, '/')
                    .replace(/.js/,'')
                    .replace(/\/index/,'')
                    .replace(initdir+'/','/')
                    .replace(initdir,'/')
                    .replace(/\{\+\}/g,'*')
                    .replace(/\{\=\}/g,'?')
                    .replace(/\{\-\}/g,'/')
                    .replace(/{\.\.}/g,':');
}
//深度优先 1.0
function yenoroDepth(dir,filter,extname,callback,initdir=dir) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file).replace(/\\/g, '/');
        if (fs.statSync(pathname).isDirectory()) {
            yenoroDepth(pathname,filter,extname,callback,initdir);
        } else {
            if(path.extname(pathname)=='.js'){
                var rname=pathParse(initdir,pathname);
                callback(rname,pathname);
            }
        }
    });
}

//广度优先 2.0
function yenoroBreadth(dir,filter,extname,callback,initdir=dir) {
    var d = [],f = [],index = {};
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file).replace(/\\/g, '/');
        if (fs.statSync(pathname).isDirectory()) {
            if (file.toString() != 'other') {
                d.push(pathname);
            }
        } else {
            var rname=pathParse(initdir,pathname);
            if(path.extname(pathname)=='.js'){
                if (pathname.indexOf('index.js')>0) {
                    index={rname: rname,pathname: pathname};
                } else {
                    f.push({rname: rname,pathname: pathname});
                }
            }
        }
    });
    if (index.rname != undefined) {
        f.push(index);
    }
    var flength = f.length;
    for (var i = 0; i < flength; i++) {
        var obj=f.pop();
        callback(obj.rname,obj.pathname);
    }
    for (var i = 0; i < d.length; i++) {
        yenoroBreadth(d[i],filter,extname,callback,initdir);
    }
}
exports.depth=yenoroDepth;
exports.breadth=yenoroBreadth;