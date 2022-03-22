import { Button, Container, CssBaseline, Grid, Step, StepLabel, Stepper, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Context from './Context';
import Question from './DTOs/Question';

export default function Home() {

    const { Consumer } = Context;
    const [questionIdx, setQuestionIdx] = useState(0);
    const [answer, setAnswer] = useState("");
    
    const navigate = useNavigate();

    const changeQuestion = (idx : number, questions : Question[]) => {
        questions[questionIdx].answer = answer;

        setAnswer(questions[idx].answer);
        setQuestionIdx(idx);
    }

    const showQuestions = () => {
        navigate("/end");
    }

    const isIncomplete = (questions : Question[]) => questions.some(e => e.answer === "")

    return (
        <React.Fragment>
            <Consumer>
            {data => 
                <ThemeProvider theme={data.mode}>
                    <CssBaseline />
                    <Container maxWidth="xs">
                        <Grid container spacing={5}>
                            <Grid item xs={12}/>
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom component="div" style={{fontWeight:'bold', color: "gray"}}>
                                    Questions
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="question" 
                                    label={data.questions[questionIdx]?.question} 
                                    variant="standard"
                                    fullWidth
                                    onChange={e => { setAnswer(e.target.value); data.questions[questionIdx].answer = e.target.value }}
                                    value={answer}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Stepper activeStep={questionIdx} alternativeLabel>
                                    {data.questions.map((_, idx) => (
                                        <Step id={`questions_${idx}`} key={`questions_${idx}`} onClick={() => { changeQuestion(idx, data.questions) }}>
                                            <StepLabel>{}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Grid>
                            <Grid item xs={12}>
                                <Button id="button" variant="contained" onClick={showQuestions} disabled={isIncomplete(data.questions)}>
                                    <Typography>
                                        Show Results
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>   
                </ThemeProvider>
            }
            </Consumer>
        </React.Fragment>
    );
}