import { Injectable } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private titleService: Title,
    private metaTagService: Meta,

  ) { }


  objectToFormData(obj: any): FormData {
    let res = new FormData();
    Object.keys(obj).forEach((key: string) => {
      res.append(key, obj[key]);
    })
    return res;
  }
}
