import React, { useContext } from 'react';
import { levelsObject } from '../../constants/levelsObject';
import { LevelContext } from '../../constants/levelContext';
import './levels.scss';
function levelName ( levelNumber, currentOrNo ) {
  let levelName = levelsObject[levelNumber].name;
  let activeOrNo = ""
  if(currentOrNo){activeOrNo=" active-level"}
  return <div
    key = {levelName}
    className={`level${activeOrNo}`}
    >
      {levelName}
  </div>
}

export function Levels () {
  const level = useContext(LevelContext);
  let levelArray = [];
  for (let key in levelsObject) {
    let currentOrNo = false;
    if(key == level.levelState.levelIndex){
      currentOrNo = true;
    }
    levelArray.push(levelName( key, currentOrNo));
  }
  return <div className="songbird-levels-names" onClick={
    ()=>{
      alert(level.levelState.levelIndex+1);
      level.levelState.setLevelIndex(level.levelState.levelIndex+1);
    }
  }> {levelArray} </div>
}