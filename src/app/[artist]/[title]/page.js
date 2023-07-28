import { getLyrics, getSong } from 'genius-lyrics-api';
import { Maven_Pro } from 'next/font/google'
import { Noto_Sans_JP } from 'next/font/google';
const maven = Maven_Pro({subsets: ['latin'], weight: ['400']}) 
const sansjp = Noto_Sans_JP({subsets: ['latin'], weight: ['600']}) 
export default function Main({params}) {
    let artist;
    if (params.artist === 'noArtist') {
      artist = ' ';
    } else {
      artist = decodeURIComponent(params.artist);
    }
    const title = decodeURIComponent(params.title);
  const options = {
    apiKey: '4D-pz_Kz7UX_3scJ01mt7oiZ5wQYULf_cNZ5tqIWKyYIHpwnp1l2WWw7KVD9C1Up',
    title: `${artist}`,
    artist: `${title}`,
    optimizeQuery: true,
  };

  return (
    <div id="content">
    <div
    className={maven.className}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#00000080',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        color: 'white',
        borderRadius: '15px',
      }}
    >
      {getSong(options).then((song) => (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={song.albumArt}
            alt="Album Art"
            style={{
              maxWidth: '250px',
              borderRadius: '4px',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
               margin: '0 auto',
            }}
          />
          <p style={{ fontSize: '25px' }}>{song.title}</p>
        </div>
      ))}
      {getLyrics(options).then((lyrics) => (
        <pre className={sansjp.className}  style={{textAlign: 'center', whiteSpace: 'pre-wrap', fontSize: '23px', lineHeight: '1.5' }}>{lyrics}</pre>
      ))}
    </div></div>
  );
}
