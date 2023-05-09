"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LEVEL_MAP = {
    debug: 0,
    info: 1,
    warning: 2,
    error: 3,
};
const TARGETS = {
    console: console.log,
    email: (arg) => {
        // replace with email handler
        return console.log(`Target: Email ${arg}`);
    },
    fileSystem: (arg) => {
        // replace with fileSystem handler
        return console.log(`Target: FileSystem ${arg}`);
    },
};
class Logger {
    constructor(targetConfigs = []) {
        this.targetConfigs = targetConfigs;
    }
    setTargetConfigs(targetConfigs) {
        this.targetConfigs = targetConfigs;
    }
    addTargetConfigs(targetConfigs) {
        this.targetConfigs = [...this.targetConfigs, ...targetConfigs];
    }
    log(str, logLevel = "debug") {
        const len = this.targetConfigs.length;
        for (var x = 0; x < len; x++) {
            if (LEVEL_MAP[logLevel] < LEVEL_MAP[this.targetConfigs[x].logLevel]) {
                return;
            }
            TARGETS[this.targetConfigs[x].target](`[${logLevel}]: ${str}`);
        }
    }
}
exports.default = Logger;
