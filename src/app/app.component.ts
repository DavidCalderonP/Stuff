import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FilesService } from "./services/files.service";

const data = of(['https://cdn.pixabay.com/photo/2022/05/05/20/01/australian-shepherd-7176981_960_720.jpg',
  'https://cdn.pixabay.com/photo/2021/11/17/19/47/balloons-6804504_960_720.jpg',
  'https://cdn.pixabay.com/photo/2021/12/15/04/21/skyscraper-6871750_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/01/07/15/51/woman-591576_960_720.jpg',
  'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_960_720.jpg',
  'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg']);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Stuff';
  images: string[] = [];
  files: string[] | File[] = [];

  constructor(private filesService: FilesService) {
  }
  ngOnInit() {
    data.subscribe(res => {
      //console.log(res);
      this.images = res;
    })
  }

  getFiles(files: string[] | File[]) {
    console.log("Esto tengo en el padre: ", files);
    this.files = files;
    console.log("this.files: ", this.files)
  }

  getCurrentFiles(files: string[]) {
    console.log("las filas actuales en el padre son: ", files)
    this.images = files
  }

  onSumbit() {
    this.filesService.sendXml(this.files).subscribe(res => {
      console.log(res);
    });
  }

  sendFotos() {
    const data = {
      images: this.files
    };
    this.filesService.sendFotos(data).subscribe(res => {
      console.log(res);
    });
  }

  downloadFile() {
    this.filesService.downloadFile().subscribe(data => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "files";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }



  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
  }
}
