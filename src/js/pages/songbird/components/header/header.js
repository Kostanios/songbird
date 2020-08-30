import React, {useContext} from 'react';
import { LevelContext } from '../../constants/levelContext';
import './header.scss'
export function Header () {
  const level = useContext(LevelContext);
    return <div className = "songbird-header">
      <div className = "songbird-label">
          <label>SONG</label>
          <label>BIRD</label>
      </div>
      <div className="songbird-points">Points: {level.pointsState.points}</div>
    </div>
}