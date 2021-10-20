import { Injectable } from '@angular/core';

export let isDebugMode = () => {
    let location = window.location.origin;
    return location.includes('localhost');
}
const noop = (): any => undefined;

export abstract class Logger {
	info: any;
	warn: any;
	error: any;
}

@Injectable()
export class LoggerService implements Logger {

	info: any;
	warn: any;
	error: any;

	invokeConsoleMethod(type: string, args?: any):void{};

}

@Injectable()
export class ConsoleLoggerService implements Logger {

  constructor() { }

  get info() {
  	if(isDebugMode) {
  		return console.info.bind(console);
  	} else {
  		return noop;
  	}
  }

  get warn() {
  	if(isDebugMode) {
  		return console.warn.bind(console);
  	} else {
  		return noop;
  	}
  }

  get error() {
  	if(isDebugMode) {
  		return console.error.bind(console);
  	} else {
  		return noop;
  	}
  }

  public invokeConsoleMethod(type: string, args?: any): void {
  	const logFn: Function = (console)[type] || console.log || noop;
  	logFn.apply(console, [args]);
  }

}
