import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ListService} from "../list.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

export interface Employee {
    EmployeeID?: number;
    LastName: string;
    FirstName: string;
    Title?: string;
    TitleOfCourtesy?: string;
    BirthDate?: string;
    HireDate?: string;
    Address?: string;
    City?: string;
    Region?: string;
    PostalCode?: string;
    Country?: string;
    HomePhone?: string;
    Extension?: string;
    Photo?: string;
    Notes?: string;
    ReportsTo?: number;
    PhotoPath?: string;
    Salary?: number;
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    isLoading: boolean = false;
    displayedColumns: string[] = ['EmployeeID', 'LastName', 'FirstName', 'Title', 'TitleOfCourtesy', 'BirthDate', 'HireDate', 'Address', 'City', 'Region', 'PostalCode', 'Country', 'HomePhone', 'Extension', 'Notes', 'ReportsTo', 'Salary'];

    dataSource: MatTableDataSource<Employee>;
    perPage = '8';
    page = '1';
    total = 0;

    constructor(private empService: ListService, private cdr: ChangeDetectorRef) {
        this.dataSource = new MatTableDataSource<Employee>([]);
    }

    ngOnInit(): void {
        this.getEmployees()
    }


    getEmployees(){
        this.isLoading = true;
        this.empService.getAllEmployees(this.perPage, this.page).subscribe((res: any) => {
            console.log(res.data)
            this.total = res.total;
            this.dataSource.data = res.data;
            this.isLoading = false;
            this.cdr.detectChanges();
        });

    }

    pageSelection(page: PageEvent){
        console.log(page.pageIndex)
        this.page = String(page.pageIndex+1);
        console.log("pagesize: ", this.paginator.pageSize)
        this.perPage = String(this.paginator.pageSize);
        this.getEmployees();
    }

}
