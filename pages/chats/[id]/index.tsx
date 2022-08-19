import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { useRouter } from "next/router";
import Message from "@components/message";
import useUser from "@libs/client/useUser";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { withSsrSession } from "@libs/server/withSession";
import { NextPage } from "next";
import { Chat } from "@prisma/client";
import moment from "moment";
import client from "@libs/client/client";

interface MessageForm {
  message: string;
}

const Chats: NextPage<{ chat: Chat }> = ({
  chat: { title, createdAt },
}) => {
  const router: any = useRouter();
  const { user } = useUser();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } =
    useForm<MessageForm>();

  const { data, mutate } = useSWR(
    router.query.id ? `/api/chats/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );
  const [sendMessage, { loading, data: sendMessageData }] =
    useMutation(`/api/chats/${router.query.id}/message`);

  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    // unbound mutate
    mutate(
      (prev: any) =>
        prev && {
          ...prev,
          chats: {
            ...prev.chats,
            messages: [
              ...prev.chats.messages,
              {
                clubId: +router.query.id,
                user: { ...user },
                message: form.message,
                id: Date.now(),
              },
            ],
          },
        },
      false
    );

    scrollRef?.current?.scrollIntoView();
    sendMessage(form);
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, []);

  return (
    <Layout canGoBack>
      <div>
        <div>
          <div className="text-center text-xl font-bold">
            {title}
          </div>
          <div className="text-medium mr-8 text-right font-bold text-gray-500">
            {moment(createdAt).format("YYYY-MM-DD")}
          </div>
        </div>
        <div className=" my-10 h-[80vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
          {data &&
            data?.chats?.messages.map(
              (message: any, index: any) => (
                <div
                  className="mt-8"
                  key={`message.createdAt-${index}`}
                >
                  {message.user.id === user?.id ? (
                    <div className="text-md mb-2 flex flex-row justify-end font-semibold text-gray-600">
                      {message?.user?.name}
                    </div>
                  ) : (
                    <div className="text-md mb-2 font-semibold text-gray-600">
                      {message?.user?.name}
                    </div>
                  )}
                  <Message
                    key={message.id}
                    message={message.message}
                    reversed={message.user.id === user?.id}
                    //   avatarUrl={message.user.avatar}
                  />
                </div>
              )
            )}

          <div ref={scrollRef} className="block h-8" />
        </div>
        <div className="fixed inset-x-0 bottom-3 m-0 mx-auto w-full max-w-md">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex items-center"
          >
            <input
              type="text"
              {...register("message", { required: true })}
              className="w-full rounded-full border-gray-300 shadow-sm
             focus:border-orange-500 focus:outline-none focus:ring-orange-500
              "
            />
            <div className="absolute inset-y-0 right-0 py-1.5 pr-1.5">
              <button className="flex h-full items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function (
  context: any
) {
  // 여기서는 지금 로그인되어 있는 유저에 대한 모든 동아리 목록을 일단 불러와야 한다.
  // @ts-ignore
  const chat = await client.chat.findUnique({
    where: {
      id: +context.params.id,
    },
  });

  return {
    props: { chat: JSON.parse(JSON.stringify(chat)) },
  };
});

export default Chats;
