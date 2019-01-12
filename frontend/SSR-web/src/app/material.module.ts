
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule,
     MatProgressSpinnerModule, MatCardModule, MatTabsModule,
     MatListModule,MatDialogModule,MatStepperModule,MatAutocompleteModule} from '@angular/material'
@NgModule({
    imports: [MatButtonModule, MatToolbarModule,MatInputModule,
               MatProgressSpinnerModule, MatCardModule, MatTabsModule,
               MatListModule,MatDialogModule,MatStepperModule,MatAutocompleteModule],
               
    exports: [MatButtonModule, MatToolbarModule,MatInputModule,
               MatProgressSpinnerModule, MatCardModule, MatTabsModule,
               MatListModule,MatDialogModule,MatStepperModule,MatAutocompleteModule]
})

export class MaterialModule {}