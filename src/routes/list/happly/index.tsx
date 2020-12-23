import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import style from './style.scss';

const Happly = () => {
  return (
    <div className={style.audioBox}>
      <div className={style.content} />
      {/* <AudioPlayer autoPlay={false} src={require('./test.mp3')} /> */}
    </div>
  );
};

export default Happly;
