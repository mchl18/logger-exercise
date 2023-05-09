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

class Logger {
  targetConfigs: TargetConfig[];

  constructor(targetConfigs: TargetConfig[] = []) {
    this.targetConfigs = targetConfigs;
  }

  setTargetConfigs(targetConfigs: TargetConfig[]) {
    this.targetConfigs = targetConfigs;
  }

  log(str: string, logLevel: LogLevel = "debug") {
    for (const config of this.targetConfigs) {
      if (LEVEL_MAP[logLevel] < LEVEL_MAP[config.logLevel]) {
        return;
      }
      TARGETS[config.target](`[${logLevel}]: ${str}`);
    }
  }
}
const logger = new Logger([
  { logLevel: "debug", target: "console" },
  { logLevel: "error", target: "email" },
]);

// only prints debug console
logger.log("hello world");

// prints console and email
logger.log("hello world", "error");
