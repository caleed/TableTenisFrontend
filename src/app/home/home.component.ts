import { Component, OnInit } from '@angular/core';
import { TeamDto } from '../model/teamDto';
import { PlayerControllerService } from '../services/playerController.service';
import { TeamControllerService } from '../services/teamController.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  teams: TeamDto[];
  playerNameInput: string;
  playerTeamId: number;
  newTeamName: string;
  players: any;
  itemClicked: boolean[] = [];

  constructor(private teamController: TeamControllerService,
    private playerController: PlayerControllerService
  ) { }

  ngOnInit(): void {
    this.loadTeams()
  }

  loadTeams() {
    this.teamController.allTeamsUsingGET().subscribe(t => {
      this.teams = t;
    })
  }

  addPlayer() {
    this.playerController.addPlayerUsingPOST({
      name: this.playerNameInput,
      teamId: this.playerTeamId
    }).subscribe(t => {
      console.log(t);
    }, err => {
      alert("Try again!");
    });
  }

  addTeam() {
    this.teamController.addTeamUsingPOST(this.newTeamName).subscribe(t => {
      console.log(t);
    }, err => {
      alert("Try again!");
    });
    window.location.reload();
  }

  displayTeamPlayers(id: number){ 
    this.itemClicked[id] = !this.itemClicked[id]
    this.teamController.teamPlayersUsingGET(id).subscribe(t => {
      this.players = t;
      console.log(this.players);
    })
  }
}
