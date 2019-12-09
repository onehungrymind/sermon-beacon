import { Component, OnInit } from '@angular/core';
import { Tags, TagsService, emptyTags } from '@sb/core-data';

@Component({
  selector: 'sb-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {

  primaryColor = 'red';
  tags$;
  selectedTags: Tags;

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.getTags();
    this.resetTags();
  }

  selectTags(tags) {
    this.selectedTags = tags;
  }

  resetTags() {
    this.selectTags(emptyTags);
  }

  getTags() {
    this.tags$ = this.tagsService.all();
  }

  saveTags(tags: Tags) {
    if (!tags.id) {
      this.createTags(tags);
    } else {
      this.updateTags(tags);
    }
  }

  createTags(tags: Partial<Tags>) {
    this.tagsService.create({ ...tags })
      .subscribe(() => {
        this.getTags();
        this.resetTags();
      });
  }

  updateTags(tags: Tags) {
    this.tagsService.update(tags)
      .subscribe(() => {
        this.getTags();
        this.resetTags();
      });
  }

  deleteTags(tags: Tags) {
    this.tagsService.delete(tags)
      .subscribe(() => this.getTags());
  }

  cancel() {
    this.resetTags();
  }

}
