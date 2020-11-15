import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  isLoggingEnabled = true;

  consoleLog(args){
    console.log(args);
  }
}
