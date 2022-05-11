import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  @Input() formatReturn: 'base64' | 'filelist' = 'base64';
  @Input() limit: number = 25;
  @Input() current: string[] = [];
  @Input() showImages: boolean = true;
  @Input() showEmptyImages: boolean = true;
  @Input() colorShadow: string = '#ff0000';

  @Output() filesDropped: EventEmitter<File[] | string[]> = new EventEmitter<File[] | string[]>();
  @Output() filesCurrent: EventEmitter<string[]> = new EventEmitter<string[]>();

  currentFiles: string[] = [];
  filesBase64: string[] = [];
  allFiles: string[] = [];
  isOver: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.current.forEach(image => this.currentFiles.push(image))
  }

  printEvent(event: any) {
    console.log(event.type)
  }

  isOverLimit(files: FileList) {
    return (files.length + this.currentFiles.length + this.filesBase64.length) > this.limit;
  }

  async getFiles(event: any) {
    console.log(event)
    console.log(event.type);

    if (this.isOverLimit(event)) {
      console.log("El numero de filas está excediendo el límite perimitido.");
      return;
    }
    if (event.type) {
      event = event.target.files;
      if (this.isOverLimit(event)) {
        console.log("El numero de filas está excediendo el límite perimitido.");
        return;
      }
    }

    switch (this.formatReturn) {
      case 'base64':
        let base64Collection: string[] = [];
        for (const file of event) {
          base64Collection.push(await this.toBase64(file) as string);
          this.filesBase64.push(await this.toBase64(file) as string);
        }
        this.filesDropped.emit(base64Collection);
        console.log("Emitiendo: ", base64Collection);
        break;
      case 'filelist':
        let fileCollection: File[] = [];
        for (const file of event) {
          fileCollection.push(file);
        }
        console.log(fileCollection)
        this.filesDropped.emit(fileCollection);
        break;
    }
  }

  deleteImage(idx: number, where: string) {
    switch (where) {
      case 'temp':
        this.filesBase64.splice(idx, 1);
        this.filesDropped.emit(this.filesBase64);
        console.log("Emitiendo: ", this.filesBase64);

        break;
      case 'current':
        this.currentFiles.splice(idx, 1);
        this.filesCurrent.emit(this.currentFiles);
        console.log("Emitiendo: ", this.currentFiles);
        break;
    }

  }

  async toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
