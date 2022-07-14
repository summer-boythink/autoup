import {readFileSync} from "fs"
import print from "./print.js"

function injectCmd(cmd,config){
    Object.keys(config).forEach(configKey => {
        cmd.set(configKey,config[configKey])
    })
}

export function process_config(cmd){
    try {
        let pwd = process.cwd()
        let filename = `${pwd}/.autoup.json`
        let config = JSON.parse(readFileSync(filename).toString())
        injectCmd(cmd,config)
    } catch (e) {
        print.error(" Please run the [autoup init] command first")
        process.exit(1)
    }
}