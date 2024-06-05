import { useEffect } from "react";
import * as reduxData from "context/useGlobalData";
import { useState, memo } from "react";
import GridUI3 from "layouts/dashboard/components/Projects/GridUI3";
import { makeDate } from "../../../../helper/func";
import useData from "./../../hook/useData";
import { dp_status, dp_region } from "./../../../emailcopy/components/Projects/data/index";

const Deshboard = ({}: any) => {
  const { getDeshboardData, customerListRedux, KMOwnerListRedux, sectorListRedux } = useData();
  const [controller, dispatch] = reduxData.useGlobalController();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log('asdfasdfasdfasdf',rows)
    reduxData.setGridData(dispatch, rows);
  }, [rows]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getDeshboardData();
      setRows(data);
    };
    fetch();
  }, []);

  const columns = [
    { editable: false, field: "id", headerName: "S/N", width: 70 },
    {
      editable: true,
      valueGetter: makeDate,
      type: "date",
      field: "dateReceived",
      headerName: "Date Received",
      width: 130,
    },
    {
      editable: true,
      valueGetter: makeDate,
      type: "date",
      field: "dueDateByKAM",
      headerName: "Due Date by KAM /Customer",
      width: 130,
    },
    {
      editable: true,
      valueGetter: makeDate,
      type: "date",
      field: "projectLevel",
      headerName: "Project Level",
      width: 130,
    },
    { editable: true, field: "tat", headerName: "TAT", width: 130 },
    {
      editable: true,
      type: "number",
      field: "projectLWC",
      headerName: "Project Life (Work Days)",
      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: dp_status,
      field: "status",
      headerName: "Status/Dependencies",
      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: customerListRedux.map((e) => e.customerName),
      field: "customer",
      headerName: "Customer",
      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: dp_region,
      field: "region",
      headerName: "Region",
      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      field: "kamOwner",
      valueOptions: KMOwnerListRedux.map((e) => e.ownerName),
      headerName: "KAM/ Owner",
      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: sectorListRedux.map((e) => e.sectorName),
      field: "sector",
      headerName: "Sector",

      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: KMOwnerListRedux.map((e) => e.ownerName),
      field: "pstAssign",
      headerName: "Pre-Sales task Assigned to",
      width: 130,
    },
    { editable: true, field: "requirement", headerName: "Requirement / Query", width: 130 },
    {
      editable: true,
      type: "number",
      field: "psrUpdates",
      headerName: "Pre-Sales Remarks / Updates",
      width: 130,
    },
    {
      editable: true,
      type: "number",
      field: "proposedSolution",
      headerName: "Proposed Solution",
      width: 130,
    },
    {
      editable: true,
      type: "number",
      field: "srdiother",
      headerName: "Sale/ Rental/ Demo/ In-House/ Other",
      width: 130,
    },
    {
      editable: true,
      type: "number",
      valueGetter: makeDate,
      type: "date",
      field: "submissionTo",
      headerName: "Submission to KAM/ Owner",
      width: 130,
    },
    {
      editable: true,
      type: "number",
      field: "additionR",
      headerName: "Additional Remarks",
      width: 130,
    },
  ];

  const headers = [
    { key: "id", name: "S/N", required: true },
    {
      key: "dateReceived",
      name: "Date Received",
      required: true,
    },
    {
      key: "dueDateByKAM",
      name: "Due Date by KAM /Customer",
    },
    {
      key: "projectLevel",
      name: "Project Level",
      required: true,
    },
    { key: "tat", name: "TAT" },
    { key: "projectLWC", name: "Project Life (Work Days)" },
    { key: "status", name: "Status/Dependencies", required: true },
    { key: "customer", name: "Customer", required: true },
    { key: "region", name: "Region", required: true },
    { key: "kamOwner", name: "KAM/ Owner", required: true },
    { key: "sector", name: "Sector", required: true },
    { key: "pstAssign", name: "Pre-Sales task Assigned to", required: true },
    { key: "requirement", name: "Requirement / Query", required: true },
    { key: "psrUpdates", name: "Pre-Sales Remarks / Updates" },
    { key: "proposedSolution", name: "Proposed Solution" },
    { key: "srdiother", name: "Sale/ Rental/ Demo/ In-House/ Other" },
    { key: "submissionTo", name: "Submission to KAM/ Owner" },
    { key: "additionR", name: "Additional Remarks" },
  ];

  return (
    <>
      <GridUI3
        headers={headers}
        columns={columns}
        fieldToFocus={"dateReceived"}
        setRows={setRows}
        rows={rows}
        fileName={"Deshboard"}
      />
    </>
  );
};

export default memo(Deshboard);
