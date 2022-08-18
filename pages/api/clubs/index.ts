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
  const { club } = req.body;

  // 단순히 session에 해당 club의 id를 넣어주면 된다.

  req.session.club = {
    id: club,
  };

  await req.session.save();

  //   console.log(req.session);
  res.json({
    ok: true,
  });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
