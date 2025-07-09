// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    useEffect(() => {
        async function initAgendaAndContacts() {
            const baseUrl = "https://playground.4geeks.com/contact/agendas/tgp034/";
            const resp = await fetch(baseUrl);
            if (resp.status === 404) {
                await fetch(baseUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                });
            }

            const urlContacts = baseUrl + "contacts/";
            const contactsRes = await fetch(urlContacts);
            const data = await contactsRes.json();
            dispatch({ type: 'SET_CONTACTS', payload: data.contacts });
        }

        initAgendaAndContacts();
    }, []); 

    // Provide the store and dispatch method to all child components.
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalReducer debe usarse dentro de <GlobalProvider>');
  }
  return context;
}
