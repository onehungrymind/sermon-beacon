import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '@sb/core-data';

@Component({
  selector: 'sb-no-video',
  templateUrl: './no-video.component.html',
  styleUrls: ['./no-video.component.scss']
})
export class NoVideoComponent implements OnInit {
  isMobile: boolean = this.breakpointService.isMobile();

  constructor(private breakpointService: BreakpointService) { }

  ngOnInit() {
  }

}
