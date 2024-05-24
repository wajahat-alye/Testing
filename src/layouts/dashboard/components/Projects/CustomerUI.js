import { useState, useEffect } from "react";
import GridUI3 from "layouts/dashboard/components/Projects/GridUI3";
import useData from "./../../hook/useData";
import * as reduxData from "context/useGlobalData";

function CustomerUI() {
  const { getFromFirebase } = useData();
  const [controller, dispatch] = reduxData.useGlobalController();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    reduxData.setCustomerList(dispatch, rows);
  }, [rows]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getFromFirebase();
      setRows(data);
    };
    fetch();
  }, []);

  const columns = [
    { editable: false, hideable: true, field: "id", headerName: "id"},
    {
      editable: true,
      field: "customerName",
      headerName: "Customer Name",
      width: 230,
    },
  ];
  const headers = [
    { key: "id", name: "id", required: true },
    {
      key: "customerName",
      name: "Customer Name",
      required: true,
    },
  ];

  return (
    <>
      <GridUI3
        headers={headers}
        columns={columns}
        fieldToFocus={"customerName"}
        setRows={setRows}
        rows={rows}
        fileName={"Customer"}
      />
    </>
  );
}

export default CustomerUI;
