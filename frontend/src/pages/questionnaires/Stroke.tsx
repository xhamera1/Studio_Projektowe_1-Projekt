import Questionnaire, {type MultipleSelect, type TextInput} from "../../components/questionnaire/Questionnaire";

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
        id: "avg_glucose_level",
        label: "Average glucose level",
        min: 0,
        max: 1,
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
        id: "hypertension",
        label: "Hypertension",
        options: [
            'yes',
            'no',
        ]
    },
    {
        idx: 2,
        id: "heart_disease",
        label: "Heart disease",
        options: [
            'yes',
            'no',
        ]
    },
    {
        idx: 3,
        id: "work_type",
        label: "Work type",
        options: [
            'private',
            'self-employed',
            'government job',
            'children',
            'never worked',
        ]
    }
]

const Stroke = () => {
    return <><h1>Stroke Prediction Page</h1>
        <Questionnaire textInputList={textInputList} multipleSelectList={multipleSelectList}/>
    </>
}
export default Stroke;