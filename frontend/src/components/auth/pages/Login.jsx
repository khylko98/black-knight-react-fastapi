import AuthInput from "../AuthInput";
import AuthBox from "../AuthBox";
import { VStack } from "@chakra-ui/react";

const Login = () => {
  return (
    <AuthBox>
      <VStack>
        <AuthInput
          isValid={true}
          type="password"
          id="password"
          placeholder="Password"
          value={""}
          onChange={() => console.log("Click!")}
        />
        <AuthInput
          isValid={true}
          type="password"
          id="password"
          placeholder="Password"
          value={""}
          onChange={() => console.log("Click!")}
        />
        <AuthInput
          isValid={true}
          type="password"
          id="password"
          placeholder="Password"
          value={""}
          onChange={() => console.log("Click!")}
        />
      </VStack>
    </AuthBox>
  );
};

export default Login;
