export type UserRole = 'ADMIN' | 'USER';

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDemographics = {
  sex: number;
  dateOfBirth: Date;
  weight: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
};

export type JwtToken = {
  value: string;
  expiresIn: number;
};

export type ApiError = {
  status: number;
  title: string;
  detail: string;
  timestamp: string;
  errors?: Record<string, string>;
};

export type DiabetesPredictionRequest = {
  hba1cLevel: number;
  bloodGlucoseLevel: number;
  bmi: number;
  age: number;
  smokingHistory: number;
};

export type StrokePredictionRequest = {
  age: number;
  sex: number;
  hypertension: number;
  heartDisease: number;
  workType: number;
  avgGlucoseLevel: number;
  bmi: number;
};

export type HeartAttackPredictionRequest = {
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  thalach: number;
  oldpeak: number;
  exang: number;
};

export type LoginResponse = {
  jwtToken: JwtToken;
  user: User;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type SignupRequest = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  demographics?: UserDemographicsRequest | null;
};

export type UserDemographicsRequest = {
  sex: number;
  dateOfBirth: Date;
  weight: number;
  height: number;
};

export type UpdateUserRequest = {
  email: string;
  firstName: string;
  lastName: string;
};

export type StrokePredictionRecord = {
  id: number;
  age: number;
  sex: number;
  hypertension: number;
  heartDisease: number;
  workType: number;
  avgGlucoseLevel: number;
  bmi: number;
  predictionProbability: number;
  recommendations: string;
  createdAt: Date;
};

export type DiabetesPredictionRecord = {
  id: number;
  hba1cLevel: number;
  bloodGlucoseLevel: number;
  bmi: number;
  age: number;
  smokingHistory: number;
  predictionProbability: number;
  recommendations: string;
  createdAt: Date;
};

export type HeartAttackPredictionRecord = {
  id: number;
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  thalach: number;
  oldpeak: number;
  exang: number;
  predictionProbability: number;
  recommendations: string;
  createdAt: Date;
};

export type HabitsAssessmentRequest = {
  waterIntakeGlasses: number;
  sleepHours: number;
  stepsPerDay: number;
  exerciseMinutes: number;
  screenTimeHours: number;
  stressLevel: number;
  fruitsVeggiesServings: number;
};

export type HabitsAssessmentRecord = HabitsAssessmentRequest & {
  id: number;
  wellnessScore: number;
  recommendations: string;
  createdAt: Date;
};

export type PredictionHistoryResponse = {
  strokePredictions: StrokePredictionRecord[];
  diabetesPredictions: DiabetesPredictionRecord[];
  heartAttackPredictions: HeartAttackPredictionRecord[];
  habitAssessments: HabitsAssessmentRecord[];
};

export type PredictionType = 'stroke' | 'diabetes' | 'heartAttack' | 'habits';

export type SelectedPrediction =
  | { type: 'stroke'; record: StrokePredictionRecord }
  | { type: 'diabetes'; record: DiabetesPredictionRecord }
  | { type: 'heartAttack'; record: HeartAttackPredictionRecord }
  | { type: 'habits'; record: HabitsAssessmentRecord }
  | null;
