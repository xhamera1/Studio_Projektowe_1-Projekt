import { Route, Routes } from 'react-router-dom';
import Stroke from '../pages/questionnaires/Stroke.tsx';
import Questionnaires from '../pages/questionnaires/Questionnaires.tsx';
import HeartAttack from '../pages/questionnaires/HeartAttack.tsx';
import Habits from '../pages/questionnaires/Habits.tsx';
import Diabetes from '../pages/questionnaires/Diabetes.tsx';

const QuestionnaireRoutes = () => {
  return (
    <Routes>
      <Route index element={<Questionnaires />} />
      <Route path={'diabetes'} element={<Diabetes />} />
      <Route path={'stroke'} element={<Stroke />} />
      <Route path={'heart-attack'} element={<HeartAttack />} />
      <Route path={'habits'} element={<Habits />} />
    </Routes>
  );
};

export default QuestionnaireRoutes;
