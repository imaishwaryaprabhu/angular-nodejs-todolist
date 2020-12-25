import { NgModule } from '@angular/core';

import { 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatTableModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatGridListModule,
        MatCardModule,
        MatTooltipModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTableModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatGridListModule,
        MatCardModule,
        MatTooltipModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTableModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000, verticalPosition: "top"}},
        {provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}}
    ]
})
export class AppMaterialModule { }