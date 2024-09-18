import { Button, Form, Input } from "antd";

const FormFilter: React.FC<{
    label: string;
    onSubmit: (values: any) => void;
}> = ({ label, onSubmit }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onSubmit(values);
    };

    return (
        <Form form={form} onFinish={handleFinish} layout="inline">
            <Form.Item
                name="input"
                rules={[
                    { required: true, message: `Please input your ${label}!` },
                ]}
            >
                <Input placeholder={label} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Lọc
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormFilter;
