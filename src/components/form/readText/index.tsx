import React, {useState} from 'react';
import {UploadOutlined} from "@ant-design/icons";
import "./index.less";
import {message} from "antd";

interface ReadTextProps {
    value?: { name: string; content: string };
    onChange?: (value: { name: string; content: string }) => void;
}

export const ReadText: React.FC<ReadTextProps> = ({ value = {}, onChange }) => {
    const [svg, setSvg] = useState<string>('');

    const triggerChange = (data: { name: string; content: string }) => {
        onChange?.(data);
    };

    const readText = async () => {
        const fileHandle = await window?.showOpenFilePicker({
            types: [{
                accept: {
                    'image/*': ['.svg']
                }
            }],
            multiple: false
        });
        let file=await fileHandle[0].getFile();
        if (!file.name.endsWith('.svg')) {
            message.error("前选择SVG文件");
            return;
        }
        const reader = new FileReader()
        reader.readAsText(file,'utf8')
        reader.onload = ()=>{
            const name = file.name.split(".");
            name.pop();
            setSvg(reader?.result as string);
            triggerChange({ name: name.join("."), content: reader.result as string });
        }
    }

    return <div className="custom-form-readText-container" onClick={readText}>
        {svg ? <div dangerouslySetInnerHTML={{__html: svg}} className='svg-pre'></div> :
            <div className='svg-pre svg-placeholder'><UploadOutlined style={{fontSize: '32px', color: "#dfdfdf"}} /></div>}
    </div>
}