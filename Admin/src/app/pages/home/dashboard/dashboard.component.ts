import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        
    }
    
    randomizeHead(){
        let colors = [
            'bg-danger',
            'bg-primary',
            'bg-success',
            'bg-dark',
            'bg-info',
            'bg-warning',
            'bg-secondary',
            'bg-light',
        ]
        
        return colors[Math.floor(Math.random() * colors.length)];
    }

}
