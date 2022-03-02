import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "@wordpress/element";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)((props) => ({
	color: props.expanded ? "#E6005C" : "white",
}));

export default function AccordionContent(props) {
	const [expanded, setExpanded] = useState(false);
	const [firstExpanded, setFirstExpanded] = useState(false);
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<>
			{props.elements.map((element) => (
				<Accordion
					disableGutters
					elevation={0}
					expanded={element.expanded ? true : expanded === element.id}
					onChange={handleChange(element.id)}
					sx={{
						marginTop: 0,
					}}
				>
					<AccordionSummary
						sx={{
							bgcolor:
								expanded === element.id ? "white" : "#333399",
							color:
								expanded === element.id ? "#E6005C" : "white",
							borderBottom: 2,
						}}
						expandIcon={
							<StyledFontAwesomeIcon
								expanded={expanded === element.id}
								icon="chevron-down"
							/>
						}
						aria-controls="panel1a-content"
						id={`${element.id}-header`}
					>
						<Typography
							variant="h2"
							sx={{
								margin: "0 12px",
								fontSize: 20,
								fontFamily: "Bebas Neue",
								padding: "",
							}}
						>
							{element.title}
						</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ bgcolor: "#f0f0f0", padding: 0 }}>
						<div>
							{element.expanded && element.component}
							{expanded === element.id && element.component}
						</div>
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
}
