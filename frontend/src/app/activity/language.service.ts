import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private keyLanguage = 'lang';
  private _userLanguage = '';
  private supportedLanguages = ['en', 'fr'];

  constructor(
    private translate: TranslateService
  ) { 
    this.initLanguage();
    this.translate.use(this._userLanguage);
  }

  initLanguage() {
    const lang = localStorage.getItem(this.keyLanguage);
    if (lang != null) {
      this._userLanguage = lang;
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      this._userLanguage = 'en';
      if (this.supportedLanguages.includes(browserLanguage)) {
        localStorage.setItem(this.keyLanguage, browserLanguage);
      }
    }
  }

  setLanguage(language: string) {
    this._userLanguage = language;
    localStorage.setItem(this.keyLanguage, this._userLanguage);
    this.translate.use(this._userLanguage);
  }

  get userLanguage() {
    return this._userLanguage;
  }

  getAvailablesLanguages() {
    return this.supportedLanguages;
  }

}
