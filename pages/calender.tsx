import Layout from "@components/layout";
import React, { useState } from "react";
import Calendar from "react-calendar";

type ItemType = "calender" | "deal";

const Calender = () => {
  const [selectedItem, setSelectedItem] =
    useState<ItemType>("calender");

  return (
    <Layout hasTabBar canGoBack seoTitle="calender | Monegement">
      <div></div>
    </Layout>
  );
};

export default Calender;
