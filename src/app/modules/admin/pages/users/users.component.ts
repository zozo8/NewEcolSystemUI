import { Component, OnInit } from "@angular/core";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { UserService } from "./user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {

  list:any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next:(res:RequestBodyGetList)=> {
        console.log(res);
      }
    });

  }

}
