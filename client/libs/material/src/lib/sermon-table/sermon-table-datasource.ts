import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { merge, Observable, of } from 'rxjs';
import { Media, Sermon, Speaker } from '@sb/core-data';

type TableTypes = Media[] | Sermon[] | Speaker[] | any;

export class SermonTableDataSource extends DataSource<TableTypes | any> {

  constructor(public data: TableTypes = [], private sort: MatSort, private paginator?: MatPaginator) {
    super();
  }

  connect(): Observable<any[]> {

    const dataMutations = this.paginator ? [
      of(this.data),
      this.paginator.page,
      this.sort.sortChange
    ] : [
        of(this.data),
        this.sort.sortChange
      ];

    if (this.paginator) {
      this.paginator.length = this.data.length;
    }

    return merge(...dataMutations).pipe(map(() => {
      return this.paginator ? this.getPagedData(this.getSortedData([...this.data])) : this.getSortedData([...this.data]);
    }));
  }
  disconnect() { }

  private getPagedData(data: any[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: TableTypes[]) {
    if (!this.sort.active || this.sort.direction === '') {
      const sortByDate = this.data.map((res) => res).sort((a, b) => {
        return (a.created_at < b.created_at ? 1 : -1);
      });

      return sortByDate;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'subject': return compare(+a.subject, +b.subject, isAsc);
        case 'speakers': return compare(+a.speakers, +b.speakers, isAsc);
        case 'date': return compare(+a.date, +b.date, isAsc);
        case 'actions': return;
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
