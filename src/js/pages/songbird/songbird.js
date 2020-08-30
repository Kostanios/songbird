import React, { useState } from 'react';
import { LevelContext } from './constants/levelContext'
import { Header } from './components/header/header';
import { Levels } from './components/levels/levels';
import { CurrentBird } from './components/currentBird/currentBird';
import { PlayInfoSide } from './components/playInfoSide/playInfoSide';
import { songBirdDB } from '../../../assets/songBirdNames/SongBirdName';
import './songbird.scss';
export function Songbird () {
    const [currentBirdTimer, setCurrentBirdTimer] = useState(0);
    const [currentBirdPlayer, setCurrentBirdPlayer] = useState("active");
    const [levelIndex, setLevelIndex] = useState(0);
    const [leveldb, setLeveldb] = useState(songBirdDB[0]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [points, setPoints] = useState(0);
    const [levelState, setLevelState] = useState('in progress');
    if(correctAnswer === null){ setCorrectAnswer( parseInt( Math.random() * 5 )) }

    return <div id="songbird-main-page">
      <LevelContext.Provider value={{
        levelState:{
          levelIndex: levelIndex,
          setLevelIndex: setLevelIndex,
          levelState: levelState,
          setLevelState: setLevelState,
        },
        answerState:{
          correctAnswer: correctAnswer,
          setCorrectAnswer: setCorrectAnswer,
        },
        leveldb:{
          leveldb: leveldb,
          setLeveldb: setLeveldb,
        },
        currentBirdPanel:{
          currentBirdTimer: currentBirdTimer,
          setCurrentBirdTimer: setCurrentBirdTimer,
          currentBirdPlayer: currentBirdPlayer,
          setCurrentBirdPlayer: setCurrentBirdPlayer,
        },
        pointsState: {
          points: points,
          setPoints: setPoints
        },
        
      }}>
        <Header/>
        <Levels/>
        <CurrentBird/>
        <PlayInfoSide/>
      </LevelContext.Provider>
    </div>
}
