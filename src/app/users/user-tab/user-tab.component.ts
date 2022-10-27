import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, startWith} from 'rxjs';

import {CourseItem} from "../../../store/models/courseItem.model";
import {AppState} from "../../../store/models/app-state.model";


@Component({
  selector: 'user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {
  @ViewChild('filterInputRef') private readonly filterInput: ElementRef;

  courseItems$: Observable<Array<CourseItem>>;
  masterCourseItems$: Observable<Array<CourseItem>>;

  data: Array<CourseItem>;

  constructor(
      private titleService: Title,
      private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.courseItems$ = this.store.select((store) => store.course);
    this.masterCourseItems$ = this.courseItems$;
    this.store.select((store) => store.course).subscribe((d) => {
      this.data = d;
    });
  }

  ngAfterViewInit() {
    fromEvent(this.filterInput.nativeElement, 'keyup').pipe(
        map((_event: any) => (<HTMLInputElement>_event.target).value.toLocaleLowerCase()),
        startWith(''),
        debounceTime(30),
        distinctUntilChanged(),
    ).subscribe((value: string) => {
      if (value.length === 0) {
        this.courseItems$ = this.masterCourseItems$;
      } else {
        this.courseItems$.subscribe((data) => {
          const newData = data.filter((x) => x.email?.toLowerCase().indexOf(this.filterInput.nativeElement.value.toLowerCase()) !== -1,
          );
          this.courseItems$ = of(newData)
        });
      }
    });
  }
}
