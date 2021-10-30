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

const loopLS = function (typeFile, name) {
    var dimentional = new Array(7);

    for (var i = 0; i < dimentional.length; i++) {
        dimentional[i] = new Array();
    }
    fs.readdirSync(testFolder).forEach(file => {

        var ext = path.extname(file);// lay duoi file
        if (ext.includes(typeFile)) {
            if (name) {
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
             }
             else console.log("       "+file)


        }
    });
    for (var i = 0; i < dimentional.length; i++){
        if(dimentional[i].length>0){
            for (var j = 0; j < dimentional[i].length; j++){
                console.log("       "+dimentional[i][j])
            }
            console.log("")
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
                    loopLS(".txt",argv.name)
                }
            }
            if (typeList.includes(type)) {
                if (type.includes("bash")) {
                    console.log(type + ":")
                 //   console.log(argv.name)
                    loopLS(".bat",argv.name)
                }
            }
        });

    },
})
console.log(yargs.argv)