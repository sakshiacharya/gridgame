export const loginAction = (photo, name, email, phone) => {
    return async (dispatch) => {


        localStorage.setItem('photo', photo)
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
        localStorage.setItem('phone', phone)
    
  
        dispatch({
          type: 'LOGIN_DATA',
          payload: {
            photo,
            name,
            email,
            phone
          }
        });
        
    };
  };
