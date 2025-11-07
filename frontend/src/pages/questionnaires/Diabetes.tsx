import Questionnaire from "../../components/Questionnaire.tsx";

const textInputList = [
    {
        idx: 0,
        id: "age",
        label: "Age",
        min: 10,
        max: 100,
    },
    {
        idx: 1,
        id: "height",
        label: "Height",
        min: 120,
        max: 230,
    },
    {
        idx: 2,
        id: "weight",
        label: "Weight",
        min: 30,
        max: 300,
    },
    {
        idx: 3,
        id: "HbA1c_level",
        label: "HbA1c level",
        min: 3.5,
        max: 18,
    },
    {
        idx: 4,
        id: "blood_glucose_level",
        label: "Blood glucose level",
        min: 40,
        max: 600,
    }];

const multipleSelectList = [
    {
        idx: 0,
        id: "smoking_habits",
        label: "Smoking habits",
        options: [
            { text: 'no info', number: 0},
            { text: 'current', number: 1},
            { text: 'ever', number: 2},
            { text: 'former', number: 3},
            { text: 'never', number: 4},
            { text: 'not current', number: 5},
        ]
    }
];


const Diabetes = () => {
    return <><h1>Diabetes Prediction Page</h1>
        <Questionnaire textInputList={textInputList} multipleSelectList={multipleSelectList}/>
    </>;
};

export default Diabetes;