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
    { key: "id", name: "S/N", required: true, suggested_mappings: ["S/N"]  },
    {
      key: "dateReceived",
      name: "Date Received",
      required: true,
      data_type: "date",
      suggested_mappings: ["Date Received"] 
    },
    {
      key: "dueDateByKAM",
      name: "Due Date by KAM /Customer",
      data_type: "date",suggested_mappings: ["Due Date by KAM / Customer"] 
    },
    {
      key: "projectLevel",
      name: "Project Level",
      data_type: "date",
      required: true,suggested_mappings: ["Project Level"] 
    },
    { key: "tat", name: "TAT", suggested_mappings: ["TAT"] },
    { key: "projectLWC", name: "Project Life (Work Days)" , suggested_mappings: ["Project Life (Work Days)"] },
    { key: "status", name: "Status/Dependencies", required: true , suggested_mappings: ["Status/Dependencies"] },
    { key: "customer", name: "Customer", required: true , suggested_mappings: ["Customer"] },
    { key: "region", name: "Region", required: true , suggested_mappings: ["Region"] },
    { key: "kamOwner", name: "KAM/ Owner", required: true , suggested_mappings: ["KAM / Owner"] },
    { key: "sector", name: "Sector", required: true , suggested_mappings: ["Sector"] },
    { key: "pstAssign", name: "Pre-Sales task Assigned to", required: true , suggested_mappings: ["Pre-Sales task Assigned to"] },
    { key: "requirement", name: "Requirement / Query", required: true , suggested_mappings: ["Requirement / Query"] },
    { key: "psrUpdates", name: "Pre-Sales Remarks / Updates" , suggested_mappings: ["Pre-Sales Remarks / Updates"] },
    { key: "proposedSolution", name: "Proposed Solution" , suggested_mappings: ["Proposed Solution"] },
    { key: "srdiother", name: "Sale/ Rental/ Demo/ In-House/ Other" , suggested_mappings: ["Sale / Rental / Demo / In-House / Other"] },
    { key: "submissionTo", name: "Submission to KAM/ Owner", data_type: "date", suggested_mappings: ["Submission to KAM / Owner"] },
    { key: "additionR", name: "Additional Remarks", suggested_mappings: ["Additional Remarks"] },
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
