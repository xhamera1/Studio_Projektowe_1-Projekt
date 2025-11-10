import MultipleSelect from "./MultipleSelect.tsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import QuestionnaireContainer from "./QuestionnaireContainer.tsx";
import Card from "../Card.tsx"
import CssBaseline from "@mui/material/CssBaseline";
import {Navigate} from "react-router-dom";
import {useQuestionnaire} from "../../hooks/useQuestionnaire.ts";

export type TextInput = {
    idx: number;
    id: string;
    label: string;
    min: number;
    max: number;
}

export type MultipleSelect = {
    idx: number;
    id: string;
    label: string;
    options: string[];
}


const Questionnaire =
    (props: {
        textInputList: { idx: number; id: string; label: string; min: number; max: number }[];
        multipleSelectList: { idx: number; id: string; label: string; options: string[] }[]
    }) => {


        const {
            inputData,
            inputDataError,
            inputDataErrorMessage,
            multipleSelectData,
            multipleSelectDataError,
            multipleSelectDataErrorMessage,
            submittedSuccessfully,
            validateInputs,
            handleInputChange,
            handleMultipleSelectChange,
            handleSubmit
        } = useQuestionnaire(props);

        if (submittedSuccessfully) {
            return <Navigate to="/questionnaire" replace/>;
        }

        return <><CssBaseline enableColorScheme/><QuestionnaireContainer direction="column"
                                                                         justifyContent="space-between">
            <Card variant="outlined">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >

                    {props.textInputList.map((parameter) => (
                        <FormControl key={parameter.id} sx={{mb: 2}}>
                            <FormLabel htmlFor={parameter.id}>{parameter.label}</FormLabel>
                            <Box sx={{'& > :not(style)': {m: 1, width: '25ch'}}}>
                                <TextField
                                    error={inputDataError[parameter.id]}
                                    helperText={inputDataErrorMessage[parameter.id]}
                                    id={parameter.id}
                                    label={parameter.label}
                                    variant="outlined"
                                    type="number"
                                    value={inputData[parameter.id]}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </FormControl>
                    ))}

                    {props.multipleSelectList.map((parameter) => (
                        <MultipleSelect
                                id={parameter.id}
                                label={parameter.label}
                                value={multipleSelectData[parameter.id] ?? []}
                                onChange={(vals) => handleMultipleSelectChange(parameter.id, vals)}
                                surveyOptions={parameter.options}
                                error={multipleSelectDataError[parameter.id]}
                                helperText={multipleSelectDataErrorMessage[parameter.id]}
                            />
                        // <FormControl key={parameter.id} sx={{mb: 2}}>
                        //     <FormLabel>{parameter.label}</FormLabel>
                        //     <Select
                        //         label={parameter.label}
                        //         id={parameter.id}
                        //         multiple
                        //         // value={parameter.}
                        //         onChange={handleMultipleSelectChange}
                        //         input={<OutlinedInput label={parameter.label}/>}
                        //         helperText={multipleSelectDataErrorMessage[parameter.id]}
                        //         // MenuProps={MenuProps}
                        //     >
                        //         {parameter.options.map((option) => (<MenuItem>{option}</MenuItem>))}
                        //     </Select>
                        // </FormControl>
                    ))}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                    >
                        {"Submit questionnaire"}
                    </Button>
                </Box>
            </Card>
        </QuestionnaireContainer>
        </>;
    }

export default Questionnaire;