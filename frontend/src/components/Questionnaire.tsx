import MultipleSelect from "./MultipleSelect.tsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import QuestionnaireContainer from "./QuestionnaireContainer.tsx";
import Card from "./Card.tsx"
import CssBaseline from "@mui/material/CssBaseline";


const Questionnaire =
    (props: {
        textInputList: { idx: number; id: string; label: string; min: number; max: number }[];
        multipleSelectList: { idx: number; id: string; label: string; options: { text: string; number: number; }[] }[]
    }) => {

        // Store inputs as objects keyed by parameter id for easy lookup and updates.
        const [inputData, setInputData] = useState<Record<string, string>>(
            Object.fromEntries(props.textInputList.map((p) => [p.id, '']))
        );
        // Track per-field error flags and messages keyed by id.
        const [inputDataError, setInputDataError] = React.useState<Record<string, boolean>>(
            Object.fromEntries(props.textInputList.map((p) => [p.id, false]))
        );
        const [inputDataErrorMessage, setInputDataErrorMessage] = React.useState<Record<string, string>>(
            Object.fromEntries(props.textInputList.map((p) => [p.id, '']))
        );

        // Track multiple-select values keyed by id (each is an array of selected numbers).
        const [multipleSelectData, setMultipleSelectData] = useState<Record<string, number[]>>(
            Object.fromEntries(props.multipleSelectList.map((p) => [p.id, [] as number[]]))
        );
        const [multipleSelectDataError, setMultipleSelectDataError] = React.useState<Record<string, boolean>>(
            Object.fromEntries(props.multipleSelectList.map((p) => [p.id, false]))
        );
        const [multipleSelectDataErrorMessage, setMultipleSelectDataErrorMessage] = React.useState<Record<string, string>>(
            Object.fromEntries(props.multipleSelectList.map((p) => [p.id, '']))
        );

        const validateInputs = () => {

            const textInputParameters = props.textInputList.map(
                (parameter) =>
                    (document.getElementById(parameter.id) as HTMLInputElement)
            )
            let isValid = true;

            for (let i = 0; i < textInputParameters.length; i++) {
                if (!textInputParameters[i].value || textInputParameters[i].value.length < 1) {
                    setInputDataError(prev => ({
                        ...prev,
                        [textInputParameters[i].id]: true
                    }));
                    setInputDataErrorMessage(prev => ({
                        ...prev,
                        [textInputParameters[i].id]: 'Please fill in all required fields'
                    }));
                    isValid = false;
                } else if (Number(textInputParameters[i].value) < props.textInputList[i].min
                    || Number(textInputParameters[i].value) > props.textInputList[i].max) {
                    setInputDataError(prev => ({
                        ...prev,
                        [textInputParameters[i].id]: true
                    }));
                    setInputDataErrorMessage(prev => ({
                        ...prev,
                        [textInputParameters[i].id]: 'Value must be between ' +
                            props.textInputList[i].min + ' and ' + props.textInputList[i].max
                    }));
                    isValid = false;
                } else {
                    setInputDataError(prev => ({
                        ...prev,
                        [textInputParameters[i].id]: false
                    }));
                    setInputDataErrorMessage(prev => ({
                        ...prev,
                        [textInputParameters[i].id]: ''
                    }));
                }
            }

            for (let i = 0; i < props.multipleSelectList.length; i++) {
                const param = props.multipleSelectList[i];
                const selected = multipleSelectData[param.id] ?? [];
                if (!selected || selected.length === 0) {
                    setMultipleSelectDataError(prev => ({...prev, [param.id]: true}));
                    setMultipleSelectDataErrorMessage(prev => ({
                        ...prev,
                        [param.id]: 'Please select at least one option'
                    }));
                    isValid = false;
                } else {
                    setMultipleSelectDataError(prev => ({...prev, [param.id]: false}));
                    setMultipleSelectDataErrorMessage(prev => ({...prev, [param.id]: ''}));
                }
            }

            return isValid;
        };

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (validateInputs()) {
                alert("Questionnaire submitted successfully!");
                //TODO - WORK IN PROGRESS IN DATA SENDING
            }
            else alert("There are errors in your input. Please correct them and try again.");
        };

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
                                    onChange={e => setInputData((prev) => ({...prev, [parameter.id]: e.target.value}))}
                                />
                            </Box>
                        </FormControl>
                    ))}

                    {props.multipleSelectList.map((parameter) => (
                        <FormControl key={parameter.id} sx={{mb: 2}}>
                            <FormLabel>{parameter.label}</FormLabel>
                            <MultipleSelect
                                id={parameter.id}
                                label={parameter.label}
                                error={multipleSelectDataError[parameter.id]}
                                helperText={multipleSelectDataErrorMessage[parameter.id]}
                                surveyOptions={parameter.options}
                                value={multipleSelectData[parameter.id]}
                                onChange={v => setMultipleSelectData(prev => ({...prev, [parameter.id]: v}))}
                            />
                        </FormControl>
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