import { cls, userUrl } from "@libs/client/utils";
import Image from "next/image";
import { RefObject } from "react";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
  inVisible?: boolean;
}

const Message = ({
  avatarUrl,
  message,
  reversed,
  inVisible = false,
  ...rest
}: MessageProps) => {
  return (
    <div
      className={cls(
        "flex items-center space-x-4",
        reversed ? "flex-row-reverse space-x-reverse" : "",
        inVisible ? "invisible" : ""
      )}
      {...rest}
    >
      {avatarUrl ? (
        <div className="relative aspect-square w-10">
          <Image
            alt="message avatar preview"
            src={userUrl(avatarUrl)}
            className="rounded-full object-cover"
            layout="fill"
          />
        </div>
      ) : (
        <div className="aspect-square h-8 rounded-full bg-slate-400" />
      )}
      <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
