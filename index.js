/**
 * Created by fan on 2016/6/21.
 */
var path=require('path');
var fs=require('fs');
var routesDir=null;

//路由设置
function makeRouter(dir,callback) {
    routesDir=dir.replace(/\\/g, '/');
    yenoroBreadth(routesDir,function (url,jsPath) {
        callback(url,jsPath);
    });
}
function pathParse(pathname){
    return pathname.replace(/\\/g, '/')
                    .replace(/.js/,'')
                    .replace(/\/index/,'')
                    .replace(routesDir+'/','/')
                    .replace(routesDir,'/')
                    .replace(/\{\+\}/g,'*')
                    .replace(/\{\=\}/g,'?')
                    .replace(/\{\-\}/g,'/')
                    .replace(/{\.\.}/g,':');
}
//深度优先 过时
function yenoroDepth(dir,callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file).replace(/\\/g, '/');
        if (fs.statSync(pathname).isDirectory()) {
            if(file.toString()!='other'){
                yenoro(pathname,callback);
            }
        } else {
            var rname=pathParse(pathname);
            callback(rname,pathname);
        }
    });
}

//广度优先 2.0
function yenoroBreadth(dir, callback) {
    var d = [],f = [],index = {};
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file).replace(/\\/g, '/');
        if (fs.statSync(pathname).isDirectory()) {
            if (file.toString() != 'other') {
                d.push(pathname);
            }
        } else {
            var rname=pathParse(pathname);
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
        yenoroBreadth(d[i], callback);
    }
}

exports.makeRouter=makeRouter;