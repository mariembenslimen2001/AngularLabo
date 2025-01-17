import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/services/publication.service';
import { EvenementService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  nb_members :number= 0;
  nb_articles :number= 0;
  nb_events:number= 0;
  nb_tools :number= 0;
  articlesMemberArr : string[];

  //bar

  radarChartLabels: string[] = [];
  radarChartData: ChartDataset[] = [
    { data: [], label: 'enseignants' },
    { data: [], label: 'etudiants' },
  
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Invités' }
  ];
  radarChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          stepSize: 1, // Set the step size to 1 to display only integers
          precision: 0
        },
      },
    },
  };
  //bar
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[];

  // line
  chartData: ChartDataset[] = [
    // {

    //   // ⤵️ Add these
    //   label: 'articles',
    //   data: [ ]
    // },
    // {
    //   label: 'outils',
    //   data: [ ]
    // }

  ];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          precision: 0,
          
      }
      },
    }
  };

  // pie
  chartTypeData: ChartDataset[];
  chartTypesLabel: string[] = ["etudiant", "enseignant"];

  // pie
  etablissementTypeData: ChartDataset[];
  etablissementTypesLabel: string[] = [];

  constructor (private ES: EvenementService, private TS: ToolService, private PS: PublicationService, private MS: MemberService)
  {


    // this.nb_events = ES.tab.length;


  }

  ngOnInit():void{
    this.MS.getMembers().subscribe(members =>{

      members.forEach(element => {

        this.chartLabels.push(element.nom + " " + element.prenom);

      });
      this.nb_members = members.length;
    })

    this.MS.getNbPubMembers().subscribe((tab) => {

       this.chartData= [...this.chartData, {
        label: 'articles',
        data: [...tab ]
    }]
    });
    this.MS.getNbOutilMembers().subscribe((tab)=> { 
      this.chartData= [...this.chartData, {
        label: 'outils',
        data: [...tab ]
    }]
     });
    this.MS.getNumberPerMemberType().subscribe((mapRole) => {
      console.log(mapRole);
      var etudiantValue = mapRole['etudiant'];
      var enseignantValue = mapRole['enseignant'];
      // pie
      this.chartTypeData = [
        {
          // ⤵️ Add these
          label: 'Number',
          data: [etudiantValue, enseignantValue]
        }
      ];



    })
    this.TS.getTools().subscribe((tools) => {this.nb_tools = tools.length})
    this.ES.getEvenements().subscribe((events)=> {this.nb_events = events.length})
    this.PS.getPublications().subscribe((pubs)=> {this.nb_articles = pubs.length})
    this.ES.getFullYearsEvents(2020,2025).subscribe((events)=>{
      // console.log(events);
      this.barChartData = [
        { data: [...events], label: 'Evenements' },
        //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Invités' }
      ];
    })
    this.MS.getNumberPerMemberGrade().subscribe((map) => {
      console.log(map);
      this.radarChartLabels = this.radarChartLabels.concat(Object.keys(map));
      
      // For enseignant table
      
        this.radarChartData[0].data = this.radarChartData[0].data.concat(Object.values(map));
      
    
      // For etudiant table
      this.radarChartData[1].data = this.radarChartData[1].data.concat(new Array(Object.values(map).length).fill(0));
      
      // console.log("enseignant ", this.radarChartData);
    });
    
    this.MS.getNumberPerMemberDiplome().subscribe((map) => {
      // console.log(map);
      this.radarChartLabels = this.radarChartLabels.concat(Object.keys(map));
    
      // For enseignant table
      this.radarChartData[1].data = this.radarChartData[1].data.concat(Object.values(map));
    
      // For etudiant table
      
        this.radarChartData[0].data = this.radarChartData[0].data.concat(new Array(Object.values(map).length).fill(0));
      
    
      // console.log("etudiant ", this.radarChartData);
    });

    this.MS.getNumberPerMemberEtablissement().subscribe((map) => {
      console.log(map);
      this.etablissementTypesLabel = this.etablissementTypesLabel.concat(Object.keys(map));
      this.etablissementTypeData = [
        {
          // ⤵️ Add these
          label: 'Enseigants',
          data: Object.values(map)
        }];
      // For enseignant table
    
      console.log("etudiant ", this.etablissementTypeData);
    });
  }

}
