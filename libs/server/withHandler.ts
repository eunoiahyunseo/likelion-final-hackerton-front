import type { NextApiHandler } from "next/types";

// 가능한 method type을 제한한다.
type method = "GET" | "POST" | "DELETE";

type MethodType = method[];

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
interface ConfigType {
  methods: MethodType;
  handler: NextApiHandler<ResponseType>;
  isPrivate?: boolean;
}

// 함수 타입 선언
type HandlerType = {
  (config: ConfigType): NextApiHandler;
};

const withHandler: HandlerType = ({
  methods,
  handler,
  // 기본적으로 /enter이런거 빼고 다 Private하다고 한다.
  isPrivate = true,
}) => {
  // Handler를 반환해야 한다. -> Next의 Serverless Edge Function
  return async function (req, res): Promise<any> {
    if (req.method && !methods.includes(req.method as method)) {
      res.status(405).end();
    }

    // user가 없는데, private한 곳을 가려고 하면 로그인을 하라고 해야 한다.
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ ok: false, error: "Plz log in." });
    }

    try {
      // 위 모든 조건을 통과하면 handler로 요청을 보낸다.
      await handler(req, res);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};

export default withHandler;
