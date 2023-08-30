import { useState } from "react";
import { UserData } from "../utils/scraper/user";
import { serverApi } from "../utils/axios";

const useUpdate = () => {
  const [status, setStatus] = useState("업데이트 대기중");
  const [ver, setVer] = useState<string>("30");
  const [flag, setFlag] = useState<boolean>(true);
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>("");
  const [usedPass, setUsedPass] = useState<string>("");

  const run = async () => {
    setFlag(false);
    setStatus("시작");
    const valid = await serverApi.validateUser({
      username: userName,
      id: userId,
    });
    if (!valid.data) {
      setFlag(false);
      setStatus("비정상적인 접근입니다.");
      return;
    }
    const newUser = new UserData(ver);
    setStatus("유저 인포 변환 중");
    try {
      await newUser.fetchInfo();
    } catch {
      setStatus("에러가 발생했습니다. e-amusement 로그인 여부를 확인해주세요.");
      setFlag(true);
      return;
    }
    setStatus("스코어 변환 중");
    await newUser.fetchScoreData(setStatus);
    const newData = {
      ...newUser.getInfo(),
      musicData: {
        ...newUser.getScoreData(),
      },
      userId: userId,
      ver: parseInt(ver),
    };
    setStatus("데이터를 서버에 전송합니다");
    try {
      await serverApi.createProfile(newData);
    } catch {
      setStatus("서버 에러 발생. 관리자에게 문의해주세요.");
      setFlag(true);
      return;
    }
    await serverApi.deletePass(usedPass);
    setStatus("완료.");
  };

  return {
    run,
    ver,
    setVer,
    status,
    flag,
    setUserId,
    userName,
    setUserName,
    setUsedPass,
  };
};

export default useUpdate;
