import { Maven_Pro } from "next/font/google";
import React from "react";
import Link from "next/link";
const maven = Maven_Pro({ subsets: ["latin"], weight: ["400"] });
export default async function Results({ params }) {
  const query = decodeURIComponent(params.query);

  async function getSearchResults() {
    const apiKey = '4D-pz_Kz7UX_3scJ01mt7oiZ5wQYULf_cNZ5tqIWKyYIHpwnp1l2WWw7KVD9C1Up';
    const res = await fetch(`https://api.genius.com/search?q=${query}&access_token=${apiKey}`);
    return res.json();
  }

  const data = await getSearchResults();

  const hits = data.response.hits;
  const artistNames = hits.map((lyrics) => lyrics.result.artist_names);
  const fullTitles = hits.map((lyrics) => lyrics.result.full_title);

  return (
    <div
      className={maven.className}
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        borderRadius: "15px",
        whiteSpace: "pre-line", 
      }}
      id="main"
    >
      <h1 style={{ fontSize: "40px" }}>ayakaa</h1>
      <h1 style={{ fontSize: "20px" }}>
        You searched for <text style={{ fontStyle: "italic" }}>{query}</text>
      </h1> <br></br>
      <div style={{
        backgroundColor: '#00000080',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
        padding: "20px",
        borderRadius: "15px",
      }} id="results">
        {hits.map((lyrics, index) => (
          <Link
            key={index}
            href={`/${encodeURIComponent(artistNames[index])}/${encodeURIComponent(fullTitles[index])}`}
          >
            <h2
              className={maven.className}
              style={{ textAlign: 'center', whiteSpace: 'pre-wrap', fontSize: '20px', lineHeight: '1.5' }}
            >
              {lyrics.result.full_title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
