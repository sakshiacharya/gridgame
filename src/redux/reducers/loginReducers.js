const initialState = {
  photo: localStorage.getItem('photo'),
  name: localStorage.getItem('name'),
  email: localStorage.getItem('email'),
  phone: localStorage.getItem('phone')
};

const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_DATA':
      const { photo, name, email, phone } = action.payload;
      localStorage.setItem('photo', photo);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('phone', phone);
      return {
        ...state,
        photo,
        name,
        email,
        phone
      };
    default:
      return state;
  }
};

export default loginReducers;
