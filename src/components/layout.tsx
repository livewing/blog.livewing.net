import React from 'react';
import type { FC } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import '../styles/index.scss';

export const Layout: FC = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="inside page-content">{children}</div>
      <Footer />
    </div>
  );
};
