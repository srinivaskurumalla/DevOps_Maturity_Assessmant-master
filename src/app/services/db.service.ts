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

  // addData(data: any): Observable<any> {
  //   debugger
  //   //const dataWithId = data.map((item, index) => ({ id: index + 1, ...item }));
  //   return this.http.post<any>(this.apiUrl, data);
  // }
  // updateData(data: any, id: number): Observable<any> {
  //   debugger
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, data);

  // }
  // getDataByItemAndIdentifier(name: string): Observable<any[]> {
  //   return new Observable(observer => {
  //     this.getAllData().subscribe(
  //       (data) => {
  //         this.totalData = data;
  //         console.log('total data', this.totalData);
  //         debugger
  //         // Filter data based on name
  //         //const filteredData = this.totalData.flatMap(dataArray => dataArray.filter((item: any) => item.item === name));
  //         const filteredData = this.totalData.filter((item: any) => item.item === name);
  //         if (filteredData.length > 0) {
  //           observer.next(filteredData); // Emit filtered data
  //         } else {
  //           observer.next([]); // Emit empty array if no matching items are found
  //         }
  //         observer.complete(); // Complete the observable
  //       },
  //       (error) => {
  //         console.error('Error fetching data:', error);
  //         observer.error(error); // Emit error if any
  //       }
  //     );
  //   });
  // }
  // getAllData(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
}
