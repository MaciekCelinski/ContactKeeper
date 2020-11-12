import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// import context
import ContactContext from "../../context/contact/ContactContext";
// import components
import ContactItem from "./ContactItem";

const Contacts = () => {
	// init context
	const contactContext = useContext(ContactContext);

	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		<h4>Please add a contact</h4>;
	}

	return (
		<div>
			<Fragment>
				<TransitionGroup>
					{filtered !== null
						? filtered.map((contact) => (
								<CSSTransition key={contact.id} timeout={500} classNames="item">
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition key={contact.id} timeout={500} classNames="item">
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			</Fragment>
		</div>
	);
};

export default Contacts;
