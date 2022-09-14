import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TextFormatService {

  constructor() { }

  public firstLetterToLowerCase(word:string):string {
    let firstLetter = word.substring(0,1).toLowerCase();
    return firstLetter+(word.substring(1));
  }
}
