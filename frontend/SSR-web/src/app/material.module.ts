
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule,
     MatProgressSpinnerModule, MatCardModule, MatTabsModule,
     MatListModule,MatDialogModule } from '@angular/material'

@NgModule({
    imports: [MatButtonModule, MatToolbarModule,MatInputModule,
               MatProgressSpinnerModule, MatCardModule, MatTabsModule,
               MatListModule,MatDialogModule],
               
    exports: [MatButtonModule, MatToolbarModule,MatInputModule,
               MatProgressSpinnerModule, MatCardModule, MatTabsModule,
               MatListModule,MatDialogModule]
})

export class MaterialModule {}