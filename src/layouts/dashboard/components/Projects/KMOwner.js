import { useState, useEffect } from "react";
import GridUI3 from "layouts/dashboard/components/Projects/GridUI3";
import useData from "./../../hook/useData";
import * as reduxData from "context/useGlobalData";

function KMOwner() {
  const [rows, setRows] = useState([]);
  const [controller, dispatch] = reduxData.useGlobalController();
  const { getKMOwnerFromFirebase } = useData();

  useEffect(() => {
    reduxData.setKMOwnerList(dispatch, rows);
  }, [rows]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getKMOwnerFromFirebase();
      setRows(data);
    };
    fetch();
  }, []);

  const columns = [
    { editable: false, hideable: true, field: "id", headerName: "id"},

    {
      editable: true,
      field: "pstAssign",
      headerName: "Pre-Sales task assigned to",
      width: 230,
    },
  ];
  const headers = [
    { key: "id", name: "id", required: true },
    {
      key: "pstAssign",
      name: "Pre-Sales task assigned to",
      required: true,
    },
  ];

  return (
    <>
      <GridUI3
        headers={headers}
        columns={columns}
        fieldToFocus={"pstAssign"}
        setRows={setRows}
        rows={rows}
        fileName={"PreSales"}
      />
    </>
  );
}

export default KMOwner;
