import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const StyledLink = styled(Link)`
	display: inline-block;
	padding: 6px 20px;
	font-family: "Bebas Neue", sans-serif;
	color: #333399;
	background-color: white;
	border-radius: 40px;
	font-size: 16px;
	border: 1px solid #333999;
	margin: 8px;
	text-decoration: none;
	transition: all ease-in 0.3s;

	&:hover,
	&.active {
		color: white;
		background-color: #e6005c;
		border-color: #e6005c;
	}
`;

const TermLink = (props) => {
	return (
		<StyledLink
			className={`${props.active ? "active" : "std"}`}
			to={props.to}
		>
			{props.text}
		</StyledLink>
	);
};

export default TermLink;
