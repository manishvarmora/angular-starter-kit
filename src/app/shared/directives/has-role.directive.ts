import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AuthService } from '../services/auth.service'; // adjust path as needed

@Directive({
  selector: '[appHasRole]',
  standalone: false
})
export class HasRoleDirective {
  private currentRoles: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.currentRoles = this.authService.getUserRoles();
  }

  @Input() set appHasRole(role: string | string[]) {
    const allowedRoles = Array.isArray(role) ? role : [role];

    const hasAccess = allowedRoles.some(r =>
      this.currentRoles.includes(r)
    );

    this.viewContainer.clear();

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}


// file.component.html
// -------------------
// <div *appHasRole="'admin'">Admin Content</div>
// <div *appHasRole="['admin', 'manager']">Visible to Admin or Manager</div>


// auth.service.ts
// -------------------
// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   getUserRoles(): string[] {
//     // Example: return from token or backend
//     return ['user', 'admin'];
//   }
// }

