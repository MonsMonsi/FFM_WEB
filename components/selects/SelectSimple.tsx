import { useState } from "react"
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export default function SelectSimple({ content, dispatch }: any) {
    const [ choice, setChoice ] = useState("");
    
    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id={content.labelId}>{content.inputLabel}</InputLabel>
                <Select
                    labelId={content.labelId}
                    id={content.selectId}
                    value={choice}
                    label={content.inputLabel}
                    onChange={(e) => {
                        setChoice(e.target.value);
                        dispatch({ type: content.action, payload: { id: e.target.value } })
                    }}
                >
                    {content.menuItem.map((m: any) => (
                        <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
