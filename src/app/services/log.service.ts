import { Injectable } from '@angular/core';
import {Log} from "../models/Log";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

@Injectable()
export class LogService {
  logs: Log[];

  private logSource =
    new BehaviorSubject<Log>(
    {id: null,text: null,date: null}
    );

  selectedLog = this.logSource.asObservable();

  private stateSource =
    new BehaviorSubject<boolean>(true);

  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs =  [];
  }

  getLogs(): Observable<Log[]> {
    if(localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a,b) => {
      return b.date - a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  create(log: Log) {
    this.logs.unshift(log);

    //Add to local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  update(log: Log) {
    this.logs.forEach((cur,index) => {
      if(cur.id === log.id) {
        this.logs.splice(index,1);
      }
    });
    this.logs.unshift(log);

    //Update local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  delete(log: Log) {
    this.logs.forEach((cur,index) => {
      if(cur.id === log.id) {
        this.logs.splice(index,1);
      }
    });

    //Delete from local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
