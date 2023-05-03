import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'app/core/services';
import { noop, tap } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  @Input()
  set appHasRole(roles: Array<string>) {

    if (roles?.length !== 0) {

      this.authService.hasRole(roles).pipe(tap((hasRole: boolean) => {
        if (hasRole) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      })).subscribe(noop)
    } else {
      this.viewContainerRef.clear();
    }

  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private authService: AuthenticationService) { }


}
