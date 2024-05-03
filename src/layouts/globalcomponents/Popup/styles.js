const contentStyle = {
	padding: "0 24px",
};

const dynamicMessageStyles = {
	marginBottom: "15px", 
	fontSize: "0.852rem", 
	color: '#798294'
}

const cancelBtnStyles = {
	"minWidth": "100%",
	"background": "transparent",
	"color": "#344054",
	"border": "1px solid #D0D5DD",
	"boxShadow": "unset",
	"&:hover": { background: "transparent", borderColor: "#D0D5DD", boxShadow: "unset" },
	"borderRadius": "9px",
};

const sybmitBtnStyles = {
	"minWidth": "100%",
	"background": "#1d2939",
	"color": "#fff",
	"border": "1px solid #1d2939",
	"&:hover": { background: "#1d2939", boxShadow: "unset" },
	"borderRadius": "9px",
};

const titleStyles = {
	fontFamily: "Inter",
	fontSize: "20px",
	fontWeight: "600",
	lineHeight: "28px",
	letterSpacing: "0em",
	textAlign: "left",
	paddind: "16px 24px",
	m: 0,
};

export { sybmitBtnStyles, cancelBtnStyles, titleStyles, contentStyle, dynamicMessageStyles };
