import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";
import moment from "moment";

const handler: NextApiHandler<ResponseType> = async (
  req,
  res
) => {
  const {
    query: { month },
    session: {
      club: { id },
    },
  } = req as any;

  // 일단 querystring으로 club의 id를 받는다.
  const info = await client.club.findUnique({
    where: { id: +id },
    include: {
      Finance: {
        where: {
          out: {
            equals: false,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          FinanceDetail: {
            include: {
              hashtags: {
                select: {
                  content: true,
                  color: true,
                },
              },
            },
          },
        },
      },
    },
  });

  let hashTagDic: any = {};

  function isKeyExists(obj: any, key: string) {
    if (obj[key] == undefined) {
      return false;
    } else {
      return true;
    }
  }

  const filteredInfo = info?.Finance.map(
    ({ money, FinanceDetail, createdAt }) => ({
      money,
      createdAt,
      hashtags: FinanceDetail!.hashtags,
    })
  ).filter(({ createdAt }) =>
    moment(createdAt)
      .format("YYYY-MM-DD")
      .includes(
        `${moment(new Date()).format("YYYY")}-${month
          .toString()
          .padStart(2, "0")}`
      )
  );

  // console.log(
  //   `${moment(new Date()).format("YYYY")}-${month
  //     .toString()
  //     .padStart(2, "0")}`
  // );
  // console.log("filteredInfo >> ", filteredInfo);

  filteredInfo?.map((finance) => {
    finance.hashtags.map((hashtag) => {
      if (isKeyExists(hashTagDic, hashtag.content)) {
        // @ts-ignore
        hashTagDic[hashtag.content].money += finance.money;
      } else {
        // @ts-ignore
        hashTagDic[hashtag.content] = {
          money: finance.money,
          color: hashtag.color,
        };
      }
    });
  });

  // console.log(filteredInfo);

  const filteredData = Object.keys(hashTagDic).map(
    (hashtag) => ({
      id: hashtag,
      label: hashtag,
      value: hashTagDic[hashtag].money,
      color: hashTagDic[hashtag].color,
    })
  );

  res.json({
    ok: true,
    filteredData,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
