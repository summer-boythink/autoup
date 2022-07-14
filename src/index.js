import {process_argv} from "./process_argv.js"
import {process_flag} from "./process_flag.js"
import {process_watch} from "./process_watch.js"

function main() {
    let argv = process.argv.slice(2)
    let cmdMap = process_argv(argv)
    let flags = process_flag(cmdMap)
    process_watch(flags)
}

main()