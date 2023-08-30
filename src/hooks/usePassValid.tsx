import { useState } from "react";
import { serverApi } from "../utils/axios";

import { User } from "../utils/axios";

const usePassValid = () => {
  const [user, setUser] = useState<User>();
  const [uuid, setUuid] = useState<string>();
  const [invalidUser, setInvalidUser] = useState("");

  const userHandler = async () => {
    const data = await serverApi.validatePass(uuid);
    if (!data.data) {
      setInvalidUser("유효하지 않은 토큰입니다.");
      return;
    }
    setUser(data.data);
  };

  return {
    setUuid,
    user,
    userHandler,
    invalidUser,
    uuid,
  };
};

export default usePassValid;
