import { useEffect } from "react";
import { getPrologue } from "./services/game";
import { errorNotification } from "./services/error";

{/* <IconButton icon={<Image src="/image.png" />} /> */}

function App() {
  const fetchData = () => {
    getPrologue()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        errorNotification(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <></>;
}

export default App;
