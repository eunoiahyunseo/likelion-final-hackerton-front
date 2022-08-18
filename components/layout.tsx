import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { cls } from "@libs/client/utils";
import Head from "next/head";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?: string;
}

const Layout = ({
  title,
  canGoBack,
  hasTabBar,
  children,
  seoTitle,
}: LayoutProps) => {
  const router = useRouter();
  const onClick = useCallback(() => router.back(), [router]);
  const { pathname } = router;

  return (
    <div>
      <Head>
        <title>{seoTitle}</title>
      </Head>
      <div
        className={cls(
          !canGoBack ? "justify-center" : "",
          "fixed top-0 left-0 flex w-full items-center border-b bg-white px-10 py-3 text-lg font-medium text-gray-700"
        )}
      >
        {canGoBack ? (
          <button onClick={onClick}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        ) : null}
        {title ? <span>{title}</span> : null}
      </div>
      <div
        className={cls("pt-16", hasTabBar ? "pb-[6rem]" : "")}
      >
        {children}
      </div>
      {hasTabBar ? (
        <nav className="fixed bottom-0 left-0 flex w-full items-center justify-around border-2 border-t bg-white pb-4 pt-4 text-xs text-gray-800">
          <Link href="/">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className={cls(
                  "h-6 w-6",
                  pathname === "/" || pathname === "/calender"
                    ? "text-orange-400"
                    : ""
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span
                className={cls(
                  pathname === "/" || pathname === "/calender"
                    ? "text-orange-400"
                    : ""
                )}
              >
                홈
              </span>
            </a>
          </Link>
          <Link href="/search">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className={cls(
                  "h-6 w-6",
                  pathname === "/search" ? "text-orange-400" : ""
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>

              <span
                className={cls(
                  pathname === "/search" ? "text-orange-400" : ""
                )}
              >
                검색
              </span>
            </a>
          </Link>
          <Link href="/board">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className={cls(
                  "h-6 w-6",
                  pathname === "/board" ? "text-orange-400" : ""
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              <span
                className={cls(
                  pathname === "/board" ? "text-orange-400" : ""
                )}
              >
                게시판
              </span>
            </a>
          </Link>
          <Link href="/notice">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className={cls(
                  "h-6 w-6",
                  pathname === "/notice" ? "text-orange-400" : ""
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span>알림</span>
            </a>
          </Link>
          <Link href="/member">
            <a className="flex flex-col items-center space-y-2">
              <svg
                className={cls(
                  "h-6 w-6",
                  pathname === "/member" ? "text-orange-400" : ""
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span
                className={cls(
                  pathname === "/member" ? "text-orange-400" : ""
                )}
              >
                멤버
              </span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
};

export default Layout;
