import  React, { useState, useContext } from 'react';
import './playInfoSide.scss';
import { songBirdDB } from '../../../../../assets/songBirdAudio/SongBirdVideoAudio';
import { levelsObject } from '../../constants/levelsObject';
import { LevelContext } from '../../constants/levelContext';
export function PlayInfoSide () {
  const level = useContext(LevelContext);
  console.log(level);
  const leveldb = level.leveldb.leveldb;
  const setLeveldb = level.leveldb.setLeveldb;
  const [birdIndex, setBirdIndex] = useState(null);
  //const [leveldb, setLeveldb] = useState(songBirdDB[0]);
  const loadBird = (index, setBirdIndex) => {
    let e = leveldb[index];
      if(e.song === undefined){
        fetch(`https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=${e.name}`)
        .then( result => result.json() )
        .then( (obj) => {
          let CopyLeveldb = leveldb;
          let song = new Audio(obj.recordings[0].file);
          CopyLeveldb[index].song = song;
          setLeveldb(CopyLeveldb);
          setBirdIndex(index);
        })
      }
      else{
        setBirdIndex(index)
      }
      if(e.photo_url === undefined){
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=${e.name}`)
        .then( result => result.json() )
        .then( photo => {
          let CopyLeveldb = leveldb;
            let photo_url = (photo.photos.photo[0].url_m);
            CopyLeveldb[index].photoUrl = photo_url;
            setLeveldb(CopyLeveldb);
          })
      }
  }
  return <div className = "songbird-PlayInfoSide row">
    <PlaySide 
      birdsObj={levelsObject}
      birdIndex={birdIndex}
      setBirdIndex={setBirdIndex}
      leveldb={leveldb}
      setLeveldb={setLeveldb}
      loadBird={loadBird}
    />
    <InfoSide
      birdIndex={birdIndex}
      leveldb={leveldb}
    />
    <button type="button" className="btn btn-success songbird-next-level-button disabled">Success</button>
  </div>
} 

function PlaySide (args) {
  let birdsIndex = Object.keys(args.birdsObj[0].birds);
  let birdsNames = args.birdsObj[0].birds;
  let birdsArray = birdsIndex.map( (e, i) => {
    let birdName = birdsNames[e];
    let className;
    i === args.birdIndex
      ? className = "list-group-item list-group-item-action active"
      : className = "list-group-item list-group-item-action"
    return <a
      className = {className}
      key={birdName}
      data-toggle="list"
      href={`#${birdName}`}
      role="tab"
      onClick={(event)=>{
        args.loadBird(i, args.setBirdIndex);
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
  let imgUrl = "../../../../../assets/png/pngegg.png";
  let db = args.leveldb;
  console.log(db)
  console.log(args.birdIndex)
  if(args.birdIndex!==null){
    console.log(db[args.birdIndex].photoUrl);
    console.log(db[args.birdIndex]);
    imgUrl = db[args.birdIndex].photoUrl;
  }
  return <div className="col-8">
    <div className="songBird-current-bird-info">
      <div className="songbird-current-bird-img" style={{background: `center / cover no-repeat url(${imgUrl})`}}></div>
    </div>
  </div>
}