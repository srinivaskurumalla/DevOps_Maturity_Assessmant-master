import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();
  isAnimated = true
  headerClasses = ''
  constructor(private router: Router,public dbService:DbService) { }
  ngOnInit(): void {
    if (this.isAnimated) {
      this.headerClasses = 'gemini-header animated';
    } else {
      this.headerClasses = 'gemini-header';
    }  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }


}
