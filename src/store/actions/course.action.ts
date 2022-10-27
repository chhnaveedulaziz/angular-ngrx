import {createAction, props} from '@ngrx/store';
import { CourseItem } from '../models/courseItem.model';


export const AddItemAction = createAction(
    '[SHOPPING] Add Item',
    props<CourseItem>()
);
