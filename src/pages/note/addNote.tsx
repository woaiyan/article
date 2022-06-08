import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Form, Input, Modal, Select, Divider, Space, Typography, message} from "antd";
import {addSvg} from "../svg/interface";
import {DeleteOutlined} from "@ant-design/icons";
import "./addNote.less";
import {createCategory, getCategory, deleteCategory, createNote} from "./interface";

interface PropModal {
    refresh: any;
}


export const AddNote: React.FC<any> = forwardRef((props: PropModal, ref) => {

    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('');
    const [categorys, setCategorys] = useState([]);
    const [form] = Form.useForm();

    const open = () => {
        form.resetFields();
        setIsVisible(true);
    }

    const handleClose = () => {
        setIsVisible(false);
    }

    useImperativeHandle(ref, () => ({
        open
    }));

    const handleOk = () => {
        form
            .validateFields()
            .then(async values => {
                form.resetFields();
                await createNote({category: values.category, content: values.content});
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

    }

    const loadCategory = async () => {
        const {data}: any = await getCategory();
        if (data.code === 200) {
            setCategorys(data.data.result)
        }
    }

    const addCategory = async () => {
        if (!name) {
            message.error("请输入分类名称");
            return;
        }
        await createCategory({name: name})
        await loadCategory();
        setName("");
    }

    const handleDeleteCategory = async (event: React.MouseEvent<HTMLAnchorElement>, id: number) => {
        event.preventDefault();
        event.stopPropagation();
        await deleteCategory(id);
        await loadCategory();
    }


    useEffect(() => {
        loadCategory();
    }, []);

    return <Modal title="新增笔记" visible={isVisible} onOk={handleOk} onCancel={handleClose} okText="确定" cancelText="取消">
        <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={handleOk}
            autoComplete="off"
            form={form}
            onValuesChange={onValuesChange}
        >
            <Form.Item
                label="分类"
                name="category"
                rules={[{ required: true, message: '请选择分类' }]}
            >
                <Select optionLabelProp="label" placeholder="笔记分类"  dropdownRender={menu => (
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space align="center" style={{ padding: '0 8px 4px' }}>
                            <Input placeholder="请输入分类名称" value={name} style={{width: "230px"}} onChange={e => setName(e.target.value)} />
                            <Typography.Link onClick={addCategory} style={{ whiteSpace: 'nowrap' }}>
                                新增分类
                            </Typography.Link>
                        </Space>
                    </>
                )}>
                    {categorys.map((e: any) => <Select.Option value={e.id} label={e.name}>
                        <div className="option-container">
                            <div>{e.name}</div>
                            <DeleteOutlined onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleDeleteCategory(event, e.id)} className="option-delete" title="删除此分类及此分类下的笔记"/>
                        </div>
                    </Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                label="内容"
                name="content"
                rules={[{ required: true, message: '请输入笔记内容' }]}
            >
                <Input.TextArea rows={4} placeholder="笔记内容" maxLength={6} />

            </Form.Item>

        </Form>
    </Modal>
})