import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
// prettier-ignore
import type { NextApiHandler } from "next";
import { withApiSession } from "@libs/server/withSession";

const handler: NextApiHandler<ResponseType> = async (
  req,
  res
) => {
  const {
    club: { id },
  } = req.session as any;

  console.log("server club id >> ", id);

  // 단순히 session에 해당 club의 id를 넣어주면 된다.
  let financeDetail = await client.finance.findMany({
    where: {
      clubId: +id,
    },
    include: {
      FinanceDetail: {
        include: {
          hashtags: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  //   financeDetail = {...financeDetail, }

  res.json({
    ok: true,
    finance: financeDetail,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
