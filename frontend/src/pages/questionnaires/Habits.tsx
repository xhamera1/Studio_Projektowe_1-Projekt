import Questionnaire, {type MultipleSelect, type TextInput} from "../../components/questionnaire/Questionnaire.tsx";

const textInputList: TextInput[] = []
const multipleSelectList: MultipleSelect[] = []

const Habits = () => {
    return <><h1>Habits Prediction Page</h1><Questionnaire textInputList={textInputList}
                                                           multipleSelectList={multipleSelectList}/></>
};

export default Habits;