import React, {PropsWithChildren} from 'react';
import NavBar from '../NavBar/NavBar';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <NavBar />
      <main className="container">
        {children}
      </main>
    </>
  );
};

export default Layout;