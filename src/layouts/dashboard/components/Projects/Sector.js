import { useState, useEffect } from "react";
import GridUI3 from "layouts/dashboard/components/Projects/GridUI3";
import useData from "./../../hook/useData";
import * as reduxData from "context/useGlobalData";

function Sector() {
  const [rows, setRows] = useState([]);
  const [controller, dispatch] = reduxData.useGlobalController();
  const { getSectorFromFirebase } = useData();
  useEffect(() => {
    reduxData.setSectorList(dispatch, rows);
  }, [rows]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getSectorFromFirebase();
      setRows(data);
    };
    fetch();
  }, []);
  const columns = [
    {  hide: true, field: "id", headerName: "id"},

    {
      editable: true,
      field: "sectorName",
      headerName: "Sector Name",
      width: 230,
    },
  ];
  const headers = [
    { key: "id", name: "id", required: true },
    {
      key: "sectorName",
      name: "Sector Name",
      required: true,
    },
  ];

  return (
    <>
      <GridUI3
        headers={headers}
        columns={columns}
        fieldToFocus={"sectorName"}
        setRows={setRows}
        rows={rows}
        fileName={"Sector"}
      />
    </>
  );
}

export default Sector;
