import Layout from "@components/layout";
import { cls } from "@libs/client/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface UserType {
  avatar?: string;
  name: string;
  executives: boolean;
  dues: boolean;
}
const User: UserType[] = [
  {
    avatar: "남궁두희",
    name: "남궁두희",
    executives: true,
    dues: true,
  },
  {
    avatar: "도선아",
    name: "도선아",
    executives: false,
    dues: true,
  },
  {
    avatar: "사공지숙",
    name: "남궁두희",
    executives: true,
    dues: false,
  },
  {
    avatar: "지헌규",
    name: "남궁두희",
    executives: false,
    dues: true,
  },
  {
    avatar: "위현서",
    name: "남궁두희",
    executives: false,
    dues: true,
  },
];

const Member = () => {
  return (
    <Layout hasTabBar canGoBack seoTitle="search | Monegement">
      <div>
        <span>멋쟁이 사자처럼</span>
      </div>
    </Layout>
  );
};

export default Member;
