import { Input } from "@chakra-ui/react";

const AuthInput = ({ isValid, type, id, placeholder, value, onChange }) => {
  return (
    <Input
      variant="unstyled"
      w={"-moz-fit-content"}
      m={"3"}
      p={"3"}
      fontSize={"17px"}
      fontWeight={"bold"}
      border={"none"}
      borderBottom={"2px solid white"}
      backgroundColor={"transparent"}
      color={"white"}
      _focus={
        isValid
          ? {
              fontSize: "17px",
              fontWeight: "bold",
              outline: "none",
              borderBottom: "2px solid rgb(243, 233, 91)",
              color: "white",
            }
          : {
              fontSize: "17px",
              fontWeight: "bold",
              outline: "none",
              borderBottom: "2px solid rgb(215, 32, 32)",
              color: "white",
            }
      }
      _placeholder={{
        color: "white",
      }}
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={true}
      autoComplete={"off"}
    />
  );
};

export default AuthInput;
