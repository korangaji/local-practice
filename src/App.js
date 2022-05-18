import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { StylesProvider } from '@material-ui/core';
import styles from '../src/App.css';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Google from '../src/Google.png';
import { TextareaAutosize } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Shop} from './Shop';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    flexGrow: 1,

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
      width: "300px",
      margin: "25px auto 0px auto",
      width: "88%",
      borderRadius: "20px",
      height: "50px"
    },
    '& .MuiAppBar-root': {
      width: " 1261px",
      marginTop: "-16px"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 20,
      textAlign: "center"
    },
    logo: {
      maxWidth: 40,
      marginRight: '10px'
    }
  },
}));

const App = ({ handleClose }) => {
  const amount = useSelector(state=>state.amount)
  const updateBar = useSelector(store=>store.textReducer.editText)
  console.log(updateBar)
  const classes = useStyles();
  const [errors, setErros] = useState({});
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    DOB: "",
  })
  const [modelOpen, setModelOpen] = useState(false)
  const [username_ErMsg, setusername_ErMsg] = useState("");
  const [password_ErMsg, setpassword_ErMsg] = useState("");
  const [displaytext, setdisplaytext] = useState("hideBlock");
  const [password, setPassword] = useState("");
  const handleInputs = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
    setErros({ errors, [event.target.name]: "" })
  }
const toggleModel = ()=>{
setModelOpen(!modelOpen)
}
  //Password handling
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setpassword_ErMsg('');
  };
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,

  });
  //Password showing
  const handleClickShowPassword = () => {
    console.log(values.password);
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //API Submission call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if
      (!validateForm()) {
      return
    }
    var data = {
      firstname: state.firstName,
      lastname: state.lastName,
      email: state.email,
      encryptpassword: state.password,
      mobile: state.mobileNumber,
      dob: state.DOB,
    }
    axios({
      url: `https://atologistinfotech.com/api/register.php`,
      method: 'POST',
      headers: {
        "accept": "application/json",
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      data: JSON.stringify(data)
    }).then((response) => {
      setState({
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
        DOB: moment().format("DD-MM-YYYY"),
      })
      if (response.data.success) {
        toast.success(response.data.message)
      }
    })
      .catch((err) => {
        console.log(err.Response)
      });
  };

  //Date picker
  const handleChange = (e, type) => {

    setState({
      ...state,
      DOB: e.target.value
    })
  };

  // validate form using regex
  const validateForm = () => {
    var mobileValid = state.mobileNumber.match(/^[0]?[6789]\d{9}$/);
    var emailValid = state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var isValid = true;
    if (state.firstName == '') {
      errors.firstName = " firstname is required";
      isValid = false;
    }
    else if (state.lastName == '') {
      errors.lastName = "lastname is required";
      isValid = false;
    }
    else if (state.email.toString().trim() == '' || !emailValid) {
      errors.email = "email is required";
      isValid = false;
    }
    else if (state.password.trim() == '') {
      errors.password = "password is required";
      setpassword_ErMsg("password is required")
      setdisplaytext('showBlock')
      isValid = false;
    }
    else if (state.mobileNumber.toString().trim() == '') {
      errors.mobileNumber = "mobile number is required or invalid number";
      isValid = false;
    }
    else if (state.DOB == '') {
      errors.DOB = "This field is required";
      isValid = false;
    }
    setErros({ ...errors, errors: errors })
    return isValid
  }

  return (
    <form className={classes.root} >
      <div className="SignUp_body">
        <AppBar position="static">
          <Toolbar>
            <a href="https://www.google.com//">
              <img src={Google} alt="Kitty Katty!" className={classes.logo} style={{ width: "80px" }} />
            </a>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            <Button color="inherit" style={{ marginLeft: "auto", justifyContent: "right", marginTop: "2px" }}>My Balance:{amount}</Button>
           {updateBar && <Button color="inherit" style={{ marginLeft: "auto", justifyContent: "right", marginTop: "2px" }}>Total Amount{amount}</Button>}
          </Toolbar>
        </AppBar>
       <Shop/>
        <div className="Box">
          <TextField
            label="First Name"
            name="firstName"
            value={state.firstName}
            onChange={handleInputs}
          >
          </TextField>
          <div className="error_message">{errors.firstName}</div>
          <TextField
            label="Last Name"
            name="lastName"
            value={state.lastName}
            onChange={handleInputs}
          >
          </TextField>
          <div className="error_message">{errors.lastName}</div>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputs}
          >
          </TextField>
          <div className="error_message">{errors.email}</div>
          <TextField
            label="password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputs}
          >
          </TextField>
          <div className="error_message">{errors.password}</div>

          <TextField
            label="Mobile"
            name="mobileNumber"
            value={state.mobileNumber}
            onChange={handleInputs}
          >
          </TextField>
          <div className="error_message">{errors.mobileNumber}</div>
          <TextField
            type='date' name="DOB"
            value={state.DOB}
            onChange={(e) => handleChange(e)}
          >
          </TextField>
          <div className="error_message">{errors.DOB}</div>
          <ul className="conditions">
            <li claassname="tackle"> <a href="https://support.google.com/accounts?hl=en#topic=3382296" className="link">Help</a></li>
            <li claassname="tackle"> <a href="https://policies.google.com/privacy?gl=IN&hl=en" className="link">Privacy</a></li>
            <li claassname="tackle"><a href="https://policies.google.com/terms?gl=IN&hl=en" className="link">Terms</a></li>
          </ul>
          <div className="buttons">
            <Button type="submit" variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>
              Signup
            </Button>
            <Button variant="contained" onClick={toggleModel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default App;
