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
  // 모든 채팅방의 정보를 불러와야 한다.
  const {
    query: { id },
    body,
    session: { user },
  } = req as any;

  // 여기에는 body로 들어온
  const message = await client.message.create({
    data: {
      message: body.message,
      chat: {
        connect: {
          id: +id.toString(),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    message,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
