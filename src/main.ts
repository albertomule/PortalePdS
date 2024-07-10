import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'zone.js';
import { RootModule } from './app/root/root.module';

platformBrowserDynamic()
  .bootstrapModule(RootModule)
  .catch((err) => console.error(err));
