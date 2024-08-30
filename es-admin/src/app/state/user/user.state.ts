
import { User as Auth0User } from "@auth0/auth0-angular";

export interface UserState {
    userDetails: Auth0User | any;
}

export const initialState: UserState = {
    userDetails: undefined,
}
