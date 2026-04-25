import { IUserState } from './type';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

const initialState: IUserState = {
  user: {
    name: '',
    email: ''
  },
  orders: [],
  isAuthenticatedChecked: false,
  getOrdersLoading: false,
  getOrdersError: null,
  loginLoading: false,
  loginError: null,
  registerLoading: false,
  registerError: null,
  logoutLoading: false,
  logoutError: null,
  getUserLoading: false,
  getUserError: null,
  updateUserLoading: false,
  updateUserError: null
};

const getUserOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

const loginThunk = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    const response = await loginUserApi(loginData);

    if (!response.success) {
      return rejectWithValue(response);
    }

    localStorage.setItem('refreshToken', String(response.refreshToken));
    setCookie('accessToken', String(response.accessToken));

    return response.user;
  }
);

const registerThunk = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (registerData, { rejectWithValue }) => {
    const response = await registerUserApi(registerData);
    if (!response.success) {
      return rejectWithValue(response);
    }

    localStorage.setItem('refreshToken', String(response.refreshToken));
    setCookie('accessToken', String(response.accessToken));

    return response.user;
  }
);

const logoutThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();

    if (!response?.success) {
      return rejectWithValue(response);
    }

    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }
);

const getUserThunk = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    const response = await getUserApi();

    if (!response?.success) {
      return rejectWithValue(response);
    }

    return response.user;
  }
);

const updateUserThunk = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (updateData, { rejectWithValue }) => {
    const response = await updateUserApi(updateData);
    if (!response.success) {
      return rejectWithValue(response);
    }

    return response.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user,
    getOrders: (state) => state.orders,
    getIsAuthenticated: (state) =>
      state.user.name !== '' && state.user.email !== '',
    getIsAuthenticatedChecked: (state) => state.isAuthenticatedChecked
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrdersThunk.pending, (state) => {
      state.getOrdersLoading = true;
      state.getOrdersError = null;
    });
    builder.addCase(getUserOrdersThunk.fulfilled, (state, action) => {
      state.getOrdersLoading = false;
      state.getOrdersError = null;
      state.orders = action.payload;
    });
    builder.addCase(getUserOrdersThunk.rejected, (state, action) => {
      state.getOrdersLoading = false;
      state.getOrdersError = action.error;
    });

    builder.addCase(loginThunk.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginError = null;
      state.user = action.payload;
      state.isAuthenticatedChecked = true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.meta.rejectedWithValue
        ? (action.payload as SerializedError)
        : action.error;
      state.user = {
        name: '',
        email: ''
      };
      state.isAuthenticatedChecked = true;
    });

    builder.addCase(registerThunk.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.registerLoading = false;
      state.registerError = null;
      state.user = action.payload;
      state.isAuthenticatedChecked = true;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.registerLoading = false;
      state.registerError = action.meta.rejectedWithValue
        ? (action.payload as SerializedError)
        : action.error;
      state.user = {
        name: '',
        email: ''
      };
      state.isAuthenticatedChecked = true;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.logoutLoading = true;
      state.logoutError = null;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.logoutLoading = false;
      state.logoutError = null;
      state.user = {
        name: '',
        email: ''
      };
      state.isAuthenticatedChecked = false;
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.meta.rejectedWithValue
        ? (action.payload as SerializedError)
        : action.error;
      state.isAuthenticatedChecked = false;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.getUserLoading = true;
      state.getUserError = null;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.getUserLoading = false;
      state.getUserError = null;
      state.user = action.payload;
      state.isAuthenticatedChecked = true;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.getUserLoading = false;
      state.getUserError = action.meta.rejectedWithValue
        ? (action.payload as SerializedError)
        : action.error;
      state.isAuthenticatedChecked = true;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.updateUserLoading = true;
      state.updateUserError = null;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.updateUserLoading = false;
      state.updateUserError = null;
      state.user = action.payload;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.updateUserLoading = false;
      state.updateUserError = action.meta.rejectedWithValue
        ? (action.payload as SerializedError)
        : action.error;
    });
  }
});

export {
  getUserOrdersThunk,
  loginThunk,
  registerThunk,
  logoutThunk,
  getUserThunk,
  updateUserThunk
};
export default userSlice;
