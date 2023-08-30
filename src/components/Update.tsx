const Update = ({ status, flag, userName, run }) => {
  if (!userName) {
    return <div></div>;
  }
  return (
    <div style={updateContainerStyle}>
      <p>{userName}님의 데이터를 갱신합니다</p>
      <div style={statusContainerStyle}>
        <p style={statusLabelStyle}>Status</p>
        <p style={statusMessageStyle}>{status}</p>
      </div>
      <div style={buttonContainerStyle}>
        <button
          disabled={!flag}
          onClick={run}
          style={flag ? updateButtonStyle : disabledUpdateButtonStyle}
        >
          시작
        </button>
      </div>
    </div>
  );
};

export default Update;

const updateContainerStyle: React.CSSProperties = {
  marginTop: "0px",
  textAlign: "center",
};

const updateButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  backgroundColor: "blue", 
  color: "white", 
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

const disabledUpdateButtonStyle: React.CSSProperties = {
  ...updateButtonStyle,
  backgroundColor: "gray",
  cursor: "not-allowed",
};

const statusContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "0px",
  textAlign: "center",
};

const statusLabelStyle: React.CSSProperties = {
  fontWeight: "bold",
};

const statusMessageStyle: React.CSSProperties = {
  whiteSpace: "pre-wrap",
  margin: 0,
  paddingBottom: "30px"
};
