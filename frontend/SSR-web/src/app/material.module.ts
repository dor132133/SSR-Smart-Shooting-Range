
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule,
     MatProgressSpinnerModule, MatCardModule, MatTabsModule,
     MatListModule,MatDialogModule,MatStepperModule,MatAutocompleteModule,
     MatSelectModule,MatIconModule,MatSnackBarModule,MatExpansionModule,
     MatBottomSheetModule} from '@angular/material'
@NgModule({
    imports: [MatButtonModule, MatToolbarModule,MatInputModule,
               MatProgressSpinnerModule, MatCardModule, MatTabsModule,
               MatListModule,MatDialogModule,MatStepperModule,MatAutocompleteModule,
               MatSelectModule,MatIconModule,MatSnackBarModule,MatExpansionModule,
               MatBottomSheetModule],
               
    exports: [MatButtonModule, MatToolbarModule,MatInputModule,
               MatProgressSpinnerModule, MatCardModule, MatTabsModule,
               MatListModule,MatDialogModule,MatStepperModule,MatAutocompleteModule,
               MatSelectModule, MatIconModule,MatSnackBarModule,MatExpansionModule,
               MatBottomSheetModule]
})

export class MaterialModule {}