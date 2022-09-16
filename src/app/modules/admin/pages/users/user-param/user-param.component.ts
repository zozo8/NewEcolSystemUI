import { Component} from "@angular/core";
import { MenuItem, LazyLoadEvent } from "primeng/api";
import { TableButtonsComponent } from "src/app/Interfaces/abstracts/TableButtonsComponent";
import { UserParam } from "src/app/models/dto/modules/admin/userParam";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

@Component({
  selector: "app-user-param",
  templateUrl: "./user-param.component.html",
  styleUrls: ["./user-param.component.css"]
})
export class UserParamComponent extends TableButtonsComponent<UserParam>{


}
