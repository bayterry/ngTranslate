import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

    constructor(private http: HttpClient) {}

    translate(source: string, target: string, text: string) {
        return this.http.get(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${text}`
        ).pipe(
            map((res: any) => {
                return res[0][0][0];
            })
        );
    }
}
