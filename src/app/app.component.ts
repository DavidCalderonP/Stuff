import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs';

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
    files: string[] = [];

    ngOnInit() {
        data.subscribe(res => {
            //console.log(res);
            this.images = res;
        })
    }

    getFiles(files: string[] | File[]) {
        console.log("Esto tengo en el padre: ", files);
    }

    getCurrentFiles(files: string[]) {
        console.log("las filas actuales en el padre son: ", files)
      this.images = files
    }

}
