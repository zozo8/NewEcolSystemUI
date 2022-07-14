import { Component, OnInit} from "@angular/core";
import { Observable} from "rxjs";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { UserService } from "./user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {

  dataObj:Observable<ResponseBodyGetList>;

  constructor(
   private userService:UserService
  ) { }

  ngOnInit(): void {
    this.dataObj = this.userService.getUsers();
  }

}
