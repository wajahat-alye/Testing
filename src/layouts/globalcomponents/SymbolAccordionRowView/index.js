import { FormLabel, Grid, Chip, FormControl, Input, Button, Stack, AccordionDetails, Typography, AccordionSummary, Accordion, IconButton } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import "../../../assets/styles/symbolChecksComponent.css";
import Papa from "papaparse";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { exportToCSV } from "../../../helper/ExportCSVHelper";
import { importExportBtnStyle, symbolCardsContainer, symbolContainerStyles } from "./styles";
import ConfirmationPopup from './../Popup/ConfirmationPopup';

const SymbolAccordion = forwardRef((props:any, ref) => {
	const [state, setState] = useState(() => ({
		stockSymbols: [],
		stockSymbolsTemp: [],
		stockSymbolTemp: "",
		selectedSymbolIndex: 0
	}));
	const { stockSymbols, stockSymbolTemp, stockSymbolsTemp, selectedSymbolIndex } = state;
	const fileInputRef = useRef(null);
	const confirmationPopupRef = useRef();
	// const showToaster = useSnackbar();
	const [errorSB, setErrorSB] = useState(false);
  const [message, setMessage] = useState('');
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

	const deleteTempSymbol = (type, index) => {
		setState((prevState) => {
			prevState[type].splice(index, 1);
			return {
				...prevState,
				[type]: prevState[type],
			};
		});
	};

	const handleChange = (name, value) => {
		setState((prevState) => ({
			...prevState,
			[name]: name === "stockSymbolTemp" ? value.toUpperCase() : value,
		}));
	};

	const onKeyUp = (keyCode, name, value, type) => {
		if (keyCode === 13 && value.trim()) {
			setState((prevState) => ({
				...prevState,
				[type]: [...prevState[type], prevState[name]],
				[name]: "",
			}));
		}
	};

	const addSymbol = (mainSymbol, tempSymbol) => {
		setState((prevState) => ({
			...prevState,
			[mainSymbol]: [...prevState[mainSymbol], ...prevState[tempSymbol]],
			[tempSymbol]: [],
		}));
	};

	const toggleDeleteSymbolModal = (index) => {
		confirmationPopupRef.current && confirmationPopupRef.current.setState()
		setState((prevState) => ({ ...prevState, selectedSymbolIndex: index }))
	}

	const deleteSymbol = (type, index) => {
		setState((prevState) => {
			prevState[type].splice(index, 1);
			return {
				...prevState,
				[type]: prevState[type]
			};
		});
		confirmationPopupRef.current && confirmationPopupRef.current.setState()
	};

	useImperativeHandle(ref, () => ({
		getState: () => ({
			stockSymbols,
		}),
		setState: (_state = []) => {
			const symbolItem = _state.find((item) => item.type === 33);
			setState((prevState) => ({
				...prevState,
				stockSymbols: symbolItem?.cfg[0]?.blacklist?.split(";") || [],
			}));
		},
	}));

	const handleFileSelect = (event) => {
		const fileInput = event.target;
		const file = fileInput.files[0];

		if (file) {
			Papa.parse(file, {
				complete: function (ele) {
					const { meta: { fields }, data } = ele;
					if (validateCsv(fields)) {
						const columnValues = data.map(e=>[e.id,e['Sector Name']])

						props?.getData(data);
						setState((prevState) => ({
							...prevState,
							stockSymbolsTemp: [...prevState.stockSymbolsTemp, ...columnValues],
							stockSymbolTemp: "",
						}));
					} else {
						setMessage('Invalid CSV format. Please make sure the CSV has only one column with the header "Symbols".', "error");
						openErrorSB();
					}
					// Reset the value of the file input to trigger the onChange event even for the same file
					fileInput.value = "";
				},
				header: true, // Assumes the first row contains headers
				dynamicTyping: true, // Converts numeric values to numbers
			});
		}
	};

	const validateCsv = (headers) => {
		// Check if there is only one column and its header is 'Symbols'
		return headers[0] === "id";
		// return ['id','Sector Name'].includes(headers);
	};

	const handleImportClick = () => {
		fileInputRef.current.click();
	};


	const exportCSV = () => {
		if(!props?.data && !props?.data?.length) { return };
		const content = props.data.map(e => [e.id,`="${e.sectorName}"`,]);
		exportToCSV(([['id','Sector Name'], ...content ]),  `sector.csv`);

	};

	const message1 = `You are about to delete the Symbol: ${stockSymbols[selectedSymbolIndex]} it will be remove for restricted symbol`;

	return (
		<>
		<Button
										variant="contained"
										sx={importExportBtnStyle}
										onClick={handleImportClick}
									>
										Import
									</Button>
									<Button
										variant="contained"
										onClick={exportCSV}
										// disabled={stockSymbols.length === 0}
										sx={importExportBtnStyle}
									>

										Export
									</Button>
									<input
										type="file"
										ref={fileInputRef}
										style={{ display: "none" }}
										onChange={handleFileSelect}
										accept=".csv"
									/>
			
			<ConfirmationPopup
				ref={confirmationPopupRef}
				handleSubmit={() => deleteSymbol("stockSymbols", state.selectedSymbolIndex)}
				message={message1}
			/>
		</>
	);
});

export default SymbolAccordion;
