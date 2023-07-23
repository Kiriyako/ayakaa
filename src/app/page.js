"use client";
import React, { useEffect, useRef, useState } from "react"; 
import { Maven_Pro } from "next/font/google";
import { useRouter } from 'next/navigation';

const maven = Maven_Pro({ subsets: ["latin"], weight: ["400"] });

export default function Main() {
  const artistRef = useRef("");
  const nameRef = useRef("");
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      if (nameRef.current.trim() === "") {
        alert('Please enter a song name!');
        setFormSubmitted(false);
      } else if (artistRef.current.trim() === "") {
        router.push(`/noArtist/${nameRef.current}`);
        setFormSubmitted(false); 
      } else {
        router.push(`/${artistRef.current}/${nameRef.current}`);
        setFormSubmitted(false); 
      }
    }
  }, [formSubmitted, router]);

  function submitForm(e) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <div
      className={maven.className}
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        borderRadius: "15px",
      }}
      id="main"
    >
      <h1 style={{ fontSize: "30px" }}>ayakaa</h1>
      <h1 style={{ fontSize: "20px" }}>
        browse through music lyrics, without any ads!
      </h1>
      <br />
      <form onSubmit={submitForm}>
        <div className="justify-center" id="input">
          <input id="yes"
            autoComplete="off"
            className="rounded-2xl border-2 p-2 text-xl bg-black/60"
            onChange={(e) => artistRef.current = e.target.value}
            placeholder="Enter artist name (leave blank if unknown)"
          />
        </div><br></br>
        <div className="justify-center" id="input" style={{ display: "flex" }}>
          <input
          id="yes"
          autoComplete="off"
            className="w-fit rounded-2xl border-2 p-2 text-xl bg-black/60"
            onChange={(e) => nameRef.current = e.target.value}
            placeholder="Enter song name"
          />
          <button
            className="ml-2 align-middle border-2 rounded-3xl text-xl h-10 w-10 p-2 bg-black/60 hover:bg-black/20"
            type="submit"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
