import { useState } from "react"
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"

export default function RadioButtonGroupSimple({ content, dispatch }: any) {
    const [ choice, setChoice ] = useState("");

    return (
        <Box
            sx={{
                border: "2px solid darkslategrey",
                borderRadius: 7,
                width: 220,
                height: 200,
                textAlign: "center",
                paddingTop: 2
            }}
        >
            <FormControl component="fieldset">
                <FormLabel component="legend">{content.formLabel}</FormLabel>
                <RadioGroup
                    aria-label={content.formLabel}
                    // defaultValue="     "
                    name={content.name}
                    value={choice}
                    onChange={e => {
                        setChoice(e.target.value);
                        dispatch({ type: content.action, payload: { id: e.target.value } })
                    }}
                >
                    {content.formControlLabel.map((f: any) => (
                        <FormControlLabel key={f.value} value={f.value} control={<Radio/>} label={f.label}/>
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}