import AuthInput from "../AuthInput";
import AuthBox from "../AuthBox";
import { VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { errorNotification } from "../../../services/error";

const Registration = () => {
  const [usernameAndPassword, setUsernameAndPassword] = useState({
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const { user, registration } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/start");
    }
  }, [user, navigate]);

  const usernameInputChange = (event) => {
    const username = event.target.value;
    const isValid = username.length >= 5 && username.length <= 30;
    setIsUsernameValid(isValid);
    setUsernameAndPassword((prev) => ({
      ...prev,
      username: username,
    }));
    setIsValid(isValid && isPasswordValid && isConfirmPasswordValid);
  };

  const passwordInputChange = (event) => {
    const password = event.target.value;
    const isValid = password.length >= 5 && password.length <= 50;
    setIsPasswordValid(isValid);
    setUsernameAndPassword((prev) => ({
      ...prev,
      password: password,
    }));
    setIsValid(isValid && isUsernameValid && isConfirmPasswordValid);
  };

  const confirmPasswordInputChange = (event) => {
    const confirmPassword = event.target.value;
    const isValid =
      confirmPassword.length >= 5 &&
      confirmPassword.length <= 50 &&
      confirmPassword === usernameAndPassword.password;
    setIsConfirmPasswordValid(isValid);
    setConfirmPassword(confirmPassword);
    setIsValid(isValid && isUsernameValid && isPasswordValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      registration(usernameAndPassword)
        .then((res) => {
          navigate("/start");
        })
        .catch((err) => {
          errorNotification(err.response.data.detail);
        });
    }
  };

  return (
    <AuthBox>
      <VStack>
        <Button
          colorScheme="teal"
          variant="link"
          display="flex"
          p="3px"
          m="15px auto"
          mb="10px"
          fontSize="25px"
          fontWeight="550"
          justifyContent="center"
          color="beige"
          _hover={{
            borderBottom: "solid rgb(240, 200, 90)",
          }}
          onClick={() => navigate("/")}
        >
          LOGIN
        </Button>
        <form className="registration" onSubmit={handleSubmit}>
          <VStack>
            <AuthInput
              isValid={isUsernameValid}
              type="text"
              id="username"
              placeholder="Username"
              value={usernameAndPassword.username}
              onChange={usernameInputChange}
            />
            <AuthInput
              isValid={isPasswordValid}
              type="password"
              id="password"
              placeholder="Password"
              value={usernameAndPassword.password}
              onChange={passwordInputChange}
            />
            <AuthInput
              isValid={
                isConfirmPasswordValid &&
                usernameAndPassword.password === confirmPassword
              }
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={confirmPasswordInputChange}
            />
          </VStack>
          <Button
            m="20px"
            mt="20px"
            mb="35px"
            p="15px"
            w="300px"
            fontWeight="600"
            borderStyle="none"
            borderRadius="40px"
            backgroundColor={
              isValid && usernameAndPassword.password === confirmPassword
                ? "rgb(180, 180, 15)"
                : "rgb(60, 60, 60, 0.5)"
            }
            pointerEvents={
              isValid && usernameAndPassword.password === confirmPassword
                ? "auto"
                : "none"
            }
            color="white"
            userSelect="none"
            _hover={{
              backgroundColor: "rgba(190, 170, 15, 0.5)",
            }}
            type="submit"
          >
            REGISTRATION
          </Button>
        </form>
      </VStack>
    </AuthBox>
  );
};

export default Registration;
