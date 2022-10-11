import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[dynamicTab]"
})
export class DynamicTabDirective {

  test:string;

  constructor(
    public viewContainerRef:ViewContainerRef
  ) { }

}
