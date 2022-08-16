import { useEffect, useState } from "react";
import type { NextPage } from "next";

import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Button from "@components/button";
import Input from "@components/Input";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
// import { ConversationList } from "twilio/lib/rest/conversations/v1/service/conversation";
import { useRouter } from "next/router";
import Image from "next/image";

type MethodType = "email" | "phone";
interface EnterForm {
  email?: string;
  phone?: string;
}
interface TokenForm {
  token: string;
}

interface EnterMutationResult {
  ok?: boolean;
  error?: string;
}
interface MutationResult {
  ok?: boolean;
  error?: string;
}

const Enter: NextPage = () => {
  // 사용자가 로그인하기 위해서 email or phone을 쳐서 token을 발급받는 과정
  const [enter, { loading, data, error }] =
    useMutation<EnterMutationResult>("/api/users/enter");

  // token을 검증하는 과정
  const [
    confirmToken,
    {
      loading: tokenLoading,
      data: tokenData,
      error: tokenError,
    },
  ] = useMutation<MutationResult>("/api/users/confirm");

  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const {
    register: tokenRegister,
    handleSubmit: tokenHandleSubmit,
  } = useForm<TokenForm>();
  const [method, setMethod] = useState<MethodType>("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };

  const onValid: SubmitHandler<EnterForm> = (validForm) => {
    enter(validForm);
  };

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };

  const router = useRouter();

  // 만약 tokenData를 검증하는 API로부터 검증하는 요청이 들어왔고
  // ok가 true라면 기본페이지로 리다이렉팅 시킨다.
  // 반대로 로그인하지 않은 사용자가 / 홈페이지로 들어올려교 하면 /enter로 보내는 작업이 수반되어야 할 것이다.
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);

  return (
    <div className="traisiton-all mt-20 px-4 duration-200 ease-in-out sm:mt-36">
      <div className="relative m-auto h-48 w-3/4">
        <div className="absolute -top-6 -left-12  aspect-square w-16 transition-all duration-200 sm:-left-16">
          <Image
            alt="enter preview slogun dots"
            layout="fill"
            src={"/logo.png"}
            className="object-contain"
          />
        </div>
        <Image
          alt="enter preview slogun"
          layout="fill"
          src={"/slogun.png"}
          className="object-contain"
        />
        <div className="absolute bottom-0 h-2 w-full">
          <Image
            alt="enter preview slogun dots"
            layout="fill"
            src={"/dots.png"}
            className="object-contain"
          />
        </div>
      </div>
      <div className="mt-4">
        {data?.ok ? (
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="mt-8 flex flex-col"
          >
            <Input
              register={tokenRegister("token", {
                required: true,
              })}
              name="token"
              label="토큰 확인하기"
              type="number"
              required
            />
            <Button
              text={
                tokenLoading ? "로딩 중..." : "토큰 확인하기"
              }
            />
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="mt-8 grid w-full grid-cols-2 gap-16 border-b">
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "email"
                      ? " border-orange-400 text-orange-400"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onEmailClick}
                >
                  이메일
                </button>
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "phone"
                      ? " border-orange-400 text-orange-400"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onPhoneClick}
                >
                  휴대폰
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-6 flex flex-col"
            >
              {method === "email" ? (
                <Input
                  register={register("email", {
                    required: true,
                  })}
                  name="email"
                  label="이메일 주소"
                  type="email"
                />
              ) : null}
              {method === "phone" ? (
                <>
                  <Input
                    register={register("phone", {
                      required: true,
                    })}
                    name="phone"
                    label="휴대폰 번호"
                    type="number"
                    kind="phone"
                  />
                </>
              ) : null}
              {method === "email" ? (
                <Button
                  large
                  text={
                    loading
                      ? "로딩 중..."
                      : "일회용 비밀번호 발급하기"
                  }
                />
              ) : null}
              {method === "phone" ? (
                <Button
                  large
                  text={
                    loading
                      ? "로딩 중..."
                      : "일회용 비밀번호 발급하기"
                  }
                />
              ) : null}
            </form>
          </>
        )}
        <div className="relative right-0 left-0 mt-6 h-12 cursor-pointer transition-all duration-200 ease-in-out sm:h-14">
          <Image
            alt="kakao login preview"
            layout="fill"
            src={"/kakao.png"}
            className="rounded-lg object-contain"
          />
        </div>
        <div className="font-sm mt-6 cursor-pointer text-center font-semibold text-gray-300 underline decoration-solid transition-colors duration-100 hover:text-gray-400">
          로그인 하지 않고 둘러보기
        </div>
      </div>
    </div>
  );
};

export default Enter;
