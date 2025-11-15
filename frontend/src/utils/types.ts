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

export type PredictionResponse = {
  probability: number;
  recommendations: string;
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
};
