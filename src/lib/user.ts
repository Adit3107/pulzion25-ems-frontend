export interface User {  
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  college: string;
  year: string;
  created_at: string;
  updated_at: string;
  referral_code?: string;
  count?: number;
  house?: {
    id: number;
    fk_user: number;
    fk_house: number;
    points: string;
    rank: number;
    updated_at: string;
  } | null;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

export const initialUser: User = {
  id: 1,
  first_name: "Vivek",
  last_name: "Bhalke",
  email: "ajm.vivekbhalke@gmail.com",
  mobile_number: "8237445621",
  college: "PICT",
  year: "TE",
  created_at: "2025-09-30T10:07:58.624Z",
  updated_at: "2025-09-30T10:07:58.624Z",
  referral_code: "w2lmb7",
  count: 0,
  house: {
    id: 7,
    fk_user: 1,
    fk_house: 2,
    points: "0",
    rank: 0,
    updated_at: "2025-10-01T07:22:43.159Z",
  },
};
