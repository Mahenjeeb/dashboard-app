import React, { useEffect, useState } from "react";
import instance from "@/services/auth_service";
import { useAuth } from "@/context/AuthProvider";
const Home = () => {
  const [dataApi, setDataApi] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    (async function () {
      if (token) {
        const { data } = await instance.get("/all-workspace", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataApi(data.message);
      }
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
