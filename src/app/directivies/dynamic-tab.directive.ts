import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[dynamicTab]"
})
export class DynamicTabDirective {

  constructor(
    public viewContainerRef:ViewContainerRef
  ) { }

}
