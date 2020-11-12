import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/ContactContext";

function ContactItem({ contact }) {
	const contactContext = useContext(ContactContext);

	let { deleteContact, setCurrent } = contactContext;

	const { id, name, email, phone, type } = contact;

	// deleteContact
	const onDelete = () => {
		deleteContact(id);
		// clearCurrent();
	};
	// editContact
	const onEdit = () => {
		setCurrent(contact);
	};

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{name}{" "}
				<span
					style={{ float: "right" }}
					className={
						"badge " +
						(type === "professional" ? "badge-success" : "badge-primary")
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-envelope-open"> {email}</i>
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-phone"> {phone}</i>
					</li>
				)}
			</ul>
			<p>
				<button className="btn btn-dark btn-sm" onClick={onEdit}>
					Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
}

ContactItem.propTypes = {
	contacts: PropTypes.object.isRequired,
};

export default ContactItem;
