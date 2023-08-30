import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const hideModal = () => {
    setModalVisible(false);
  };

  if (!modalVisible) {
    return null;
  }
  return (
    <div style={modalContainerStyle}>
      <div style={modalContentStyle}>
        <button style={closeButtonStyle} onClick={hideModal}>
          X
        </button>
        <p>PASTAINFO Updater</p>
        {children}
      </div>
    </div>
  );
};

export default Layout;

const modalContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  width: "400px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const closeButtonStyle: React.CSSProperties = {
  alignSelf: "flex-end",
  cursor: "pointer",
};
