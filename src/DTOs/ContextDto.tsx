import { Theme } from "@mui/material";
import Question from "./Question";

export interface ContextDto {
    questions: Question[];
    mode : Theme;
}