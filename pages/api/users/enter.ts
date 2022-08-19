import client from "@libs/client/client";
import withHandler, {
  ResponseType,
} from "@libs/server/withHandler";
import type { NextApiHandler } from "next";

import twilio from "twilio";
import mail from "@sendgrid/mail";
import { withApiSession } from "@libs/server/withSession";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

interface reqDataType {
  email: string;
  phone: string;
}

const handler: NextApiHandler<ResponseType> = async (
  req,
  res
) => {
  // email or phone둘 중 하나는 들어올 것입니다.
  const { email, phone }: Partial<reqDataType> = req.body;
  const user = phone ? { phone } : email ? { email } : null;

  // 만약 user에 아무 정보도 없다면 ok -> false
  if (!user) return res.status(400).json({ ok: false });

  // 랜덤 6자리 토큰
  const payload =
    Math.floor(10000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        // 만약 user에 해당하는 정보가 없다면 create에 해당하는 유저를 만든다.
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            // name은 필수니까 그냥 기본 이름으로 중복 가능하게 Anonymous로 설정해 준다.
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     // 원래라면 phone으로 보내야 하지만 -> dev process에서는 그냥 내 폰으로
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}`,
  //   });
  //   console.log(message);
  // } else if (email) {
  //   const email_ = await mail.send({
  //     from: "heart20021010@gmail.com",
  //     to: email,
  //     subject: "Your Carrot Market Verification Email",
  //     text: `Your token is ${payload}`,
  //     html: `<strong>Your token is ${payload}</strong>`,
  //   });
  //   console.log(email_);
  // }

  res.status(200).json({ ok: true });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
