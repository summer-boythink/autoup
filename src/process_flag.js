export function process_flag(cmdMap){
    let res = new Map();

    //process cmd
    if(cmdMap.has('-f')){
        let filename = cmdMap.get('-f')
        res.set("restartFile",filename)
        cmdMap.delete("-f")
        let type = filename.slice(filename.lastIndexOf("."))
        res.set("type",type)
    }

    if(cmdMap.has('-d')){
        res.set('notifyCwdOrFile',cmdMap.get('-d'))
        cmdMap.delete("-d")
    }

    //process config file
    for(const [k,v] of cmdMap){
        res.set(k,v)
    }
    return res
}