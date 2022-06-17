import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { DragDropDirective } from './components/drag-drop/drag-drop.directive';
import { BlobsafePipe } from './components/drag-drop/blobsafe.pipe';
import { ParentComponent } from './components/ChangeDetectionStrategy/parent/parent.component';
import { ChildComponent } from './components/ChangeDetectionStrategy/child/child.component';
import { HighlighterDirective } from './components/ChangeDetectionStrategy/highlighter.directive';
import { ListComponent } from './components/Northwind/list/list.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    DragDropDirective,
    BlobsafePipe,
    ParentComponent,
    ChildComponent,
    HighlighterDirective,
    HighlighterDirective,
    ListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
