// // import the interface
import { CourseItem } from '../models/courseItem.model';
import {AddItemAction} from '../actions/course.action';
import {Action, createReducer, on} from "@ngrx/store";
// //create a dummy initial state

const initialState: Array<CourseItem> = [];

const reducer = createReducer(
    initialState,
    on(AddItemAction, (state, action) => {
        console.log(action)
      return [...state, action]
    })
);

export function CourseReducer(state: Array<CourseItem> | undefined, action: Action) {
  return reducer(state, action);
}
