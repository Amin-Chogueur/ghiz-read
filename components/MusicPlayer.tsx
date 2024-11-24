"use client";
import { useBookContext } from "@/context/BookContextProvider";
import { useState } from "react";
import { AiFillSound } from "react-icons/ai";
function MusicPlayer({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
}) {
  const [showMusicControler, setShowMusicControler] = useState(false);
  const { showBooks } = useBookContext();
  return (
    <div className="absolute top-[65px] left-[0px]">
      <span
        className="cursor-pointer absolute left-0] top-3"
        onClick={() => setShowMusicControler((pre) => !pre)}
      >
        {showBooks ? (
          <AiFillSound className="bg-orange-600 p-1 rounded text-3xl" />
        ) : null}
      </span>
      <audio
        className={
          showMusicControler
            ? "opacity-1 block left-[35px] relative"
            : "opacity-0 hidden"
        }
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        controls
      />
    </div>
  );
}

export default MusicPlayer;
