import React, { useState } from "react";
import { i18n } from "../../translate/i18n";
import { Avatar, CardHeader, Grid, TextField, Input, InputAdornment, InputLabel } from "@material-ui/core";
import { TagsKanbanContainer } from "../TagsKanbanContainer";

const TicketInfo = ({ contact, ticket, onClick }) => {
	const [amount, setAmount] = useState("");

	const renderCardReader = () => {
		return (
			<CardHeader
				onClick={onClick}
				style={{ cursor: "pointer" }}
				titleTypographyProps={{ noWrap: true }}
				subheaderTypographyProps={{ noWrap: true }}
				avatar={<Avatar src={contact?.urlPicture} alt="contact_image" />}
				title={`${contact?.name || '(sin contacto)'} #${ticket.id}`}
				subheader={
					ticket.user &&
					`${i18n.t("messagesList.header.assignedTo")} ${ticket.user.name}`
				}

			/>
		);
	}

	const handleChange = (event) => {
		const value = event.target.value;

		setAmount(value);
	}


	return (
		<React.Fragment>
			<Grid container alignItems="center" spacing={10}>
				{/* Contenido de contacto a la izquierda */}
				<Grid item xs={6}>
					{renderCardReader()}
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default TicketInfo;
