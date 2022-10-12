import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Import firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// Import main modules
import { ThemeModule } from './theme/theme.module';
import { ContentModule } from './content/content.module';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/services/auth.service';

const MAIN_MODULES = [ThemeModule, ContentModule, CoreModule.forRoot()];

const FIREBASE_MODULES = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFireStorageModule,
  AngularFireDatabaseModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...MAIN_MODULES,
    ...FIREBASE_MODULES,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
