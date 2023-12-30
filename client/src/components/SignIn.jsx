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

const SignIn = () => {
  const [open, setOpen] = useState(false);
  const { logInData, setLogInData, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/customer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInData),
    });

    if (!response.ok) {
      throw new Error("wrong password ");
    } else {
      setIsLoggedIn(true);
      handleClose();
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
        <Button variant="outlined" onClick={logOut}>
          Logga ut
        </Button>
      ) : (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
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
            />
            <TextField
              margin="dense"
              name="password"
              label="Lösenord"
              type="password"
              fullWidth
              variant="standard"
              onChange={handleChange}
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
