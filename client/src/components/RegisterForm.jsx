import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
const RegisterForm = () => {
  const [isRegisterd, setIsRegisterd] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch ");
    } else {
      console.log(response);
      setIsRegisterd(true);
    }
  };

  return (
    <>
      {isRegisterd ? (
        <p>Du är registrerad</p>
      ) : (
        <div>
          <p>Eller registrera dig nedan</p>
          <form className="form-container" onSubmit={handleSubmit}>
            <TextField
              name="name"
              type="password"
              margin="dense"
              label="Namn"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              name="email"
              type="text"
              margin="dense"
              label="Email"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              name="password"
              type="text"
              margin="dense"
              label="Lösenord"
              fullWidth
              variant="standard"
              onChange={handleChange}
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
