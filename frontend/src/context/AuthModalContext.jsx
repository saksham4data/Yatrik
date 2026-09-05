import React, { createContext, useState, useContext } from 'react';

const AuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);

export const AuthModalProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const openLoginModal = () => {
    // Optionally close sidebar when opening login modal to prevent overlay overlap
    setIsSidebarOpen(false);
    setIsLoginModalOpen(true);
  };
  
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthModalContext.Provider value={{
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal
    }}>
      {children}
    </AuthModalContext.Provider>
  );
};
