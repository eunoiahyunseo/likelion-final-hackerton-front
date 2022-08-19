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
  } = req as any;

  // id에 해당하는 chat을 꺼내와야 한다.
  const chats = await client.chat.findUnique({
    where: {
      id: +id,
    },
    include: {
      messages: {
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    chats,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
