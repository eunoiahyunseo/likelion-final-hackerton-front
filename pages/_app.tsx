import "../styles/globals.css";
import "../styles/calendar/index.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import ClubProvider from "@components/provider/ClubProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClubProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((response) => response.json()),
        }}
      >
        <div className="mx-auto w-full max-w-xl">
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </ClubProvider>
  );
}

export default MyApp;
