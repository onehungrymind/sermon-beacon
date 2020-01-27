import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { MediaType } from '@sb/core-data';
import { MediaTypesFacade } from '@sb/core-state';

@Component({
  selector: 'sb-sermons-media',
  templateUrl: './sermons-media.component.html',
  styleUrls: ['./sermons-media.component.scss']
})
export class SermonsMediaComponent implements OnInit {
  @Input() index: number;
  @Input() mediaGroup: FormGroup;
  @Input() mediaArrayLength: number;

  @Output() removedAt = new EventEmitter();

  mediaTypes$: Observable<MediaType[]> = this.mediaTypesFacade.allMediaTypes$;

  constructor(private mediaTypesFacade: MediaTypesFacade) { }

  ngOnInit() {
    this.mediaTypesFacade.loadMediaTypes();
  }

  removeMediaGroup() {
    this.removedAt.emit(this.index);
  }

}
