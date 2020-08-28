import React, { useContext, useState, useEffect } from 'react';
import { LevelContext } from '../../constants/levelContext';
import "./currentBird.scss";
import { stringToInt } from '../../utilites/stringToInt';
import { intToString } from '../../utilites/intToString';
import { playerAction } from '../../utilites/playerActions';
export function CurrentBird (){
  const level = useContext(LevelContext);
  const [timer, setTimer] = useState(0);
  const [player, setPlayer] = useState("active");
  let duration = level.leveldb.leveldb[level.answerState.correctAnswer].songDuration;
  useEffect(()=>{
    if(timer > stringToInt(level.leveldb.leveldb[level.answerState.correctAnswer].songDuration)){
      setPlayer("active");
      setTimer(0);
    }
    if(player === ""){
      var timerId = setTimeout(()=>{
        setTimer(timer+0.1);
        
      }, 100)
    }
    else{ 
      console.log(timer/stringToInt(level.leveldb.leveldb[level.answerState.correctAnswer].songDuration));
      return clearInterval(timerId)}
  });
  
  if( !duration ) { 
    duration = '...';
  }
    return <div className="songbird-currentbird-container">
      <div className="songbird-img-container">
        <div className="songbird-currentbird"></div>
      </div>
      <div className="songbird-current-info">
        <p className="songbird-question">ЧТО ЭТО ЗА ПТИЦА?</p>
        <div className="songbird-player">
            <div
              className="songbird-playstop-button"
              onClick={()=>{
                player === "active"
                ? playerAction( level, player, setPlayer )
                : playerAction( level, player, setPlayer )
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
                className="songbird-player-state"
                style={{width: (timer/stringToInt(level.leveldb.leveldb[level.answerState.correctAnswer].songDuration)) * 100 + '%'}}></div>
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
