import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  @Input() formatReturn: 'base64' | 'filelist' = 'filelist';
  @Input() limit: number = 100;
  @Input() current: string[] = [];
  @Input() showImages: boolean = true;
  @Input() showEmptyImages: boolean = true;
  @Input() colorShadow: string = '#ff0000';
  @Input() maxSizePerFile: number = 100;
  @Input() filesTypesAcceptable: string[] = ['jpg', 'png', 'jpeg'];

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
    //this.parseFileList(event as FileList);
    console.log(event)
    console.log(event.type);

    console.log(URL.createObjectURL(event.target.files[0]));


    if (this.isOverLimit(event)) {
      console.log("El numero de filas está excediendo el límite permitido.");
      return;
    }
    if (event.type) {
      event = event.target.files;
      if (this.isOverLimit(event)) {
        console.log("El numero de filas está excediendo el límite perimitido.");
        return;
      }
    }
    event = this.parseEvent(event);

    console.log("Event: ", event);

    event = this.removeLargeFiles(event);


    event = this.removeTypesUnsupported(event);
    //console.log("Event despues de filtrar: ", event);

    switch (this.formatReturn) {
      case 'base64':
        let base64Collection: string[] = [];
        for (const file of event) {
          base64Collection.push(await this.toBase64(file) as string);
          this.filesBase64.push(await this.toBase64(file) as string);
        }
        this.filesDropped.emit(this.filesBase64.concat(...base64Collection));
        console.log("Todo: ", this.filesBase64);
        break;
      case 'filelist':
        let fileCollection: File[] = [];
        for (const file of event) {
          fileCollection.push(file);
          const blob = await this.getFileWithoutBase64(file) as string;
          console.log("blob: ", blob);

          this.currentFiles.push(blob);
        }
        console.log("emitiendo: ",fileCollection)
        this.filesDropped.emit(fileCollection);
        break;
    }
  }

  getFileWithoutBase64(file: File){
    return new Promise((resolve, reject)=>{
      resolve(URL.createObjectURL(file));
    })
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

  toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  parseEvent(event: FileList){
    return Array.from(event);
  }

  removeLargeFiles(files: File[]){
    let filesResult: File[]= [];
    for (const file of files) {
      if(!(file.size/(1024**2)>this.maxSizePerFile)){
        filesResult.push(file);
      }else{
        console.log(`El archivo ${file.name} está sobre el límite permitido.`);
      }
    }
    return filesResult;
  }

  removeTypesUnsupported(files: File[]){
    let result: File[] = [];
    for (let file of files) {
      if(this.filesTypesAcceptable.some(type=>file.type.includes(type))){
        console.log("Entro con este archivo, su tipo es: ", file.type);
        result.push(file);
      }else{
        console.error("No entro con este archivo, su tipo es: ", file.type);
      }
    }
    return result;
  }

}
