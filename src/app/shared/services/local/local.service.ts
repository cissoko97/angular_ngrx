import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import *  as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  /**
   *
   * @param key
   * @param value
   */
  public saveData(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
  }

  /**
   *
   * @param key
   * @returns
   */
  public getData(key: string): string {
    const data = localStorage.getItem(key) as string;
    return this.decrypt(data);
  }

  /**
   *
   * @param key
   */
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  /**
   *
   */
  public clearData() {
    localStorage.clear();
  }

  /**
   *
   * @param txt
   * @returns
   */
  private encrypt(txtToEncypt: string): string {
    return CryptoJS.AES.encrypt(txtToEncypt, environment.key).toString();
  }

  /**
   *
   * @param txtToDecrypt
   * @returns
   */
  private decrypt(txtToDecrypt: string): string {
    if (txtToDecrypt) {
      return CryptoJS.AES.decrypt(txtToDecrypt, environment.key).toString(CryptoJS.enc.Utf8);
    } else
      return '';
  }
}
