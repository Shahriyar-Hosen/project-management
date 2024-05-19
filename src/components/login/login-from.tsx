"use client";

import { useLogin } from "@/hooks/use-auth";
import { Button, Form, FormProps, Input, notification } from "antd";
import Image from "next/image";
import { useEffect } from "react";

type FieldType = {
  email: string;
  password: string;
};
type NotificationType = "success" | "info" | "warning" | "error";

export const From = () => {
  const { isSuccess, isLoading, error, setEmail } = useLogin();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message?: string,
    description?: string
  ) => {
    api[type]({
      message: message || "User Login successfully",
      description:
        description ||
        "User Login successfully!✅ Welcome to Project Management Tools.",
      placement: "bottom",
    });
  };

  useEffect(() => {
    isSuccess && openNotificationWithIcon("success");
    error && openNotificationWithIcon("error", "Something Want Wrong!", error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    // console.log("Failed:", errorInfo);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setEmail(values.email);
  };

  return (
    <section className="sm:min-h-[450px] min-w-[325px] bg-white/80 flex items-center justify-center rounded-lg shadow-lg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        <div>
          <Image
            className="mx-auto h-14 w-auto"
            src="/logo.png"
            alt="site logo"
            width={50}
            height={50}
          />
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {contextHolder}
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            id="email"
            name="email"
            label="Email Address"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>
          <Form.Item<FieldType>
            id="password"
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {isLoading && (
          <p className="text-center w-full absolute -bottom-2.5">loading...</p>
        )}
      </div>
    </section>
  );
};
