import {type ChangeEvent, useState} from "react";
import * as React from "react";

export const useQuestionnaire = (props: {
        textInputList: { idx: number; id: string; label: string; min: number; max: number }[];
        multipleSelectList: { idx: number; id: string; label: string; options: string[] }[]
    }) => {

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
            const [multipleSelectData, setMultipleSelectData] = useState<Record<string, string[]>>(
        Object.fromEntries(props.multipleSelectList.map((p) => [p.id, [] as string[]]))
        );
        const [multipleSelectDataError, setMultipleSelectDataError] = React.useState<Record<string, boolean>>(
            Object.fromEntries(props.multipleSelectList.map((p) => [p.id, false]))
        );
        const [multipleSelectDataErrorMessage, setMultipleSelectDataErrorMessage] = React.useState<Record<string, string>>(
            Object.fromEntries(props.multipleSelectList.map((p) => [p.id, '']))
        );
        const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputData((prev: Record<string, string>) => ({...prev, [event.target.id]: event.target.value}));
    }

    /* Update multipleSelectData for a given select field id.
        Expects an array of selected option values (strings) coming from surveyOptions. */
    const handleMultipleSelectChange = (id: string, values: string[]) => {
        setMultipleSelectData(prev => ({...prev, [id]: values}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateInputs()) {
            alert("Questionnaire submitted successfully!");
            setSubmittedSuccessfully(true);
            //TODO - WORK IN PROGRESS IN DATA SENDING
        } else alert("There are errors in your input. Please correct them and try again.");
    };

    return {
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
    };

};