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

  // 단순히 session에 해당 club의 id를 넣어주면 된다.
  const finance = await client.finance.findMany({
    where: {
      clubId: +id,
    },
    select: {
      createdAt: true,
      id: true,
      money: true,
      out: true,
    },
  });

  res.json({
    ok: true,
    finance,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
