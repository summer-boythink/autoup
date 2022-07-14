import { watch } from "fs";
import {exec} from 'child_process'
import print from "./print.js"

function restartFile(restartCmd){
    let childProcess = exec(restartCmd)
    childProcess.stdout.on('data',chunk => {
        console.log(chunk);
    })
    childProcess.stderr.on("data",err => {
        if(err){
            print.error(err);
        }
    })
    return childProcess
}

function generation_command(type,fileUrl){
    let restartCmd = ""
    switch (type) {
        case ".js":
            restartCmd = `node ${fileUrl}`
            break;
        case ".go":
            restartCmd = `go run ${fileUrl}`
            break
        case '.c':
            let objectName = fileUrl.slice(0,fileUrl.lastIndexOf("."))
            if(process.platform === 'win32'){
                restartCmd = `gcc -o ${objectName} ${fileUrl} && ${objectName}.exe`
            }else{
                restartCmd = `gcc -o ${objectName} ${fileUrl} && ./${objectName}`
            }
            break;
        default:
            break;
    }
    return restartCmd
}

export function process_watch(flags){
    if(flags.size === 0){
        print.error("Please re-enter the command line")
        return
    }

    let watchUrl,restartUrl,restartCmd;
    
    if(flags.has('restartFile')){
        restartUrl = flags.get('restartFile')
        
    }

    if(flags.has('notifyCwdOrFile')){
        watchUrl = flags.get('notifyCwdOrFile')
    }else{
        if(flags.has('restartFile')){
            watchUrl = flags.get('restartFile')
        }
    }
   
    if(flags.has('type')){
        restartCmd = generation_command(flags.get('type'),restartUrl)
    }

    if(flags.get('custom_restart_cmd') !== null &&flags.get('custom_restart_cmd') !== undefined){
        restartCmd = flags.get('custom_restart_cmd')
    }
    let processc = restartFile(restartCmd)
    let fsw = watch(watchUrl)

    fsw.on("change",(type,filename)  => {
        print.info(filename+" is "+type,restartUrl+" will restart")
        processc.kill()
        processc = restartFile(restartCmd)
    })  
}