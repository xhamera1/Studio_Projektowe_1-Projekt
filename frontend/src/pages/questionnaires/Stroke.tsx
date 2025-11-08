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
        id: "avg_glucose_level",
        label: "Average glucose level",
        min: 50,
        max: 250,
    },
    {
        idx: 2,
        id: "height",
        label: "Height",
        min: 120,
        max: 230,
    },
    {
        idx: 3,
        id: "weight",
        label: "Weight",
        min: 30,
        max: 300,
    },
]
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
            {text: 'female', number: 0},
            {text: 'male', number: 1},
        ]
    },
    {
        idx: 1,
        id: "hypertension",
        label: "Hypertension",
        options: [
            {text: 'yes', number: 0},
            {text: 'no', number: 1},
        ]
    },
    {
        idx: 2,
        id: "heart_disease",
        label: "Heart disease",
        options: [
            {text: 'yes', number: 0},
            {text: 'no', number: 1},
        ]
    },
    {
        idx: 3,
        id: "work_type",
        label: "Work type",
        options: [
            {text: 'private', number: 0},
            {text: 'self-employed', number: 1},
            {text: 'government job', number: 2},
            {text: 'children', number: 3},
            {text: 'never worked', number: 4},
        ]
    }
]

const Stroke = () => {
    return <><h1>Stroke Prediction Page</h1>
        <Questionnaire textInputList={textInputList} multipleSelectList={multipleSelectList}/>
    </>
}
export default Stroke;
