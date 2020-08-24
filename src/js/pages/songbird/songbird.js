import React from 'react';
import { Header } from './components/header/header';
import { Levels } from './components/levels/levels';
import { CurrentBird } from './components/currentBird/currentBird';
import { PlayInfoSide } from './components/playInfoSide/playInfoSide';
import './songbird.scss';
export function Songbird () {
    return <div id="songbird-main-page">
        <Header/>
        <Levels/>
        <CurrentBird/>
        <PlayInfoSide/>
    </div>
}
