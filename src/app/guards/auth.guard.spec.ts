import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {

    let authGuard: AuthGuard;
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const authMock = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn']);

    beforeEach(() => {;
        authGuard = new AuthGuard(routerMock);
    });

    it('should be createable', () => expect(authGuard).toBeTruthy());

    it('should return true for canActivate()', ()=> {
        authMock.isLoggedIn.and.returnValue(true);
        localStorage.setItem('userName', JSON.stringify('Ayush Nair'));
        localStorage.setItem('userId',JSON.stringify(1000) );
        const result = authGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'testUrl'});
        expect(result).toBe(true);
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
    });

    it('should return false for canActivate()', ()=> {
        authMock.isLoggedIn.and.returnValue(false);
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        const result = authGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'testUrl'});
        expect(result).toBe(false);
    });

});