import * as fromReducer from './user.reducer';
import { IAction } from 'src/app/core-module/app-store/interfaces/IAction';
import { IUserState } from './user.reducer';

describe('NotesReducer', () => {

// test spec for default action
  describe('default action', () => {
    it('should return the default state', () => {
      const { DEFAULT_USER_STATE } = fromReducer;
      const action: IAction = {
        type: 'Unknown',
        payload: ''
      };
      const state = fromReducer.user(DEFAULT_USER_STATE, action);

      expect(state).toBe(DEFAULT_USER_STATE);
    });
  });

  // test spec for user validated action
  describe('user validated action', () => {
    it('should update the property routerUrl in state', () => {
      const { DEFAULT_USER_STATE } = fromReducer;
      const newState: IUserState = 
      {
        routerUrl: "notes",
        signUpState: false
      };
      const userData = {
          userName: "Ayush Nair",
          id: 1000
      }
      const action: IAction = {
          type: '[User] USER_VALIDATED',
          payload: userData
      };
      const state = fromReducer.user(DEFAULT_USER_STATE, action);

      expect(state.routerUrl).toEqual(newState.routerUrl);
      expect(state).not.toBe(newState);
    });
  });

  
  //test spec for user signed up action
  describe('user signed up action', () => {
    it('should update the signUpState property', () => {
        const { DEFAULT_USER_STATE } = fromReducer;
        const newState: IUserState = 
        {
            routerUrl: "",
            signUpState: false
        };
       
        const action: IAction = {
            type: '[User] USER_SIGNED_UP',
            payload: false
        };
        const state = fromReducer.user(DEFAULT_USER_STATE, action);
  
        expect(state.signUpState).toEqual(newState.signUpState);
        expect(state).not.toBe(newState);
    });
  });

  //test spec for set sign up state action
  describe('set sign up state action', () => {
    it('should update the signUpState property', () => {
        const { DEFAULT_USER_STATE } = fromReducer;
        const newState: IUserState = 
        {
            routerUrl: "",
            signUpState: true
        };
       
        const action: IAction = {
            type: '[User] SET_SIGN_UP_STATE',
            payload: true
        };
        const state = fromReducer.user(DEFAULT_USER_STATE, action);
  
        expect(state.signUpState).toEqual(newState.signUpState);
        expect(state).not.toBe(newState);
    });
  });
});
