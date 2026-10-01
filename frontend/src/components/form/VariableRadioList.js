import * as React from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";

// Scrollable single-choice list of dataset columns, e.g. for picking the group indicator.
function VariableRadioList({variables, value, onChange, height, ariaLabel}) {
    return (
        <FormControl sx={{
            display: "flex",
            width: "55%",
            height: height,
            marginLeft: "23%",
            marginBottom: "1.5%",
            overflow: "auto",
            boxSizing: "border-box",
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "4px",
            paddingLeft: "8px"
        }}>
            <RadioGroup aria-label={ariaLabel} value={value ?? ""} onChange={(event) => onChange(event.target.value)}>
                {variables.filter((variable) => variable !== "").map((variable) => (
                    <FormControlLabel key={variable} value={variable} label={variable}
                                      control={<Radio size="small" sx={{"&.Mui-checked": {color: "#1d4189"}}}/>}/>
                ))}
            </RadioGroup>
        </FormControl>
    );
}

export default VariableRadioList;
