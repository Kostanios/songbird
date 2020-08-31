import React, { useContext } from 'react';
import { songBirdDB } from '../../constants/defaultSongBirddb';
import { LevelContext } from '../../constants/levelContext';
import './statisticLogo.scss';
export const StatisticLogo = () => {
  const level = useContext(LevelContext);
  let points = level.pointsState.points
  if(points === 25){
      return <div className="songbird-statistic-text">
        <p>вы ответили на все вопросы с первого раза!</p>
        <div className="songbird-gif-container">
          <img className="songbird-win-img" alt="Happy Bird GIF by foodieg - Find &amp; Share on GIPHY" src="https://media2.giphy.com/media/521ZWHlO8yoMfC2I2a/source.gif" data-noaft="1"></img>
        </div>
        <form>
        <button 
          className="btn btn-success"
          type="submit"
          onClick={()=>{
           level.levelState.setLevelIndex(0);
           level.leveldb.setLeveldb(songBirdDB[0]);
          }}>
        отлично
        </button>
        </form>
      </div>
  }
  else{
    return <div className="songbird-statistic-text">
      <p>вы ответили на все вопросы, ваш результат: {points}</p>
      <div className="songbird-gif-container">
        <img className="songbird-win-img" alt="Happy Bird GIF by foodieg - Find &amp; Share on GIPHY" src="https://media2.giphy.com/media/521ZWHlO8yoMfC2I2a/source.gif" data-noaft="1"></img>
      </div>
      <form>
        <button
          className="btn btn-success"
          type="submit"
          onClick={()=>{
           level.levelState.setLevelIndex(0);
           level.leveldb.setLeveldb(songBirdDB[0]);
          }}>
          отлично
        </button>
      </form>
    </div>
  }
}