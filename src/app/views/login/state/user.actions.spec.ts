import { UserActions } from './user.actions';

describe('UserActions', () => {
  let userActions = new UserActions();

  it('should be createable', () => expect(userActions).toBeTruthy());

  it('should create a LoginUser action', () => {
    const action = userActions.loginUser();
    expect(action.type).toEqual(UserActions.LOGIN_USER);
  });

  it('should create a UserValidated action', () => {
    const action = userActions.userValidated();
    expect(action.type).toEqual(UserActions.USER_VALIDATED);
  });

  it('should create a SignUpUser action', () => {
    const action = userActions.signUpUser();
    expect(action.type).toEqual(UserActions.SIGN_UP_USER);
  });

  it('should create a UserSignedUp action', () => {
    const action = userActions.userSignedUp();
    expect(action.type).toEqual(UserActions.USER_SIGNED_UP);
  });

  it('should create a SetSignUpState action', () => {
    const action = userActions.setSignUpState();
    expect(action.type).toEqual(UserActions.SET_SIGN_UP_STATE);
  });

  it('should create a getUserDetails action', () => {
    const action = userActions.getUserDetails();
    expect(action.type).toEqual(UserActions.GET_USER_DETAILS);
  });

  it('should create a userDetailsFetched action', () => {
    const action = userActions.userDetailsFetched();
    expect(action.type).toEqual(UserActions.USER_DETAILS_FETCHED);
  });

});