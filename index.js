const testFolder = '../1-cli/src/'
const yargs = require('yargs')// for cli
var path = require('path');//

const fs = require('fs');
const { boolean } = require('yargs');
const typeList = "images,texts,bash"

// mang gom cac file dc sap xep theo alphabet
// const listAlphaBet = fs.readdirSync(testFolder).sort()
// listAlphaBet.forEach(tempt => {
//     console.log(tempt)
// })
//cac mang theo alphabet
const ad = "a,b,c,d,A,B,C,D"
const eh = "e,f,g,h,E,F,G,H"
const il = "i,j,k,l,I,J,K,L"
const mp = "m,n,o,p,M,N,O,P"
const qt = "q,r,s,t,Q,R,S,T"
const ux = "u,v,w,x,U,V,W,X"
const yz = "y,z,Y,Z"

const modifyFunc=function (nameArray,name){
    var dimentional = new Array(5);

    for (var i = 0; i < dimentional.length; i++) {
        dimentional[i] = new Array();
 }
    nameArray.forEach(file=>{
      

        var stats = fs.statSync('../1-cli/src/'+file)
        var fileSizeInBytes = stats.size;
      
        //kb
        var kb = fileSizeInBytes / (1024);
       // console.log(kb)
        //mb
        var mb = fileSizeInBytes / (1024*1024);
        var verybig=10  //mb
        var big=5       //mb
        var medium=1   //mb
        var small=100   //kb
        if(kb<small){
         //   console.log("   <100KB:")
            dimentional[0].push(file)
        }
         else if(small<kb&&kb<10*small)
         {
            dimentional[1].push(file)
         }
         else if(medium<mb&&mb<big)
         {
            dimentional[2].push(file)
         }
         else if(big<mb&&mb<verybig)
         {
            dimentional[3].push(file)
         }
         else if(verybig<mb)
         {
            dimentional[4].push(file)
         }
        })
       // if(name){typeFunc(typeArray)}
         for (var i = 0; i < dimentional.length; i++){
            if(dimentional[i].length>0){
                if(i==0)    console.log("   <100KB:")
                else if(i==1)console.log("   100KB-1MB:")
                else if(i==2)console.log("   1MB-5MB:")
                else if(i==3)console.log("   5MB-10MB:")
                else if(i==4)console.log("   >10MB:")
                if(name){typeFunc(dimentional[i])}
                else {
                for (var j = 0; j < dimentional[i].length; j++){
                    console.log("       "+dimentional[i][j])
                }
                console.log("")
            }
            }
           
        }
         
        
  

}


 const typeFunc=function (nameArray){
    var dimentional = new Array(7);

    for (var i = 0; i < dimentional.length; i++) {
        dimentional[i] = new Array();
 }
//var nameArray=new Array()
//nameArray=tempt
 nameArray.forEach(file=>{
    if (ad.includes(file.charAt(0))) {
        dimentional[0].push(file)
        //  console.log("       A-Z:")
    }
    else if (eh.includes(file.charAt(0))) { dimentional[1].push(file) }
    else if (il.includes(file.charAt(0))) { dimentional[2].push(file) }
    else if (mp.includes(file.charAt(0))) { dimentional[3].push(file) }
    else if (qt.includes(file.charAt(0))) { dimentional[4].push(file) }
    else if (ux.includes(file.charAt(0))) { dimentional[5].push(file) }
    else if (yz.includes(file.charAt(0))) { dimentional[6].push(file) }
 })
 for (var i = 0; i < dimentional.length; i++){
    if(dimentional[i].length>0){
        for (var j = 0; j < dimentional[i].length; j++){
            console.log("       "+dimentional[i][j])
        }
        console.log("")
    }
   
}

}

const loopLS = function (typeFile, name,modify) {
    var typeArray = new Array();

    // for (var i = 0; i < dimentional.length; i++) {
    //     typeArray[i] = new Array();
    // }
    fs.readdirSync(testFolder).forEach(file => {

        var ext = path.extname(file);// lay duoi file
        if (ext.includes(typeFile)) {
            typeArray.push(file)
           }
    });
    if(name&&!modify){typeFunc(typeArray)}
    else if(modify){modifyFunc(typeArray,name)}
    else {
        for (var i = 0; i < typeArray.length; i++){
                console.log("       "+typeArray[i])
        }
    }

    
}





yargs.command({
    command: 'command',
    describe: 'nothing',
    builder: {
        type: {
            describe: 'type',
            demandOption: true,
            type: 'string'
        },
        name: {
            describe: 'name',
            demandOption: false,
            type: 'boolean'
        },
        modify:{
            describe: 'modify',
            demandOption: false,
            type: 'boolean'
        }
    },
    handler: function (argv) {
        // console.log('list type file'+argv.type)
        //file type
        var listName = new Array();
        listName = argv.type.split(",").forEach(type => {
            type = type.trim()

            // console.log(type);
            if (typeList.includes(type)) {
                if (type.includes("images")) {
                    console.log(type + ":")
                 //   console.log(argv.name)
                    loopLS(".jpg",argv.name,argv.modify)
                }
            }
            if (typeList.includes(type)) {
                if (type.includes("text")) {
                    console.log(type + ":")
               //     console.log(argv.name)
                    loopLS(".txt",argv.name,argv.modify)
                }
            }
            if (typeList.includes(type)) {
                if (type.includes("bash")) {
                    console.log(type + ":")
                 //   console.log(argv.name)
                    loopLS(".bat",argv.name,argv.modify)
                }
            }
        });

    },
})
console.log(yargs.argv)