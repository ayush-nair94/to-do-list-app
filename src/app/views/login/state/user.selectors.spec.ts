import * as fromSelectors from './user.selectors';
import { IUserState } from './user.reducer';

describe('NotesSelectors', () => {
    let userState: IUserState;
    beforeEach(() => {
        userState = {
            routerUrl: "notes",
            signUpState: false
        }
    });

    it('should select the view loading flag', () => {
        const routerUrl: string = "notes";
        const result = fromSelectors.getRouterUrl.projector(userState);
        expect(result).toEqual(routerUrl);
    });

    it('should select the active tab', () => {
        const result = fromSelectors.getSignUpState.projector(userState);
        expect(result).toEqual(false);
    });
});
