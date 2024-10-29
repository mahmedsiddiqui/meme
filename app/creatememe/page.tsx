"use client";

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import '../app.css'
const CreateMeme = ({ searchParams }: { searchParams: { id: string; url: string } }) => {
  const [meme, setMeme] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const text1 = useRef<HTMLInputElement>(null);
  const text2 = useRef<HTMLInputElement>(null);



  const createMeme = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset error state

    const text0 = text1.current?.value || '';
    const text1Value = text2.current?.value || '';

    try {
      const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=mabdullah6600&password=asdfgfdsa123&text0=${encodeURIComponent(text0)}&text1=${encodeURIComponent(text1Value)}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setMeme(data.data.url);
      } else {
        setError(data.error_message || 'Failed to create meme');
      }
    } catch (error) {
      setError('An error occurred while creating the meme');
    }
  };

  return (
    <>
      <div>Create Meme</div>
      <div className="main" style={{ textAlign: "center" }} >
        <Image style={{     marginLeft:"500px"}} src={searchParams.url} width={200} height={200} alt='Meme template' />
        <br />
        <form onSubmit={createMeme}>
          <input type="text" placeholder='Enter text 1' ref={text1} required />
          <input type="text" placeholder='Enter text 2' ref={text2} required />
          <br />
          <br />
          <button style={{ fontSize: "x-large", padding: "10px", backgroundColor: "grey", color: "white", borderRadius: "10px" }} type='submit'>Create Meme</button>
        </form>
        <br />
        {meme && <Image  style={{ marginLeft:"500px",      }} src={meme} width={200} height={200} alt='Generated meme' />}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </>
  );
};

export default CreateMeme;
