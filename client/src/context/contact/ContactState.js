import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: "1",
				name: "Maciek",
				email: "maciek@test.pl",
				phone: "333-444-555",
				type: "professional",
			},
			{
				id: "2",
				name: "Marcin",
				email: "marcin@test.pl",
				phone: "666-777-888",
				type: "personal",
			},
			{
				id: "3",
				name: "Tomek",
				email: "tomasz@test.pl",
				phone: "333-999-555",
				type: "personal",
			},
		],
		current: null,
		filtered: null,
	};
	const [state, dispatch] = useReducer(ContactReducer, initialState);

	// Add contact
	const addContact = (contact) => {
		contact.id = uuid();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};
	// Delete contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};
	// Set current contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	// Clear current contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};
	// Update contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};
	// Filter contacts
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// Clear filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
