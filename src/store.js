export const initialStore = () => {
  return {
    contacts: []
  }
}

export default function storeReducer(state, action = {}) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };

    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };

    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };

    default:
      return state;
  }
}