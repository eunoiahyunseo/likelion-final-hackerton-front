import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
// @ts-nocheck
import { useRouter } from "next/router";

const CONSTRAINTS = { video: true };

const Bill = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const onClick = useCallback(() => {
    const s = videoRef.current?.srcObject! as MediaStream;
    s.getTracks().forEach((t) => t.stop());

    router.back();
  }, [router]);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(
        CONSTRAINTS
      );
      if (
        videoRef &&
        videoRef.current &&
        !videoRef.current.srcObject
      ) {
        videoRef.current.srcObject = stream;
      }
    };
    startVideo();
  }, [videoRef]);

  return (
    <div className="h-screen w-full bg-black">
      <div className="relative flex flex-col">
        <div className="flex flex-row items-center p-4">
          <button onClick={onClick}>
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <span className="grow text-center text-xl font-bold text-white">
            영수증 사진 촬영
          </span>
        </div>
        <span className="text-center text-xl font-bold text-white">
          가이드 영역에 영수증을 맞춰주세요
        </span>
        <div className="relative mt-4 h-[550px] w-full">
          <Image
            alt="bill frame preview"
            src={`/bill.png`}
            layout="fill"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="mt-4 text-center text-white">
            영수증이 인식되지 않는다면 직접 입력해주세요
          </span>
          <span className="text-center font-bold text-white underline">
            직접입력
          </span>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <span className="mt-4 text-center text-white">
            영수증이 길다면
          </span>
          <span className="text-center font-bold text-white underline">
            나눠서 촬영하기
          </span>
        </div>

        <video
          autoPlay
          ref={videoRef}
          className="absolute inset-0 z-0 m-auto h-[300px] w-[300px] rounded-[100px] bg-red-500 object-cover"
        />
      </div>
    </div>
  );
};

export default Bill;
