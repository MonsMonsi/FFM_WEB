import { useState } from "react"
import { Box, FormControl, InputLabel, Select, MenuItem, styled, ThemeProvider, createTheme, InputBase } from "@mui/material"

interface State {
    choice: string,
}

const initialState: State = {
    choice: "",
}

const StyledInput = styled(InputBase)(() => ({
    "& .MuiInputBase-input": {
        paddingTop: 25,
        borderRadius: 5,
        position: "relative",
        textAlign: "center",
        backgroundColor: "#a8002a",
        border: "1px solid azure",
        fontSize: "2rem",
        color: "azure"
    },
    "& :hover": {
        borderColor: "azure",
        backgroundColor: "#ac296a",
    }
}));

// styled MenuItem component
const StyledMenuItem = styled(MenuItem)({
    background: "linear-gradient(45deg, #a8002a 30%, #ac296a 90%)",
    color: "azure",
    borderRadius: 5,
    marginTop: 1,
    marginBottom: 1,
});

// MenuProps for Select component
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            innerHeight: ITEM_HEIGHT,
            maxHeigth: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            background: "linear-gradient(45deg, #a8002a 30%, #ac296a 90%)",
            color: "azure",
            border: "1.5px solid azure",
        },
    },
};

export default function SelectStyled({ content, dispatch }: any) {
    const [ state, setState ] = useState(initialState);

    function handleChange(event: any) {
        setState(typeof event.target.value === "string" ? { choice: event.target.value } : { choice: "" });
        dispatch({ type: content.action, payload: { id: event.target.value } })
    }

    return (
        <Box>
            <FormControl fullWidth
                sx={{
                    m: 1,
                    width: 300,
                    border: "1px solid azure"
                }}
            >
                <InputLabel sx={{ color: "azure" }} id={content.inputLabelId}>{content.inputLabelText}</InputLabel>
                <Select
                    labelId={content.inputLabelId}
                    id={content.selectId}
                    value={state.choice}
                    label={content.inputLabelText}
                    input={<StyledInput/>}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                >
                    {content.menuItem.map((m: any) => (
                        <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}