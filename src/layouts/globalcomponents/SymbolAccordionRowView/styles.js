const importExportBtnStyle = {
	"background": "linear-gradient(0deg, #fcfcfd, #fcfcfd), linear-gradient(0deg, #667085, #667085)",
	"backgroundColor": "transparent",
	"border": "1px solid #667085",
	"color": "#667085",
	"fontWeight": 600,
	"boxShadow": "0px 1px 2px 0px #1018280d",
	"padding": "10px 16px",
	"textTransform": "capitalize",
	"maxHeight": "44px",
	"minWidth": "125px",
	"borderRadius": "8px",
	"cursor": "pointer",
	"marginRight": "10px",
	"&.Mui-disabled": {
		cursor: "not-allowed",
		pointerEvents: "all",
	},
};

const symbolCardsContainer = {
	height: "auto",
	maxHeight: "45vh",
	"overflowY": "scroll",
};

const symbolContainerStyles = {
	width: "100%",
	height: "100%"
};

export { symbolCardsContainer, importExportBtnStyle, symbolContainerStyles };
