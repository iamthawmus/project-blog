'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookie from 'js-cookie';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

function Header({ theme, className, ...delegated }) {
  const [toggleTheme, setToggleTheme] = React.useState(theme);

  function handleThemeToggle() {
    const nextTheme = toggleTheme === 'light' ? 'dark' : 'light';
    setToggleTheme(nextTheme);
    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });
    const COLORS =
      nextTheme === 'light'
        ? LIGHT_TOKENS
        : DARK_TOKENS;

    const root = document.documentElement;

    root.setAttribute(
      'data-color-theme',
      nextTheme
    );

    Object.keys(COLORS).forEach((key) => {
      root.style.setProperty(
        key,
        COLORS[key]
      );
    });

  }

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <a href="/rss.xml" className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </a>
        <button className={styles.action} onClick={handleThemeToggle}>
          {toggleTheme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem"/>}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
