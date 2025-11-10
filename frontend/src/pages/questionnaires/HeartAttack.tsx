import Questionnaire, {type MultipleSelect, type TextInput} from "../../components/questionnaire/Questionnaire.tsx";

const textInputList: TextInput[] = [
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

const multipleSelectList: MultipleSelect[] = [
    {
        idx: 0,
        id: "sex",
        label: "Sex",
        options: [
            'female',
            'male',
        ]
    },
    {
        idx: 1,
        id: "cp",
        label: "Chest pain type",
        options: [
            'typical angina',
            'atypical angina',
            'non-anginal pain',
            'asymptomatic',
        ]
    },
    {
        idx: 2,
        id: "exang",
        label: "Exercise induced angina",
        options: [
            'no',
            'yes',
        ]
    },
];

const HeartAttack = () => {
    return <><h1>Heart Attack Prediction Page</h1>
        <Questionnaire textInputList={textInputList} multipleSelectList={multipleSelectList}/></>
};

export default HeartAttack;