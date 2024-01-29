import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.name) {
      newErrors.name = "Please enter your name";
    }

    if (!userData.email) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!userData.password) {
      newErrors.password = "Please enter your password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const response = await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch");
      } else {
        console.log(response);
        setIsRegistered(true);
      }
    }
  };

  return (
    <>
      {isRegistered ? (
        <p>Du är registrerad</p>
      ) : (
        <div>
          <p>Eller registrera dig nedan</p>
          <form className="form-container" onSubmit={handleSubmit}>
            <TextField
              name="name"
              type="text"
              margin="dense"
              label="Namn"
              fullWidth
              variant="standard"
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              name="email"
              type="text"
              margin="dense"
              label="Email"
              fullWidth
              variant="standard"
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              name="password"
              type="password"
              margin="dense"
              label="Lösenord"
              fullWidth
              variant="standard"
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              style={{ borderColor: "black", color: "black", width: "100%" }}
              variant="outlined"
              type="submit"
            >
              register
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
