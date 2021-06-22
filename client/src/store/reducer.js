
const initialState = {
    isLoggedIn: false 
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ON_LOGGED_IN': 
            return {
                ...state, 
                isLoggedIn: true 
            }
    }

     return state 
}

export default reducer 