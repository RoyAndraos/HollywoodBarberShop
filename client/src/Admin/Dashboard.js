import { useEffect } from "react";
import Cookies from "js-cookie";
import { styled } from "styled-components";
const Dashboard = () => {
  useEffect(() => {
    fetch("/admin/getDashboard/ralf", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <Wrapper>Dashboard</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default Dashboard;
