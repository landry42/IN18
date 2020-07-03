import { Traduction } from './traduction';
import { Structure } from './structure';
import { Folder } from './folder';

export class TraductionsGroup extends Structure {
  public tradList: Traduction[];


  public getTradList(): Traduction[] {
    return this.tradList;
  }

  public setTradList(tradList: Traduction[]): void {
    this.tradList = tradList;
  }

  public addTraduction(traduction: Traduction) {
    this.tradList.push(traduction);
  }

  public hasLanguage(language: string){
    return this.tradList.find(t => t.language == language) !== undefined;
  }

  public removeTradWrongLanguage(languages: string[]){
    this.tradList = this.tradList.filter(t => languages.find(l => l==t.language) !== undefined)
  }

  public addMissingTrad(languages: string[]){
    for (let l of languages){
      if (!this.hasLanguage(l)){
        this.addTraduction(new Traduction("", l))
      }
    }
  }

  public isValidated(): boolean {
    for (const k of this.tradList) {
      if (!k.checked) {
        return false;
      }
    }
    if (this.tradList.length === 0){
      return false;
    }
    return true;
  }

  public setTrad(traduction: Traduction) {
    const language = traduction.getLanguage();
    for (let trad of this.tradList) {
      if (language === trad.getLanguage()) {
        trad = traduction;
        break;
      }
    }
  }

  public emptyTrad() {
    return this.tradList.length==0;
  }

  constructor(name: string, parentFolder: Folder, tradList: Traduction[] = []) {
    super(name, parentFolder);
    this.tradList = tradList;
  }


}
