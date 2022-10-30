import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentListComponent } from './components/student-list/student-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule  } from '@angular/material/table';
import { MatCheckboxModule  } from '@angular/material/checkbox';
import { MatFormFieldModule   } from '@angular/material/form-field';
import { MatInputModule   } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UpdateStudentComponent } from './components/update-student/update-student.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    StudentDetailsComponent,
    StudentListComponent,
    UpdateStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatBadgeModule,
    MatTableModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSlideToggleModule,
    TableModule,
    PaginatorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
