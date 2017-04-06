const Yenoro =require('..');
const yenoro = new Yenoro({});
yenoro.makeRouter((profile,jspath)=>{
    console.log(profile);
    console.log(jspath)
});

const yenoro1 = new Yenoro({mapType:'depth'});
yenoro1.makeRouter((profile,jspath)=>{
    console.log(profile);
    console.log(jspath)
});