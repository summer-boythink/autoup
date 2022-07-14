var styles = {
    'red': '\x1B[31m[autoup:error]',
    'green': '\x1B[32m[autoup:info]',
    'yellow': '\x1B[33m[autoup:tip]',
}

class Print {
    constructor(){
        this.values = ""
    }
    clear(){
        this.values = ""
    }
    error(...value){
        this.clear()
        this.values = styles['red']+value+'\x1B[0m'
        console.error(this.values)
    }
    info(...value){
        this.clear()
        this.values = styles['green']+value+'\x1B[0m'
        console.info(this.values)
    }
    warn(...value){
        this.clear()
        this.values = styles['yellow']+value+'\x1B[0m'
        console.warn(this.values)
    }
}

const print = new Print()
export default print