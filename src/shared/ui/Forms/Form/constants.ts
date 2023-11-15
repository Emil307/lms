import { createContext, useContext } from "react";
import { FormSubmittingContextValue } from "./types";

export const FormSubmittingContext = createContext<FormSubmittingContextValue>(false);
export const useFormSubmittingContext = () => useContext(FormSubmittingContext);
