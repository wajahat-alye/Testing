import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  styled
} from "@mui/material";

const CustomFormControl = styled(FormControl)({
  minWidth: 120,
  maxWidth: 300,
  margin: "8px"
});

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "tags",
    headerName: "Tags",
    width: 200,
    renderCell: (params) => (
      <TagsCell value={params.value} onChange={params.onChange} />
    )
  }
];

const rows = [
  { id: 1, name: "John Doe", tags: ["Tag1", "Tag2"] },
  { id: 2, name: "Jane Smith", tags: ["Tag2", "Tag3"] },
  { id: 3, name: "Mike Johnson", tags: ["Tag1", "Tag3"] }
];

const tagOptions = ["Tag1", "Tag2", "Tag3", "Tag4"]; // All available tags

const TagsCell = ({ value, onChange }) => {
  const [selectedTags, setSelectedTags] = useState(value || []);

  const handleChange = (event) => {
    const newTags = event.target.value;
    setSelectedTags(newTags);
    onChange(newTags);
  };

  return (
    <CustomFormControl>
      <InputLabel id="tags-label">Tags</InputLabel>
      <Select
        labelId="tags-label"
        id="tags-select"
        multiple
        value={selectedTags}
        onChange={handleChange}
        renderValue={(selected) => (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {selected.map((tag) => (
              <Chip key={tag} label={tag} style={{ margin: 2 }} />
            ))}
          </div>
        )}
      >
        {tagOptions.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  );
};

const MultiSelectColumnDataGrid = () => {
  const handleTagsChange = (rowIndex, newTags) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], tags: newTags };
    console.log("Updated rows:", updatedRows);
    // Update state or data store with updatedRows
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          editable: column.field === "tags",
          renderCell: (params) =>
            column.field === "tags" ? (
              <TagsCell
                value={params.value}
                onChange={(newValue) =>
                  handleTagsChange(params.rowIndex, newValue)
                }
              />
            ) : (
              params.value
            )
        }))}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default MultiSelectColumnDataGrid;
