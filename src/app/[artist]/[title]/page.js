export const runtime = 'nodejs';
import { Client } from 'genius-lyrics';
import { Maven_Pro } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
const maven = Maven_Pro({ subsets: ['latin'], weight: ['400'] });
const sansjp = Noto_Sans_JP({ subsets: ['latin'], weight: ['600'] });

// Utility to clean up lyrics
function cleanLyrics(rawLyrics) {

  return rawLyrics
    .replace(/^\*{3}.*?\*{3}/gs, '') 
    .replace(/Translations.*?\n/gi, '') 
    .replace(/\[.*?歌詞.*?\]/gi, '') 
    .trim();
}

// Enable this page as a Server Component
export default async function Main({ params }) {
  const artist = params.artist === 'noArtist' ? '' : decodeURIComponent(params.artist);
  const title = decodeURIComponent(params.title);

  const Genius = new Client('4D-pz_Kz7UX_3scJ01mt7oiZ5wQYULf_cNZ5tqIWKyYIHpwnp1l2WWw7KVD9C1Up'); 

  let song, lyrics;
  try {
    const searches = await Genius.songs.search(`${artist} ${title}`);
    song = searches[0];
    lyrics = await song.lyrics();
    console.log('Search result:', searches);
console.log('Fetched song:', song);
console.log('Lyrics:', lyrics);

  } catch (error) {
  // Vercel will capture console.error and show it under “Logs”
  console.error('💥 Genius fetch error:', error.stack || error);
  // For staging you might return the raw error so you can see it in-browser:
  if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_ERRORS === '1') {
    lyrics = `Error: ${error.message}`;
  } else {
    lyrics = 'Lyrics not found.';
  }
}


  return (
    <div id="content">
      <div
        className={maven.className}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: 'rgba(21, 26, 40, 0.79)',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          borderRadius: '15px',
        }}
      >
        {song && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
              src={song.image}
              alt="Album Art"
              style={{
                maxWidth: '300px',
                borderRadius: '4px',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                margin: '0 auto',
              }}
            />
            <p style={{ fontSize: '25px' }}>{song.title}</p>
          </div>
        )}
        <pre
          className={sansjp.className}
          style={{
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            fontSize: '23px',
            lineHeight: '1.5',
          }}
        >
          {cleanLyrics(lyrics)}
        </pre>
      </div>
    </div>
  );
}
