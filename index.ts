type LogLevel = "debug" | "info" | "warning" | "error";

const LEVEL_MAP = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
};
type Target = "console" | "email" | "fileSystem";

type TargetConfig = {
  target: Target;
  logLevel: LogLevel;
};

const TARGETS = {
  console: console.log,
  email: (arg: string) => {
    // replace with email handler
    return console.log(`Target: Email ${arg}`);
  },
  fileSystem: (arg: string) => {
    // replace with fileSystem handler
    return console.log(`Target: FileSystem ${arg}`);
  },
};

export default class Logger {
  targetConfigs: TargetConfig[];

  constructor(targetConfigs: TargetConfig[] = []) {
    this.targetConfigs = targetConfigs;
  }

  setTargetConfigs(targetConfigs: TargetConfig[]) {
    this.targetConfigs = targetConfigs;
  }

  addTargetConfigs(targetConfigs: TargetConfig[]) {
    this.targetConfigs = [...this.targetConfigs, ...targetConfigs];
  }

  log(str: string, logLevel: LogLevel = "debug") {
    const len = this.targetConfigs.length;
    for (var x = 0; x < len; x++) {
      if (LEVEL_MAP[logLevel] < LEVEL_MAP[this.targetConfigs[x].logLevel]) {
        return;
      }
      TARGETS[this.targetConfigs[x].target](`[${logLevel}]: ${str}`);
    }
  }
}
