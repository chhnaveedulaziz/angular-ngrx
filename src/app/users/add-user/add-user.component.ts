import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {AddItemAction} from "../../../store/actions/course.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/models/app-state.model";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
    selector: 'my-app',
    templateUrl: './add-user.component.html',
    styleUrls: ['add-user.component.css']
})
export class AddUserComponent {

    formGroup: FormGroup;
    post: any = '';

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<AddUserComponent>
                ) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            'email': [null, null],
            'name': [null, null],
            'about': [null, null],
        });
    }

    onSubmit(form: any) {
        this.store.dispatch(AddItemAction(form));
        this.formGroup.reset();
        this.dialogRef.close(AddUserComponent);
    }

}
