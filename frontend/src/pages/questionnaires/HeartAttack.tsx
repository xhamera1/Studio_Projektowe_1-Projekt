import Questionnaire from "../../components/Questionnaire.tsx";

const textInputList: { idx: number; id: string; label: string; min: number; max: number; }[] = [
    {
        idx: 0,
        id: "age",
        label: "Age",
        min: 10,
        max: 100,
    },
    {
        idx: 1,
        id: "trestbps",
        label: "Resting blood pressure",
        min: 100,
        max: 200,
    },
    {
        idx: 2,
        id: "chol",
        label: "Cholesterol",
        min: 120,
        max: 280,
    },
    {
        idx: 3,
        id: "thalach",
        label: "Maximum heartrate achieved",
        min: 0,
        max: 10000,
    },
    {
        idx: 4,
        id: "oldpeak",
        label: "ST depression induced by exercise relative to rest",
        min: 0,
        max: 1,
    }
];

const multipleSelectList: {
    idx: number;
    id: string;
    label: string;
    options: { text: string; number: number; }[];
}[] = [
    {
        idx: 0,
        id: "sex",
        label: "Sex",
        options: [
            { text: 'female', number: 0},
            { text: 'male', number: 1},
        ]
    },
    {
        idx: 1,
        id: "cp",
        label: "Chest pain type",
        options: [
            { text: 'typical angina', number: 1},
            { text: 'atypical angina', number: 2},
            { text: 'non-anginal pain', number: 3},
            { text: 'asymptomatic', number: 4},
        ]
    },
    {
        idx: 2,
        id: "exang",
        label: "Exercise induced angina",
        options: [
            { text: 'no', number: 0},
            { text: 'yes', number: 1},
        ]
    },
];

const HeartAttack = () => {
    return <><h1>Heart Attack Prediction Page</h1>
        <Questionnaire textInputList={textInputList} multipleSelectList={multipleSelectList}/></>
};

export default HeartAttack;
