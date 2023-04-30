import 'plyr/dist/plyr.css';
import Plyr from 'plyr';
import { useRef, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
const DynamicReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});


export default function Home() {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=b8NxzFyGKtQ&ab_channel=Quran');
  const [autoPlay, setAutoPlay] = useState(false)
  const videoRef = useRef(null);

  useEffect(() => {
    const player = new Plyr(videoRef.current);
  }, []);

  const updateUrl =(e)=>{
    e.preventDefault();
     const form = e.target;
     setUrl(form.link.value);
     form.reset()
  }
  const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const dataUrl = event.target.result;
    setUrl(dataUrl);
  };

  reader.readAsDataURL(file);
};

  return (
    <main className="">
      {/* <Navigation /> */}
       
        <div className="w-[938px] m-auto mt-5 px-4">
             <div className="flex items-center justify-between border-b border-[gray] pb-2">
                  <h3 className="font-bold text-xl">NTube</h3>
                    <input type="file" onChange={handleFileChange} />
                    
                  <form onSubmit={updateUrl} className="flex items-center">
                       <input type="text" name='link' className="bg-[#0d3b4745] border border-[#12618b] px-3 py-1 w-[270px]" placeholder='video URL...' />  <input type="submit" value="preview" className="px-3 py-1 border border-[#0786c1] cursor-pointer bg-[#0786c1]" />
                  </form>
             </div> <br />
          <div className="relative">
                   <DynamicReactPlayer 
                url={url} 
                playing={autoPlay} 
                controls={true} 
                volume={0.5} 
                  height='480px' 
                  width='100%' 
                  className="border-2 rounded-lg overflow-hidden border-[#00a6ff49]"/>
              
                <button onClick={()=> setAutoPlay(!autoPlay)} className="bg-[#1073b0] float-right mt-3 rounded flex items-center justify-center px-3 py-2">Autoplay / {autoPlay ? 'ON' : 'OFF'}</button>
          </div>
           <br />
         
            </div>
    </main>
  )
}
