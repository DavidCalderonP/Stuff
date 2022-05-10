import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[DragDrop]'
})
export class DragDropDirective {

  @Output() over: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() files: EventEmitter<FileList> = new EventEmitter<FileList>();
  constructor() { }

  @HostListener('dragover', ['$event'])
  public dragOver(event: any){
    this.prevent(event);
    this.over.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public dragLeave(event: any){
    this.prevent(event);
    this.over.emit(false);
  }

  @HostListener('drop', ['$event'])
  public dropFiles(event: any){
    event.preventDefault();
    this.prevent(event);
    console.log(event.dataTransfer.files);
    this.files.emit(event.dataTransfer.files);
  }

   prevent(event: any){
    event.preventDefault();
    event.stopPropagation();
  }
}
