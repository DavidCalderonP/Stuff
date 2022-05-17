import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'blobsafe'
})
export class BlobsafePipe implements PipeTransform {

  constructor(private dom: DomSanitizer){}

  transform(value: string): any {
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }

}
