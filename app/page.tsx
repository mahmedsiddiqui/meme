import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import '../app/app.css'
interface Meme {
  id: string;
  name: string;
  url: string;
}

const Page = async () => {
  const data = await fetch('https://api.imgflip.com/get_memes');
  const response = await data.json();
  
  // Ensure memes exist before mapping
  const memes = response.data.memes || [];

  return (
    <>
      <h1 style={{fontSize:"60px",color:"white"}} className="text-center">Meme Maker</h1>
      <div className="flex justify-center gap-5 flex-wrap"  style={{opacity:""}} >
        {memes.map((item: Meme) => (
          <div key={item.id} className="text-center" style={{ border:"2px solid black",borderRadius:"10px"}}>
            <Image 
            style={{borderRadius:"10px",textAlign:"center",}}
              src={item.url} 
              width={300} 
              height={200} 
              alt={item.name} 
              priority 
            />
            <br />
            <br />
            <button>

              <Link  style={{fontSize:"x-large",padding:"10px",backgroundColor:"grey", color:"white",borderRadius:"10px" }}
                href={{
                  pathname: "creatememe",
                  query: {
                    url: item.url,
                    id: item.id
                  }
                }}
              >
                Generate Meme
              </Link>
            </button>
              <br />
              <br />
          </div>
        ))}
     
      </div>
    </>
  );
};

export default Page;
