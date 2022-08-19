import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { useRouter } from "next/router";
import Message from "@components/message";
import useUser from "@libs/client/useUser";
import Layout from "@components/layout";

interface MessageForm {
  message: string;
}

const Chats = () => {
  const router = useRouter();
  const { user } = useUser();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } =
    useForm<MessageForm>();

  const onValid = (form: MessageForm) => {
    console.log(form);
    scrollRef?.current?.scrollIntoView();
  };

  const { data, mutate } = useSWR(
    router.query.id ? `/api/chats/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );

  return (
    <Layout canGoBack>
      <div>
        <div className=" h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
          {data &&
            data?.chats?.messages.map((message: any) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
                //   avatarUrl={message.user.avatar}
              />
            ))}

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

export default Chats;
