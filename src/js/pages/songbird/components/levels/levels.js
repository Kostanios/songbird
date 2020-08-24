import React from 'react'
import { levelsObject } from '../../constants/levelsObject'
import './levels.scss';
function level ( levelNumber ) {
  let levelName = levelsObject[levelNumber].name;
  //let birdsArray = levelsObject[levelNumber].birds;
  return <div key = {levelName} className="level"> {levelName} </div>
}

export function Levels () {
  let levelArray = [];
  for (let key in levelsObject) {
    levelArray.push(level(key));
  }
  return <div className="songbird-levels-names"> {levelArray} </div>
}