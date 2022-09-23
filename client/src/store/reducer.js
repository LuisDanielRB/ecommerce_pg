let tokenFromLocalStorage = localStorage.getItem("token");
if (!tokenFromLocalStorage) {
  tokenFromLocalStorage = null;
}
let userIdFromLocalStorage = localStorage.getItem("userId");
if (!userIdFromLocalStorage) {
  userIdFromLocalStorage = null;
}
let userProfileImageFromLocalStorage = localStorage.getItem("userProfileImage");
if (!userProfileImageFromLocalStorage) {
  userProfileImageFromLocalStorage = null;
}

let userRoleFromLocalStorage = localStorage.getItem("userRole");
if (!userRoleFromLocalStorage) {
  userRoleFromLocalStorage = null;
}

let userNameFromLocalStorage = localStorage.getItem("userName");
if (!userNameFromLocalStorage) {
  userNameFromLocalStorage = null;
}

let userEmailFromLocalStorage = localStorage.getItem("userEmail");
if (!userEmailFromLocalStorage) {
  userEmailFromLocalStorage = null;
}
let isValidFromLocalStorage = localStorage.getItem("isValid");
if (!isValidFromLocalStorage) {
  isValidFromLocalStorage = false;
}

const initialState = {
  // eventos
  events: [],
  // existen?
  eventsDetail: {},
  eventsDB: [],
  // eventos con filtrado
  categories: [],
  artists: [],
  places: [],
  // --------------------
  searchLive: [],
  token: tokenFromLocalStorage,
  userId: JSON.parse(userIdFromLocalStorage),
  userName: userNameFromLocalStorage,
  userEmail: userEmailFromLocalStorage,
  userProfilePicture: userProfileImageFromLocalStorage,
  userRole: userRoleFromLocalStorage,
  isValid: isValidFromLocalStorage,
  eventsUsers: [],
  // estados del carrito
  cartState: false,
  cart: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "POST_LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("userName", action.payload.username);
      localStorage.setItem("userEmail", action.payload.email);
      localStorage.setItem("userProfileImage", action.payload.profile_picture);
      localStorage.setItem("userRole", action.payload.status);
      localStorage.setItem("isValid", true);
      return {
        ...state,
        currenteUser: {
          token: action.payload.token,
          userRole: action.payload.status,
          userId: action.payload.id,
          userName: action.payload.username,
          userEmail: action.payload.email,
          userProfilePicture: action.payload.profile_picture,
          isValid: true,
        },
      };

    case "POST_REGISTRO":
      return {
        ...state,
        userRegister: action.payload,
      };

    case "GET_EVENT_DETAIL":
      return {
        ...state,
        eventsDetail: action.payload,
      };

    case "GET_ALL_EVENTS":
      return {
        ...state,
        events: action.payload.datos,
        categories: action.payload.uniqueCAtegories,
        artists: action.payload.uniqueArtist,
        places: action.payload.uniquePlace,
      };

    case "GET_ALL_EVENTS_CREATE": {
      return {
        ...state,
        eventsUsers: action.payload,
      };
    }

    case "POST_EVENT":
      return {
        ...state,
        eventsDB: action.payload,
      };

    case "SEARCH_LIVE":
      return {
        ...state,
        searchLive: action.payload,
      };

    case "LOG_OUT":
      localStorage.setItem("isValid", false);
      localStorage.setItem("userId", null);
      localStorage.setItem("userRole", null);
      localStorage.setItem("userEmail", null);
      localStorage.removeItem("token");
      localStorage.removeItem("isValid");
      return {
        ...state,
        token: "",
        isValid: false,
        userId: null,
        userRole: null,
        userEmail: null,
      };

    case "LOGIN_GOOGLE":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("userName", action.payload.username);
      localStorage.setItem("userEmail", action.payload.email);
      localStorage.setItem("userProfileImage", action.payload.profile_picture);
      localStorage.setItem("userRole", action.payload.status);
      localStorage.setItem("isValid", true);
      return {
        ...state,
        currenteUser: {
          token: action.payload.token,
          userRole: action.payload.status,
          userId: action.payload.id,
          userName: action.payload.username,
          userEmail: action.payload.email,
          userProfilePicture: action.payload.profile_picture,
          isValid: true,
        },
      };

    case "CHECK_STATUS": {
      return {
        ...state,
      };
    }

    case "CART_STATE": {
      return {
        ...state,
        cartState: action.payload,
      };
    }

    default:
      return state;
  }
}
export default rootReducer;
