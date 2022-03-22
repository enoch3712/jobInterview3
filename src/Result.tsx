import { Button, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Context from './Context';

interface Props 
{
    resetQuestion : () => Promise<void>
}

export default function Result(props : Props) {

    const { Consumer } = Context;
    const navigate = useNavigate();

    const reset = () => {
        props.resetQuestion()
        navigate('/')
    }

    return (
        <React.Fragment>
                <Consumer>
                {data => 
                    <ThemeProvider theme={data.mode}>
                        <CssBaseline />
                        <Container maxWidth="sm">
                            <Grid container spacing={10}>
                                <Grid item xs={12}/>
                                <Grid item xs={12}>
                                    <Typography variant="h4" style={{fontWeight:'bold', color: "gray"}}>Results</Typography>
                                </Grid>
                                {
                                    data.questions.map(question => 
                                        <Grid item xs={12}>
                                            <TextField 
                                                id="question" 
                                                label={question.question} 
                                                variant="standard"
                                                fullWidth
                                                value={question.answer}
                                            />
                                        </Grid>
                                    ) 
                                }
                                <Grid item xs={12}>
                                    <Button id="reset" variant="contained" disableRipple onClick={reset}>
                                        <Typography>
                                            Reset
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