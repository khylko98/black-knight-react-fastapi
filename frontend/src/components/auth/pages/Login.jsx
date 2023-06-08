import AuthInput from "../AuthInput";
import AuthBox from "../AuthBox";
import { VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { errorNotification } from "../../../services/error";

const Login = () => {
  const [usernameAndPassword, setUsernameAndPassword] = useState({
    username: "",
    password: "",
  });
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isValid = isUsernameValid && isPasswordValid;

  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/start");
  }

  const usernameInputChange = (event) => {
    event.target.value.length >= 5 && event.target.value.length <= 30
      ? setIsUsernameValid(true)
      : setIsUsernameValid(false);
    setUsernameAndPassword((prev) => ({
      ...prev,
      username: event.target.value,
    }));
  };

  const passwordInputChange = (event) => {
    event.target.value.length >= 5 && event.target.value.length <= 50
      ? setIsPasswordValid(true)
      : setIsPasswordValid(false);
    setUsernameAndPassword((prev) => ({
      ...prev,
      password: event.target.value,
    }));
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      login(usernameAndPassword)
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
          display={"flex"}
          p={"3px"}
          m={"15px auto"}
          mb={"10px"}
          fontSize={"25px"}
          fontWeight={"550"}
          justifyContent={"center"}
          color={"beige"}
          _hover={{
            borderBottom: "solid rgb(240, 200, 90)",
          }}
          onClick={() => navigate("/registration")}
        >
          REGISTRATION
        </Button>
        <form className="login" onSubmit={handlerSubmit}>
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
          </VStack>
          <Button
            m={"20px"}
            mt={"20px"}
            mb={"35px"}
            p={"15px"}
            w={"300px"}
            fontWeight={"600"}
            borderStyle={"none"}
            borderRadius={"40px"}
            backgroundColor={
              isValid ? "rgb(180, 180, 15)" : "rgb(60, 60, 60, 0.5)"
            }
            pointerEvents={isValid ? "auto" : "none"}
            color={"white"}
            userSelect={"none"}
            _hover={{
              backgroundColor: "rgba(190, 170, 15, 0.5)",
            }}
            type={"submit"}
          >
            LOGIN
          </Button>
        </form>
      </VStack>
    </AuthBox>
  );
};

export default Login;
