import React, {forwardRef, useImperativeHandle, useState} from "react";
import {Modal, Form, Input} from "antd";
import {addSvg} from "./interface";
import {ReadText} from "../../components/form/readText";
interface PropModal {
    refresh: any;
}


export const AddSvg: React.FC<any> = forwardRef((props: PropModal, ref) => {

    const [isVisible, setIsVisible] = useState(false);
    const [form] = Form.useForm();

    const open = () => {
        form.resetFields();
        setIsVisible(true);
    }

    const handleClose = () => {
        setIsVisible(false);
    }

    const handleOk = () => {
        form
            .validateFields()
            .then(async values => {
                form.resetFields();
                await addSvg({name: values.name, content: values.svg.content});
                await props.refresh();
                handleClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    useImperativeHandle(ref, () => ({
        open
    }));

    const onValuesChange = (params: any) => {
        if (params.svg) {
            form.setFieldsValue({"name": params.svg.name});
        }
    }

    return <Modal title="新增svg图标" visible={isVisible} onOk={handleOk} onCancel={handleClose} okText="确定" cancelText="取消">
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleOk}
            autoComplete="off"
            form={form}
            onValuesChange={onValuesChange}
        >
            <Form.Item
                label="SVG图标"
                name="svg"
                rules={[{ required: true, message: '请选择SVG图标' }]}
            >
                <ReadText/>
            </Form.Item>
            <Form.Item
                label="图标名称"
                name="name"
                rules={[{ required: true, message: '请输入svg图标的名称' }]}
            >
                <Input />
            </Form.Item>

        </Form>
    </Modal>
})