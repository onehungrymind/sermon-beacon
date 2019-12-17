import { Component, OnInit } from '@angular/core';
import { TagsFacade } from '@sb/core-state';
import { Observable } from 'rxjs';
import { Tag } from '@sb/core-data';

@Component({
  selector: 'sb-sermons-tags',
  templateUrl: './sermons-tags.component.html',
  styleUrls: ['./sermons-tags.component.scss']
})
export class SermonsTagsComponent implements OnInit {
  tags$: Observable<Tag[]> = this.tagsFacade.allTags$;

  constructor(private tagsFacade: TagsFacade) { }

  ngOnInit() {
    this.tagsFacade.loadTags();
  }

}
