import React, {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {getSvgList, deleteSvg} from "./interface";
import './index.less';
import {Button, Input} from "antd";
import {AddSvg} from "./addSvg";
import downFile from "../../util/downFile";

const Svg: React.FC = () => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(30);
    const [search, setSerach] = useState('');

    const fetch = useCallback(   async () => {
        const {data}: any = await getSvgList({page: page, size: size, search: search})
        if (data.code === 200) {
            setList(data.data.result)
        }
    }, [page, size, search])

    useEffect( () => {
        fetch();
        return () => {}
    }, [fetch])


    const handleAdd = () => {

    }

    const handleDownFile = async (e: any) => {
        await downFile(e.content, e.name + '.svg', [{
            description: "jpeg file",
            accept: {
                "image/jpeg": [".svg"],
            },
        }]);
    }

    const handleDelete = async (e: any) => {
        await deleteSvg(e.id);
        await refresh()
    }

    const handleSearch = async (e: any) => {
        setSerach(e);
        await refresh()
    }

    const refresh = async () => {
        setPage(1);
        setSize(30);
        await fetch();
    }

    const modal = useRef<any>(null);

    return (<Fragment>
        <div className='operate-container'>
            <div>共152个图标</div>
            <div>
                <Input.Search placeholder="请输入名称" style={{width: '500px'}} onSearch={handleSearch} enterButton />
                <Button type="primary" onClick={modal?.current?.open}>添加</Button>
            </div>
        </div>
        <div className='svg-global' id='svg-global'>
            {list.map((e:any, index: number) => <div  key={String(index)} className="svg-container">
                    <div className="svg-content" dangerouslySetInnerHTML={{__html: e.content}}>
                    </div>
                    <div className="svg-name">
                        {e.name}
                    </div>
                    <ul className="svg-operation">
                        <li onClick={() => handleDownFile(e)}>下载</li>
                        <li>加入</li>
                        <li onClick={() => handleDelete(e)}>删除</li>
                    </ul>
                </div>
            )}
        </div>
        <AddSvg ref={modal} refresh={refresh}/>
    </Fragment>)
}
export default Svg;
