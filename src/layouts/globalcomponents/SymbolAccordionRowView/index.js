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
import { TABLE_HEAD } from './../../dashboard/components/Projects/data/index';

import { GRID_KEYS_Values, GRID_KEYS_Keys } from '../../dashboard/components/Projects/data';


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

	



	const content = {1: { Header: ['id','Sector Name'], fileName: 'sector.csv', gridContent: (e)=>({id: e.id,sectorName: e['Sector Name'].slice(1).slice(1).slice(0,-1)}) },
	2: { Header: ['id','Customer Name'], fileName: 'customer.csv', gridContent: (e)=>({id: e.id,customerName: e['Customer Name'].slice(1).slice(1).slice(0,-1)}) },
	3: { Header: ['id','Owner Name'], fileName: 'owner.csv', gridContent: (e)=>({id: e.id,ownerName: e['Owner Name'].slice(1).slice(1).slice(0,-1)}) },
	4: { Header: [], fileName: 'deshboard.csv', gridContent: (e) => {
		let x = JSON.parse(JSON.stringify( e).replaceAll('=\\"','').replaceAll('\\"',''));
		let ht = {}

		for(let ele of Object.keys(x)){
			// ht.push(GRID_KEYS_Values[ele]);

			if(ele == 'id'){
				ht[ele] = x[ele];

			}else{
				ht[GRID_KEYS_Keys[ele]] = x[ele];
			}
		}
		return ht;
}  },

}
	const gridType = props?.gridType || 1;
	const {Header, fileName, gridContent, key} = content[gridType];
	

	const handleFileSelect = (event) => {
		const fileInput = event.target;
		const file = fileInput.files[0];

		if (file) {
			Papa.parse(file, {
				complete: function (ele) {
					const { meta: { fields }, data } = ele;
					if (validateCsv(fields)) {
						// const columnValues = data.map(e=>[e.id,e['Sector Name']])
						// const _data = data.map(e=>({id: e.id,sectorName: e['Sector Name'].slice(1).slice(1).slice(0,-1)}))
						const _data = data.map(gridContent)

						props?.getData(_data);
						setState((prevState) => ({
							...prevState,
							// stockSymbolsTemp: [...prevState.stockSymbolsTemp, ...columnValues],
							stockSymbolTemp: "",
						}));
					} else {
						setMessage('Invalid CSV format. Please make sure the CSV has only one column with the header "id or S/N".', "error");
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
		return headers[0] === "id" || headers[0] === "S/N";
	};

	const handleImportClick = () => {
		fileInputRef.current.click();
	};


	const exportCSV = () => {
		if(!props?.data && !props?.data?.length) { return };
		// const content = props.data.map(e => [e.id,`="${e.sectorName}"`,]);
		let content = [];
		let keys11 = [];
		for(let i=0; i< props.data.length; i++){
			const { id, isNew, ...rest } = props.data[i];
			const valuesss = Object.values(rest);
			keys11 = Object.keys(rest);
			let _content = valuesss.map(e => `="${e}"`)
			content.push([ `${id}`, ..._content]);
		}
		
		if(gridType === 4){
			if(props.data.length > 0){
				const ht = [ 'id'];

				for(let ele of keys11){
					ht.push(GRID_KEYS_Values[ele]);
				}
				// const ht = [ 'id', ...Object.keys(rest) ];
				exportToCSV(([ht, ...content ]),  fileName);
			}
		}else{
			exportToCSV(([Header, ...content ]),  fileName);
		}
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
