import { UserItem } from "@/types";
import { useForm } from "@inertiajs/react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import React from "react";

interface ProductFormProps {
    user?: UserItem;
    is_create?: boolean;
}

const FormComponent: React.FC<ProductFormProps> = ({
    user,
    is_create = false,
}) => {
    const { data, setData, put, post, errors } = useForm({
        id: user?.id || 0,
        name: user?.name || "",
        email: user?.email || "",
        password: user?.password || "",
        password_confirmation: user?.password_confirmation || "",
    });

    const onFinish: FormProps<UserItem>["onFinish"] = () => {
        if (is_create) {
            post(route("users.store"), {
                onSuccess: () => {
                    setTimeout(() => {
                        message.success("Product created successfully");
                    }, 1000);
                },
            });
        } else {
            put(route("users.update", user?.id), {
                onSuccess: () => {
                    setTimeout(() => {
                        message.success("Product updated successfully");
                    }, 1000);
                },
            });
        }
    };

    return (
        <Form
            labelCol={{ span: 5 }}
            onFinish={() => onFinish(data)}
            className="mt-4 w-10/12"
        >
            <Form.Item<UserItem>
                label="Tên người dùng"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
                initialValue={data?.name}
                validateStatus={errors.name ? "error" : ""}
                help={errors.name}
            >
                <Input
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
            </Form.Item>

            <Form.Item<UserItem>
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Please input your email!" },
                ]}
                initialValue={data?.email}
                validateStatus={errors.email ? "error" : ""}
                help={errors.email}
            >
                <Input
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
            </Form.Item>

            <Form.Item<UserItem>
                label="Mật khẩu"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
                initialValue={data?.password}
                validateStatus={errors.password ? "error" : ""}
                help={errors.password}
            >
                <Input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
            </Form.Item>

            <Form.Item<UserItem>
                label="Nhập lại mật khẩu"
                name="password_confirmation"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
                initialValue={data?.password_confirmation}
                validateStatus={errors.password_confirmation ? "error" : ""}
                help={errors.password_confirmation}
            >
                <Input
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {is_create ? "Create" : "Update"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormComponent;
