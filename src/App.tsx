import React from "react";
import Layout from "./components/Layout";
import Valid from "./components/Valid";
import Update from "./components/Update";
import useUpdate from "./hooks/useUpdate";

import { User } from "./utils/axios";

const App: React.FC = () => {
  const { status, flag, userName, run, setUserId, setUserName, setUsedPass } =
    useUpdate();

  const handleUserUpdate = (user: User, uuid: string) => {
    setUserId(user.id);
    setUserName(user.username);
    setUsedPass(uuid);
  };
  return (
    <Layout>
      <Valid onUserUpdate={handleUserUpdate} />
      <Update status={status} flag={flag} userName={userName} run={run} />
    </Layout>
  );
};

export default App;
