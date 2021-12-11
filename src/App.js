import logo from './logo.svg';
import './App.css';
import { Stack, TextField, Typography, Button, Checkbox } from '@mui/material';
import { useState } from 'react';
import { numbers, lowerCaseLetters, upperCaseLetters, specialCharacters } from './characters';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [password, setPassword] = useState('');
  const [passwordL, setPasswordL] = useState(15);
  const [haveNumbers, setHaveNumbers] = useState(false);
  const [havelowerCaseLetters, setHaveLowerCaseLetters] = useState(false);
  const [haveUpperCaseLetters, setHaveUpperCaseLetters] = useState(false);
  const [haveSpecials, setHaveSpecials] = useState(false);

  const notify = (notif, state) => {
    if(state === 'error'){
    toast.error(notif, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }else if(state === 'success'){
      toast.success(notif, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }



  const handleLengthChange = e => {
    setPasswordL(e.target.value);
  }

  const generatePassword = (e) => {
    if (!haveNumbers && !haveSpecials && !haveUpperCaseLetters && !havelowerCaseLetters) {
      notify("One value must be selected", 'error');
      return;
    }
    let passwordCharacters = '';

    if (havelowerCaseLetters) {
      passwordCharacters = passwordCharacters + lowerCaseLetters
    }
    if (haveUpperCaseLetters) {
      passwordCharacters = passwordCharacters + upperCaseLetters
    }
    if (haveSpecials) {
      passwordCharacters = passwordCharacters + specialCharacters
    }
    if (haveNumbers) {
      passwordCharacters = passwordCharacters + numbers
    }
    setPassword(createPasswordFromCharacters(passwordCharacters));
    notify('Password generated', 'success')

  }
  const createPasswordFromCharacters = (characters) => {
    let password = '';
    const charactersL = characters.length

    for (var i = 0; i < passwordL; i++) {
      const characterAt = Math.round(Math.random() * charactersL);
      password = password + characters.charAt(characterAt);
    }
    return password
  }

  return (
    <div className="App">
      <Stack>
        <Typography variant='h4'>Include lower case letters</Typography>
        <Checkbox
          checked={havelowerCaseLetters}
          onChange={((e) => setHaveLowerCaseLetters(e.target.checked))}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography variant='h4'>Include Upper case letters</Typography>
        <Checkbox
          checked={haveUpperCaseLetters}
          onChange={((e) => setHaveUpperCaseLetters(e.target.checked))}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography variant='h4'>include special characters</Typography>
        <Checkbox
          checked={haveSpecials}
          onChange={((e) => setHaveSpecials(e.target.checked))}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography variant='h4'>include numbers</Typography>
        <Checkbox
          checked={haveNumbers}
          onChange={((e) => setHaveNumbers(e.target.checked))}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <TextField
          value={passwordL}
          type="number"
          variant='outlined'
          onChange={handleLengthChange}
        />
        <Button onClick={generatePassword} >Generate password</Button>
        <Typography variant='h4'>Generated password: </Typography>
        <Typography variant='h1'>{password}</Typography>
      </Stack>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
    </div>
  );
}

export default App;
