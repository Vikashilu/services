import rTracer from 'cls-rtracer';

enum LogLevel {
  Info,
  Warn,  
  Error,
  Log 
}

const COLORS: Record<number, string> = {
  [LogLevel.Info]: "\x1b[36m",
  [LogLevel.Warn]: "\x1b[33m",
  [LogLevel.Error]: "\x1b[31m",
  [LogLevel.Log]: ""
};

interface Loggable {
  toString(): string;
}

function flush(message: string | Loggable, level:LogLevel=LogLevel.Log): void {  
  const requestId = rTracer.id() ? `[trace-id ${rTracer.id()}] ` : "";
  process.stdout.write(`${COLORS[level]}${requestId}${message}${COLORS[level]}\n`);
}

export function requestId(): any {
  return rTracer.id();
}

export const runWithTracer = rTracer.runWithId;

export class logger {
  
  static bootstrap() {
    return rTracer.expressMiddleware({useHeader: true, echoHeader: true});
  }
  
  static info(message: string | Loggable) {
    flush(`${message}`, LogLevel.Info);
  }
  
  static warn(message: string | Loggable) {
    flush(`${message}`, LogLevel.Warn);
  }
  
  static error(message: string | Loggable) {
    flush(`${message}`, LogLevel.Error);
  }
  
  static log(message: string | Loggable) {
    flush(`${message}`, LogLevel.Log);
  }
  
}
