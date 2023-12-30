import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";

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
            <input
              placeholder="namn"
              type="text"
              name="name"
              onChange={handleChange}
            />
            <input
              placeholder="Email"
              type="text"
              name="email"
              onChange={handleChange}
            />
            <input
              placeholder="lösenord"
              type="text"
              name="password"
              onChange={handleChange}
            />
            <button type="submit">register</button>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
