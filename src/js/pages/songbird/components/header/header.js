import React from 'react';
import './header.scss'
export function Header () {
    return <div className = "songbird-header">
      <div className = "songbird-label">
          <label>SONG</label>
          <label>BIRD</label>
      </div>
      <div className="points">0</div>
    </div>
}