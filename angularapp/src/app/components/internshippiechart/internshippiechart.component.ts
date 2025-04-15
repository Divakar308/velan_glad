import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internshippiechart',
  templateUrl: './internshippiechart.component.html',
  styleUrls: ['./internshippiechart.component.css']
})
export class InternshippiechartComponent implements OnInit {
  applications: any[] = [];
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.applications = navigation?.extras.state?.['applications'] || [];
  }

  ngOnInit() {
    if (this.applications.length === 0) {
      console.log('No data received');
      return;
    }
    this.drawPieChart();
  }

  drawPieChart() {
    if (!this.applications || this.applications.length === 0) {
      console.log("No applications found for chart");
      return;
    }

    const degreeCounts: { [key: string]: number } = {};
    this.applications.forEach(app => {
      degreeCounts[app.DegreeProgram] = (degreeCounts[app.DegreeProgram] || 0) + 1;
    });

    const data = Object.values(degreeCounts);
    const labels = Object.keys(degreeCounts);
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#1ABC9C'];

    const canvas = this.pieCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const total = data.reduce((acc, value) => acc + value, 0);
    let startAngle = 0;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Draw labels
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    
    
    // let labelY = 20;

    const labelStartX = centerX + radius + 40; // Adjusted position to move labels slightly away
    let labelY = centerY - (labels.length * 14);

    labels.forEach((label, index) => {
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(labelStartX, labelY, 15, 15); // Color box
      ctx.fillStyle = '#000';
      ctx.fillText(`${label}: ${data[index]}`, labelStartX + 25, labelY + 12); // Text with more space
      labelY += 30; // Increase vertical spacing
    });

  }
}
