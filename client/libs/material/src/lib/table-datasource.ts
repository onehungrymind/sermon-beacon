import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { map } from 'rxjs/operators';
import { merge, Observable, of } from 'rxjs';

import { Media, MediaType, Sermon, Speaker } from '@sb/core-data';

type TableTypes = Media[] | MediaType[] | Sermon[] | Speaker[] | any;

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
        case 'title': return compare(a.title, b.title, isAsc);
        case 'subject': return compare(a.subject, b.subject, isAsc);
        case 'speakers': return compare(a.speakers, b.speakers, isAsc);
        case 'date': return compare(a.date, b.date, isAsc);
        case 'actions': return;

        // Speakers
        case 'first_name': return compare(a.first_name, b.first_name, isAsc);
        case 'last_name': return compare(a.last_name, b.last_name, isAsc);
        case 'church_name': return compare(a.church_name, b.church_name, isAsc);
        case 'speaker_sermons': return compare(a.speaker_sermons, b.speaker_sermons, isAsc);
        case 'position': return compare(a.position, b.position, isAsc);

        // Tags
        case 'value': return compare(a.value, b.value, isAsc);
        case 'property': return compare(a.property, b.property, isAsc);
        case 'sermon_tags': return compare(a.sermon_tags, b.sermon_tags, isAsc);

        // SermonTag
        case 'id': return compare(a.id, b.id, isAsc);
        case 'sermon': return compare(a.sermon, b.sermon, isAsc);
        case 'sermon_id': return compare(a.sermon_id, b.sermon_id, isAsc);
        case 'tag': return compare(a.tag, b.tag, isAsc);
        case 'tag_id': return compare(a.tag_id, b.tag_id, isAsc);

        // Media Type
        case 'sermon_id': return compare(a.sermon_id, b.sermon_id, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'embedCode': return compare(a.embedCode, b.embedCode, isAsc);
        case 'url': return compare(a.url, b.url, isAsc);
        case 'sermon': return compare(a.sermon, b.sermon, isAsc);

        // Media Type
        case 'name': return compare(a.name, b.name, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'media': return compare(a.media, b.media, isAsc);

        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
