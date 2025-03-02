import { createContext, Context } from "react";

// Define a type for the context value (you can customize it according to your needs)
export interface AppContextType {
    studentFile?: any | null;
    setStudentFile: (studentFile: any | null) => void;
}

// Create the AppContext with an initial default value of `undefined`
const AppContext: Context<AppContextType | any> = createContext<AppContextType | any>(undefined);

export default AppContext;

