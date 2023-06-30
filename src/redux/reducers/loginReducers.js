const initialState = {
    photo: localStorage.getItem('photo'),
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    phone: localStorage.getItem('phone')
    
    
  };
  
  const loginReducers = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'LOGIN_DATA':   
          return {
            ...state, 
          };
      default:
        return state;
    }
  };
  
  export default loginReducers