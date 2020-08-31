import  React, { useState, useContext, useEffect } from 'react';
import './playInfoSide.scss';
import { levelsObject } from '../../constants/levelsObject';
import { LevelContext } from '../../constants/levelContext';
import { stringToInt } from '../../utilites/stringToInt';
import { intToString } from '../../utilites/intToString';
import { playerAction } from '../../utilites/playerActions';
import { songBirdDB } from '../../../../../assets/songBirdNames/SongBirdName';
export function PlayInfoSide () {
  const level = useContext(LevelContext);
  console.log(level);
  const leveldb = level.leveldb.leveldb;
  const [points, setPoints] = useState(5);
  const levelState = level.levelState.levelState;
  const setLevelState = level.levelState.setLevelState;
  const setLeveldb = level.leveldb.setLeveldb;
  const [birdIndex, setBirdIndex] = useState(null);
  const [player, setPlayer] = useState("active");
  let buttonState;
  if(levelState === 'in progress'){buttonState=" disabled"}
  else{buttonState=""}
  const loadBird = (index, setBirdIndex, lastBirdIndex) => {
    let CopyLeveldb = leveldb;
    if(levelState === 'in progress'){
      if(level.answerState.correctAnswer === index){
        if(!CopyLeveldb[index].tabState){
          CopyLeveldb[index].tabState = true;
          setLeveldb(CopyLeveldb);
        }
        setLevelState('complited');
      }
      else{
        if(!CopyLeveldb[index].tabState){
          CopyLeveldb[index].tabState = false;
          setLeveldb(CopyLeveldb);
        }
        if(points > 1){
          setPoints(points-1);
        }
      }
    }
    let e = leveldb[index];
    console.log(leveldb);
      if(e.photo_url === undefined){
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=${e.name}`)
        .then( result => result.json() )
        .then( photo => {
            let photo_url = (photo.photos.photo[0].url_m);
            if(CopyLeveldb[index].photoUrl === "" || CopyLeveldb[index].photoUrl === undefined){
              CopyLeveldb[index].photoUrl = photo_url;
            }
            setLeveldb(CopyLeveldb);
            setPlayer("active");
            try{
              if(CopyLeveldb[lastBirdIndex].song){
              CopyLeveldb[lastBirdIndex].song.currentTime = 0;
              CopyLeveldb[lastBirdIndex].song.pause();
              }
            }
            catch(e){
              console.log(e);
            }
            setBirdIndex(index);
          })
      }
      else{
        setBirdIndex(index);
      }
  }
  return <div className = "songbird-PlayInfoSide row">
    <PlaySide 
      birdsObj={levelsObject}
      birdIndex={birdIndex}
      setBirdIndex={setBirdIndex}
      level={level}
      setLeveldb={setLeveldb}
      loadBird={loadBird}
    />
    <InfoSide
      player={player}
      setPlayer={setPlayer}
      birdIndex={birdIndex}
      leveldb={leveldb}
    />
    <button
      type="button"
      className={`btn btn-success songbird-next-level-button${buttonState}`}
      onClick={()=>{
        if(buttonState === ""){
          let index = level.levelState.levelIndex;
          ////
          level.leveldb.setLeveldb(songBirdDB[index+1]);
          level.levelState.setLevelIndex(index+1);
          level.currentBirdPanel.setCurrentBirdPlayer("active");
          level.currentBirdPanel.setCurrentBirdTimer(0);
          document.getElementById('Current-Player').style.width = '0';
          level.answerState.setCorrectAnswer( parseInt( Math.random() * 5 ));
          level.pointsState.setPoints(level.pointsState.points + points);
          setPoints(5);
          setBirdIndex(null);
          setLevelState('in progress');
        }
      }}>Success</button>
  </div>
} 

function PlaySide (args) {
  let levelIndex = args.level.levelState.levelIndex;
  let birdsIndex = Object.keys(args.birdsObj[levelIndex].birds);
  let birdsNames = args.birdsObj[levelIndex].birds;
  let birdsArray = birdsIndex.map( (e, i) => {
    let birdName = birdsNames[e];
    let className;
    if(i === args.birdIndex){
      className = "list-group-item list-group-item-action active"
      if(args.level.leveldb.leveldb[i].tabState === true){className+=" true"}
      if(args.level.leveldb.leveldb[i].tabState === false){className+=" false"}
    }
    else{
      className = "list-group-item list-group-item-action"
      if(args.level.leveldb.leveldb[i].tabState === true){className+=" true"}
      if(args.level.leveldb.leveldb[i].tabState === false){className+=" false"}
    } 
    return <a
      className = {className}
      key={birdName}
      data-toggle="list"
      href={`#${birdName}`}
      role="tab"
      onClick={(event)=>{
        args.loadBird(i, args.setBirdIndex, args.birdIndex);
      }}>
      {birdName}
    </a>
  })
  return <div className="col-4">
    <div className="list-group" id="list-tab" role="tablist">
      {birdsArray}
    </div>
  </div>
}

function InfoSide (args) {
  const level = useContext(LevelContext);
  const [timer, setTimer] = useState(0);
  let player = args.player;
  let setPlayer = args.setPlayer;
  let imgUrl
  let db = level.leveldb.leveldb;
  let duration;
  useEffect(()=>{
    try{
      if(timer > stringToInt(level.leveldb.leveldb[args.birdIndex].songDuration)){
        setPlayer("active");
        setTimer(0);
      }
    } catch(e){}

    if(player === ""){
      var timerId = setTimeout(()=>{
      setTimer(timer+0.1);   
      }, 100)
    }
    else{
      return clearInterval(timerId)}
    }
  );
  if(args.birdIndex!==null){
    imgUrl = db[args.birdIndex].photoUrl;
    duration = db[args.birdIndex].songDuration;
  }
  else{
    return <div className="col-8">
      <div className="songBird-current-bird-info">
        послушайте пение птицы и попробуйте угадать какой птице из списка принадлежит этот голос
      </div>
    </div>
  }
  if(!duration){duration='...'} 
  return <div className="col-8">
    <div className="songBird-current-bird-info">
      <div id="info-bird" className="songbird-current-bird-img" style={{background: `center / cover no-repeat url(${imgUrl})`}}></div>
      <div className="songbird-info-player">
        <div className="songbird-player">
            <div
              className="songbird-playstop-button"
              onClick={()=>{
                player === "active"
                ? playerAction( level, player, setPlayer, args.birdIndex)
                : playerAction( level, player, setPlayer, args.birdIndex)
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
                style={{width: (timer/stringToInt(level.leveldb.leveldb[args.birdIndex].songDuration)) * 100 + '%'}}
              >
              </div>
            </div>
        </div>
        <div className="songbird-nan-player">
          <p className="songbird-nan-player-state">{intToString(parseInt(timer))}</p>
          <p className="songbird-nan-player-duration">{duration}</p>
        </div>
        <div className="songbird-information-block">{db[args.birdIndex].rusinfo}</div>
      </div>
    </div>
  </div>
}