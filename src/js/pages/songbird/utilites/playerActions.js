  export const playerAction = ( leveldb, player, setPlayer ) => {
    let song = leveldb.leveldb.leveldb[leveldb.answerState.correctAnswer].song;
    const request = leveldb.leveldb.leveldb[leveldb.answerState.correctAnswer].name;
    if(song === undefined){
    fetch(`https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=${request}`)
      .then( result => result.json() )
      .then( (obj) => {
        //save audio to db
        console.log(obj.recordings[0].length)
        let CopyLeveldb = leveldb.leveldb.leveldb;
        song = new Audio(obj.recordings[0].file);
        //console.log(song)
        CopyLeveldb[leveldb.answerState.correctAnswer].song = song;
        CopyLeveldb[leveldb.answerState.correctAnswer].songDuration = obj.recordings[0].length;
        leveldb.leveldb.setLeveldb(CopyLeveldb);
        //change player property
        setPlayer("");
        song.play();
        console.log(CopyLeveldb);
      })
    }
    else if ( player === "active" ) {
      song.play();
      setPlayer("")
    }
    else if( player === "" ) {
      song.pause();
      setPlayer("active");
    }
  }