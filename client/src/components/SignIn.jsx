import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoginIcon from "@mui/icons-material/Login";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Zoom } from "@mui/material";

const SignIn = () => {
  const [open, setOpen] = useState(false);
  const { logInData, setLogInData, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Clear any previous errors when the dialog is closed
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!logInData.email) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(logInData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!logInData.password) {
      newErrors.password = "Please enter your password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const response = await fetch("/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInData),
      });

      if (!response.ok) {
        setErrors({ password: "Wrong password" });
        throw new Error("Wrong password");
      } else {
        setIsLoggedIn(true);
        handleClose();
      }
    }
  };

  const logOut = async () => {
    const response = await fetch("/api/customer/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Zoom
            in={isLoggedIn}
            style={{ transitionDelay: isLoggedIn ? "200ms" : "0ms" }}
          >
            <CheckCircleOutlineOutlinedIcon
              style={{ fontSize: "100px", width: "100%" }}
            ></CheckCircleOutlineOutlinedIcon>
          </Zoom>
          <h2
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            Inloggad
          </h2>
          <Button
            style={{ borderColor: "black", color: "black", width: "100%" }}
            variant="outlined"
            onClick={logOut}
          >
            Logga ut
          </Button>
        </div>
      ) : (
        <>
          <Button
            style={{ borderColor: "black", color: "black", width: "100%" }}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Logga in
          </Button>
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign in</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Enter Email and password</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="dense"
              name="password"
              label="Lösenord"
              type="password"
              fullWidth
              variant="standard"
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Logga in
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default SignIn;
