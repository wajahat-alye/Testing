import Papa from "papaparse";

export const exportToCSV = (data, name) => {
	// Add the header manually
	const csv = Papa.unparse(data);

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

	const link = document.createElement("a");
	if (link.download !== undefined) {
		const url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", name);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		alert("Your browser does not support downloading files..");
	}
};

