import React, { useState } from 'react';
import { LevelContext } from './constants/levelContext'
import { Header } from './components/header/header';
import { Levels } from './components/levels/levels';
import { CurrentBird } from './components/currentBird/currentBird';
import { PlayInfoSide } from './components/playInfoSide/playInfoSide';
import { songBirdDB } from '../../../assets/songBirdNames/SongBirdName';
import './songbird.scss';
export function Songbird () {
    const [levelIndex, setLevelIndex] = useState(0);
    const [leveldb, setLeveldb] = useState(songBirdDB[0]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    if(correctAnswer === null){ setCorrectAnswer( parseInt( Math.random() * 5 )) }

    return <div id="songbird-main-page">
      <LevelContext.Provider value={{
        levelState:{
          levelIndex: levelIndex,
          setLevelIndex: setLevelIndex,
        },
        answerState:{
          correctAnswer: correctAnswer,
          setCorrectAnswer: setCorrectAnswer,
        },
        leveldb:{
          leveldb: leveldb,
          setLeveldb: setLeveldb,
        }
      }}>
        <Header/>
        <Levels/>
        <CurrentBird/>
        <PlayInfoSide/>
      </LevelContext.Provider>
    </div>
}
