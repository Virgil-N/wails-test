/**
 * Created Date: 2021-08-27 11:44:18
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-10-09 05:46:53
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import _JSXStyle from "styled-jsx/style";
import {
  Box,
  Link,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  makeStyles
} from "@material-ui/core";
import JSEncrypt from "jsencrypt";
import bgImage from "@/assets/images/xx1_1920x1080.jpg";
import config from "@/configs/config";
import { login } from '@/api/user';
import { useSnackbar } from "notistack";

const runtime = require('@wailsapp/runtime');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" rel="noopener" href="https://www.baidu.com/">
        设计院
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useIsMountedRef = () => {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => isMountedRef.current = false;
  });
  return isMountedRef;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginImg: {
    margin: theme.spacing(1),
    width: "100%",
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    paddingBottom: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  let history = useHistory();
  const isMountedRef = useIsMountedRef();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [account, setAccount] = useState("");
  const [accountHelper, setAccountHelper] = useState(() => {
    return {
      valid: false,
      text: ""
    };
  });
  const [password, setPassword] = useState("");
  const [passwordHelper, setPasswordHelper] = useState(() => {
    return {
      valid: false,
      text: ""
    };
  });

  // const ss = useCallback(() => {
  //   return runtime.Events.On("sendStore", (store) => {
  //     console.log("store changed: ", store)
  //   })
  // }, [])

  // useEffect(() => {
  //   // ss()
  //   // runtime.Events.Emit("getStore")
    
  // }, [ss])

  const validateAccountValue = (params) => {
    if (params.trim() === "") {
      setAccountHelper({
        valid: false,
        text: "请输入账号"
      });
    } else {
      setAccountHelper({
        valid: true,
        text: ""
      });
    }
    if (password.trim() === "") {
      setPasswordHelper({
        valid: false,
        text: "请输入密码"
      });
    } else {
      setPasswordHelper({
        valid: true,
        text: ""
      });
    }
  };

  const validatePasswordValue = (params) => {
    if (params.trim() === "") {
      setPasswordHelper({
        valid: false,
        text: "请输入密码"
      });
    } else {
      setPasswordHelper({
        valid: true,
        text: ""
      });
    }
  };

  const changeAccount = (event) => {
    if (event && event.target) {
      setAccount(event.target.value);
      validateAccountValue(event.target.value);
    }
  };

  const changePassword = (event) => {
    if (event && event.target) {
      setPassword(event.target.value);
      validatePasswordValue(event.target.value);
    }
  };

  const submitFormWithKeyboard = (event) => {
    if (isMountedRef.current) {
      event || (event = window.event);
      if (event.which == null) {
        event.which = event.charCode != null ? event.charCode : event.keyCode;
      }
      if (event.which === 13) {
        submitForm();
      }
    }
  };

  const submitForm = async (event) => {
    // runtime.Events.Emit("updateStore", {appName: "wails-App"})
    
    if (isMountedRef.current) {
      if (event) {
        event.preventDefault();
      }
      validateAccountValue(account);
      validatePasswordValue(password);
      if (accountHelper.valid === true && passwordHelper.valid === true) {
        setIsSendingRequest(true);
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(process.env.REACT_APP_PUBLIC_KEY);
        const pwd = encrypt.encrypt(password);
        const sendData = { Name: account, Password: pwd };
        runtime.Events.Emit("login", sendData);
        // try {
        //   const res = await login(sendData);
        //   if (res.code === 2000) {
        //     // history.push("/main/home");
        //     enqueueSnackbar("login success", {variant: "success"});
        //   } else {
        //     enqueueSnackbar(res.msg, {variant: "error"});
        //   }
        //   setIsSendingRequest(false);
        // } catch(err) {
        //   console.log("err: ", err);
        //   enqueueSnackbar(err, {variant: "error"});
        //   setIsSendingRequest(false);
        // }
      }
    }
  };

  return (
    <div className="login-wrap">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <img src={loginImg} className={classes.loginImg}></img> */}
          <Typography component="h1" variant="h3">
            {config.appName + " (v" + config.appVersion + ")"}
          </Typography>
          <form className={classes.form} autoComplete="off">
            <div className="account-wrap">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="account"
                label="账号"
                name="email"
                value={account}
                autoComplete="account"
                helperText={accountHelper.text}
                error={accountHelper.valid === false}
                onChange={changeAccount}
                disabled={isSendingRequest}
                autoFocus
              />
            </div>
            <div className="password-wrap">
              <TextField
                className="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="密码"
                name="password"
                value={password}
                type="password"
                autoComplete="current-password"
                helperText={passwordHelper.text}
                error={passwordHelper.valid === false}
                onChange={changePassword}
                onKeyPress={submitFormWithKeyboard}
                disabled={isSendingRequest}
              />
            </div>
            {/* <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">{accountHelperText}</FormHelperText>
            </FormControl> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="记住我"
            /> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disableElevation={true}
              className={classes.submit}
              disabled={isSendingRequest}
              onClick={submitForm}
            >
              登录
            </Button>
          </form>
        </div>
        <Box mt={5} mb={2}>
          <Copyright />
        </Box>
      </Container>
      <style jsx>{`
        .login-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          background-image: url(${bgImage});
          background-size: 100% 100%;
          background-repeat: no-repeat;
          :global(main) {
            background-color: rgba(255, 255, 255, 1);
          }
          :global(form) {
            margin-top: 24px;
          }
          :global(.account-wrap, .password-wrap) {
            display: block;
            box-sizing: border-box;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login