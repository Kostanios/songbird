  export const playerAction = ( leveldb, player, setPlayer, birdIndex ) => {
    let song = leveldb.leveldb.leveldb[birdIndex].song;
    const request = leveldb.leveldb.leveldb[birdIndex].name;
    if(song === undefined){
    fetch(`https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=${request}`)
      .then( result => result.json() )
      .then( (obj) => {
        //save audio to db
        let CopyLeveldb = leveldb.leveldb.leveldb;
        song = new Audio(obj.recordings[0].file);
        CopyLeveldb[birdIndex].song = song;
        CopyLeveldb[birdIndex].songDuration = obj.recordings[0].length;
        leveldb.leveldb.setLeveldb(CopyLeveldb);
        //change player property
        song.volume = document.getElementById('formControlRange').value/100;
        setPlayer("");
        song.play();
      })
    }
    else if ( player === "active" ) {
      song.volume = document.getElementById('formControlRange').value/100;
      song.play();
      setPlayer("")
    }
    else if( player === "" ) {
      song.pause();
      setPlayer("active");
    }
  }