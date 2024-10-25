'use client';
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { motion } from 'framer-motion';
const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);
  const [timeElapsed, setElapsedTime] = React.useState(0);

  React.useEffect(() => {
    if (isPlaying) {
      const incrementTime = window.setInterval(() => {
        setElapsedTime((currentTime) => {
          return currentTime + 1;
        });
      }, 1000);
      setIntervalId(incrementTime);
    }else if(!isPlaying && intervalId){
      window.clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if(intervalId){
        window.clearInterval(intervalId);
      }
    }
  }, [isPlaying]);


  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];


  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  layoutId={id}
                  layout={true}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                  styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {!isPlaying ? <Play /> : <Pause/>}
            <VisuallyHidden>{!isPlaying ? 'Play' : 'Pause'}</VisuallyHidden>
          </button>
          <button onClick={() => setElapsedTime(0)}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
