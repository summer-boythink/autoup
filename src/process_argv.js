import { accessSync, constants, writeFileSync } from 'fs';
import {process_config} from "./process_config.js"
import print from "./print.js"


let configJsonStr = JSON.stringify({
    restartFile:"./index.js", //TODO:multiple files restart
    notifyCwd:"./",
    restartTime:1000, //TODO:deferred update
    type:".js",
    custom_restart_cmd:null
},null,2)

function createInit(){
    let pwd = process.cwd()
    let filename = `${pwd}/.autoup.json`

    try {
        accessSync(filename,constants.F_OK)
        print.warn(filename+" is exists,no require init")
    } catch (e) {
        writeFileSync(filename,configJsonStr)
        print.info("init complete")
    }
}

function checkargv(argv){
    let supportargv = ['-f','-d']
    if(supportargv.indexOf(argv) === -1){
        print.error(` no support symbol ${argv}`)
        process.exit(1)
    }
}

export function process_argv(argv){
    let cmd = new Map();
    //method by config file
    if(argv.length === 1 && argv[0].toLowerCase() === "init"){
        createInit()
        process.exit(1)
    }

    if(argv.length === 0){
        process_config(cmd)
    }

    //method by cmd
    for(let i = 0;i<argv.length;i+=2){
        if(argv[i].indexOf("-") != -1){
            checkargv(argv[i])
            if(!argv[i+1]){
                print.error(` argv is error,${argv[i]} should value`)
                process.exit(1)
            }
            cmd.set(argv[i],argv[i+1])
        }
    }
    return cmd
}