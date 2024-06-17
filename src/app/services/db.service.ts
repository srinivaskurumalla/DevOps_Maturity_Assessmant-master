import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, catchError, filter, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  //private apiUrl = 'http://localhost:3000/centene'
  private table1: any[] = [];
  private table2: any[] = [];
  isHomeRoute = false;
  projectData: any;
  imageData: string  | null = null;

  // private apiUrl = 'src/assets/db.json';
  isSidebarOpen: boolean = true
  http = inject(HttpClient)
  totalData: any[] = []
  allScores: { item: string, identifier: string, value: number }[] = []
  messageService = inject(MessageService)

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isHomeRoute = event.url === '/home' || event.url === '/';
      });

    this.projectData = JSON.parse(sessionStorage.getItem('devOpsForm')!)

  }
  showSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  showInfo(msg: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: msg });
  }

  showWarn(msg: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: msg });
  }

  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }




  setTable1(data: any[]) {
    this.table1 = data;
    localStorage.setItem('table1', JSON.stringify(data));
  }

  getTable1() {
    if (!this.table1.length) {
      const storedData = localStorage.getItem('table1');
      this.table1 = storedData ? JSON.parse(storedData) : [];
    }
    return this.table1;
  }

  setTable2(data: any[]) {
    this.table2 = data;
    localStorage.setItem('table2', JSON.stringify(data));
  }

  getTable2() {
    if (!this.table2.length) {
      const storedData = localStorage.getItem('table2');
      this.table2 = storedData ? JSON.parse(storedData) : [];
    }
    return this.table2;
  }


  setImageData(data: string ) {
    this.imageData = data;
  }

  getImageData(): string | null {
    return this.imageData;
  }
}
