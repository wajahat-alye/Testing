import React, { useEffect, useState, useMemo } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import CSVUploader from "./CSVUploader.jsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "0 auto",
    top: "25vh",
    position: "relative",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const CustomToolbar = (props) => {
  const { setDataForTable } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [CSVData, setCSVData] = useState([]);

  useEffect(() => {
    console.log(CSVData);
    const dataArr = Array.from(CSVData).map((data) => {
      if (data.data.name && data.data.city) {
        return {
          name: data.data.name,
          company: data.data.company,
          city: data.data.city,
          state: data.data.state
        };
      }
    });
    setDataForTable(dataArr);
    console.log("CSV DATA", dataArr);
  }, [CSVData, setDataForTable]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={"Add data from CSV"}>
        <IconButton>
          <AddCircleOutlineIcon onClick={handleOpen} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Upload CSV Data</h2>
          <CSVUploader setCSVData={setCSVData} />
          <br />
          <Button variant="outlined" onClick={handleClose}>
            Close modal
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CustomToolbar;
