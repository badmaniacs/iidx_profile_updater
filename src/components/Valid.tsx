import usePassValid from "../hooks/usePassValid";
import { useEffect } from "react";
import { User } from "../utils/axios";

const Valid: React.FC<{ onUserUpdate: (user: User, uuid: string) => void }> = ({
  onUserUpdate,
}) => {
  const { setUuid, userHandler, invalidUser, user, uuid } = usePassValid();

  const inputHandler = (event) => {
    setUuid(event.target.value);
  };

  useEffect(() => {
    if (user) {
      onUserUpdate(user, uuid);
    }
  }, [user, onUserUpdate, uuid]);

  if (user) {
    return <div></div>;
  }
  return (
    <div>
      <input
        style={inputStyle}
        type="text"
        placeholder="발급받은 토큰을 입력해주세요"
        onChange={inputHandler}
      ></input>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={userHandler}>
          전송
        </button>
      </div>
      <p style={errorMessageStyle}>{invalidUser}</p>
    </div>
  );
};

export default Valid;

const inputStyle: React.CSSProperties = {
  marginBottom: "10px",
  padding: "8px",
  border: "1px solid lightgray",
  borderRadius: "4px",
  width: "200px",
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const errorMessageStyle: React.CSSProperties = {
  color: "red",
  marginTop: "10px",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};
