import React, { useContext } from 'react';
import { LevelContext } from '../../constants/levelContext';
import "./currentBird.scss";
export function CurrentBird (){
  const level = useContext(LevelContext);
  console.log(level);
  
    return <div className="songbird-currentbird-container">
      <div className="songbird-img-container">
        <div className="songbird-currentbird"></div>
      </div>
      <div className="songbird-current-info">
        <p className="songbird-question">ЧТО ЭТО ЗА ПТИЦА?</p>
        <div className="songbird-player">
            <div className="songbird-playstop-button">
              <div className="songbird-left-pause"></div>
              <div className="songbird-rigt-pause">
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="songbird-player-duration">
              <div className="songbird-player-state"></div>
            </div>
        </div>
        <div className="songbird-nan-player">
          <p className="songbird-nan-player-state">0.0</p>
          <p className="songbird-nan-player-duration"></p>
        </div>
      </div>
    </div>
}
//.duration