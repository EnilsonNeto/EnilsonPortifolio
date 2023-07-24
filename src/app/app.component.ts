import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Enilson-portfolio';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

    this.addSvgIcons(iconRegistry, sanitizer)

  }

  ngOnInit() {
  }

  addSvgIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('menu',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/menu.svg'))
      .addSvgIcon('arrow',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/arrow_top_right.svg'))
      .addSvgIcon('dribble',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/dribble.svg'))
      .addSvgIcon('github',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/github.svg'))
      .addSvgIcon('instagram',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/instagram.svg'))
      .addSvgIcon('linkedin',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/linkedin3.svg'))
      .addSvgIcon('discord',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/discord.svg'))
      .addSvgIcon('gitter',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/gitter.svg'))
  }
}
