import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { map } from 'rxjs/operators';
import { merge, Observable, of } from 'rxjs';

import { Sermon, Speaker } from '@sb/core-data';

type TableTypes = Sermon[] | Speaker[] | any;

export class TableDataSource extends DataSource<TableTypes> {

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
        // Sermons
        case 'title': return compare(a.sermon.title, b.sermon.title, isAsc);
        case 'subject': return compare(a.sermon.subject, b.sermon.subject, isAsc);
        case 'speakers': return compare(a.sermon.sermon_speakers.map((res) => res.speaker.name), b.sermon.sermon_speakers.map((res) => res.speaker.name), isAsc);
        case 'date': return compare(a.sermon.date, b.sermon.date, isAsc);
        case 'actions': return;

        // Speakers
        case 'name': return compare(a.name, b.name, isAsc);
        case 'church_name': return compare(a.church_name, b.church_name, isAsc);
        case 'position': return compare(a.position, b.position, isAsc);
        case 'actions': return;

        // Both
        case 'created_at': return compare(a.created_at, b.created_at, isAsc);
        case 'updated_at': return compare(a.updated_at, b.updated_at, isAsc);

        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
