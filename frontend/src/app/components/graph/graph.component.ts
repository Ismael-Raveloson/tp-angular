import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { title } from 'process';


var dataPolice = [ 
  { police: 'Contrat 1' , acte: 'Garantie Lunette' , nombre: '2' , prix: '60000' },
  { police: 'Contrat 1' , acte: 'Garantie Pharmacie' , nombre: '5' , prix: '190000' },
  { police: 'Contrat 1' , acte: 'Garantie Cantine' , nombre: '22' , prix: '6000000' },
  { police: 'Contrat 2' , acte: 'Garantie Hospitalisation' , nombre: '7' , prix: '20000000' },
  { police: 'Contrat 2' , acte: 'Garantie Lunette' , nombre: '12' , prix: '750000' },
  { police: 'Contrat 2' , acte: 'Garantie acte 2' , nombre: '15' , prix: '700000' }
];


function formatPrix(prix: number): string {
  return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function convertirDonneesPourCanvasJS(dataPolice: any[]): any[] {
  const donneesConverties: any[] = [];
  const policesUniques = [...new Set(dataPolice.map(item => item.police))];

  policesUniques.forEach(police => {
    const actesDeLaPolice = dataPolice.filter(item => item.police === police);

    actesDeLaPolice.forEach(acte => {
      
      const dataPointNombre = {
        y: parseInt(acte.nombre),
        toolTipContent: `<span style="font-size: 18px;">${police} - ${acte.acte}</span><br>Nombre : <span style="color: #4F81BC;">${acte.nombre}</span>` // Bleu pour le nombre
      };

      const dataPointPrix = {
        y: parseInt(acte.prix),
        toolTipContent: `<span style="font-size: 18px;">${police} - ${acte.acte}</span><br>Prix : <span style="background-color: #C0504E;">${formatPrix(parseInt(acte.prix))} Ar </span>` // Rouge pour le prix
      };

      if (!donneesConverties.find(series => series.name === 'Nombre')) {
        donneesConverties.push({
          type: "column",
          name: "Nombre",
          legendText: "Nombre Consommation",
          showInLegend: true,
          dataPoints: [dataPointNombre]
        });
      } else {
        donneesConverties.find(series => series.name === 'Nombre').dataPoints.push(dataPointNombre);
      }

      if (!donneesConverties.find(series => series.name === 'Prix')) {
        donneesConverties.push({
          type: "column",
          name: "Prix",
          legendText: "Somme Remboursement",
          showInLegend: true,
          axisYType: "secondary",
          dataPoints: [dataPointPrix]
        });
      } else {
        donneesConverties.find(series => series.name === 'Prix').dataPoints.push(dataPointPrix);
      }
    });
  });

  return donneesConverties;
}

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule,RouterOutlet,CanvasJSAngularChartsModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})

export class GraphComponent {
  chartOptions = {
    animationEnabled: true,

    toolTip: {
      title: 'Nombre/Revenu de garantie/police'
    },
    axisY2:{
      minimum: 0,
      interval: 1000000
    },
    legend: {
      cursor:"pointer",
      itemclick: function(e: any){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
        }
        else {
        e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: convertirDonneesPourCanvasJS(dataPolice)
  }
}
