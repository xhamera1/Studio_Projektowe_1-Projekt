import Questionnaire from "../../components/Questionnaire.tsx";

const textInputList: { idx: number; id: string; label: string; min: number; max: number; }[] = []
const multipleSelectList: {
    idx: number;
    id: string;
    label: string;
    options: { text: string; number: number; }[];
}[] = []

const Habits = () => {
    return <><h1>Habits Prediction Page</h1><Questionnaire textInputList={textInputList}
                                                           multipleSelectList={multipleSelectList}/></>
};

export default Habits;
