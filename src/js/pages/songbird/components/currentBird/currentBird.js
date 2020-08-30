import React, { useContext, useState, useEffect } from 'react';
import { LevelContext } from '../../constants/levelContext';
import "./currentBird.scss";
import { stringToInt } from '../../utilites/stringToInt';
import { intToString } from '../../utilites/intToString';
import { playerAction } from '../../utilites/playerActions';
export function CurrentBird (){
  const level = useContext(LevelContext);
  console.log(level.leveldb.leveldb[level.answerState.correctAnswer]);
  let timer = level.currentBirdPanel.currentBirdTimer;
  let setTimer = level.currentBirdPanel.setCurrentBirdTimer;
  let player =  level.currentBirdPanel.currentBirdPlayer;
  let setPlayer =  level.currentBirdPanel.setCurrentBirdPlayer;
  let SecretBirdIndex = level.answerState.correctAnswer;
  let duration
  try{
    duration = level.leveldb.leveldb[level.answerState.correctAnswer].songDuration;
  }
  catch(e){
    console.log(e);
  }
  useEffect(()=>{
    if(timer > stringToInt(duration)){
      setPlayer("active");
      setTimer(0);
    }
    if(player === ""){
      var timerId = setTimeout(()=>{
        setTimer(timer+0.1);
        
      }, 100)
    }
    else{
      return clearInterval(timerId)}
  });
  
  if( !duration ) { 
    duration = '...';
  }
  function BirdImg ({level}) {
    let leveldb = level.leveldb.leveldb;
    let levelState = level.levelState.levelState;
    console.log('progress-' + level.answerState.correctAnswer);
    if(levelState !== 'complited'){
      return <div className="songbird-currentbird"></div>
    }
    else{
      console.log(level)
      let secretImg = level.leveldb.leveldb[level.answerState.correctAnswer].photoUrl;
      return <div className="songbird-currentbird" style={{background: `center / cover no-repeat url(${secretImg})`}}></div>
    }
  }
    return <div className="songbird-currentbird-container">
      <div className="songbird-img-container">
        <BirdImg 
          level={level}
        />
      </div>
      <div className="songbird-current-info">
        <div className="container flex-container">
          <p className="songbird-question">ЧТО ЭТО ЗА ПТИЦА?</p>
          <input type="range" className="form-control-range" id="formControlRange"></input>
        </div>
          <div className="songbird-player">
            <div
              className="songbird-playstop-button"
              onClick={()=>{
                player === "active"
                ? playerAction( level, player, setPlayer, SecretBirdIndex )
                : playerAction( level, player, setPlayer, SecretBirdIndex )
              }}
            >
              <div className={`songbird-left-pause ${player}`}></div>
              <div className={`songbird-rigt-pause ${player}`}>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="songbird-player-duration">
              <div
                id="Current-Player"
                className="songbird-player-state"
                style={{width: (timer/stringToInt(duration)) * 100 + '%'}}></div>
            </div>
          </div>
        <div className="songbird-nan-player">
          <p className="songbird-nan-player-state">{intToString(parseInt(timer))}</p>
          <p className="songbird-nan-player-duration">{duration}</p>
        </div>
      </div>
    </div>
}
//.duration
