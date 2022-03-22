import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom";
import Home from './Home';
import { AppBar, createTheme, Dialog, DialogTitle, Grid, IconButton, ThemeProvider } from '@mui/material';
import Question from './DTOs/Question';
import QuestionsService from './services/QuestionsService';
import Context from './Context';
import ErrorDto from './DTOs/Error';import Result from './Result';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<ErrorDto>({} as ErrorDto);
  const [containsError, setContainsError] = useState<boolean>(false);

  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  // react route only works on route components.
  // the history push should be of course, here 
  // it should be void, but the return is used to push the history
  const getQuestions = async () => {
    try {
      let response = await QuestionsService.getAnswers()
      setQuestions(response)
      return true;
    }
    catch(e) {
      setError(e as ErrorDto)
      setContainsError(true)
      return false;
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const resetQuestion = async () => {
    await getQuestions();
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBar position="static">
            <IconButton id="theme" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </AppBar>
          <Dialog onClose={() => {setError({} as ErrorDto); setContainsError(false)}} open={containsError}>
            <DialogTitle>{error.title}</DialogTitle>
            {error.message}
          </Dialog> 
          <Context.Provider value={{questions, mode: theme}}>
            <Router>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/end" element={<Result resetQuestion={resetQuestion}/>}></Route>
                  </Routes>
                </Grid>
              </Grid>
            </Router>
          </Context.Provider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
