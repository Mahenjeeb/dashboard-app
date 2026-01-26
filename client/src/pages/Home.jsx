import React, { useEffect, useState } from "react";
import instance from "@/services/auth_service";

const Home = () => {
  const [dataApi, setDataApi] = useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await instance.get("/all-workspace");
      setDataApi(data.message);
    })();
  }, []);
  return (
    <>
      <div>
        <ul>
          {dataApi.map((ele) => (
            <li key={ele._id}>{ele.workspace_name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
