import React, {Fragment, useRef} from "react";
import {AddNote} from "./addNote";
import "./index.less";
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {Dropdown, Menu} from "antd";
import FormatTool from "../../components/FormatTool";

const Note: React.FC = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const handleMenuClick = (item: any) => {
        if (item.key === '1') {
            let state = RichUtils.toggleInlineStyle(editorState, 'BOLD');
            setEditorState(state);
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}
              items={[
                  {
                      label: '加粗',
                      key: '1',
                  },
                  {
                      label: '2nd menu item',
                      key: '2',
                  },
                  {
                      label: '3rd menu item',
                      key: '3',
                  },
              ]}
        />
    );



    const handleSearch = () => {

    }

    const refresh = () => {

    }

    const modal = useRef<any>(null);

    const openAdd = () => {
        modal?.current?.open()
    }

    const toggleInlineStyle = (style: any) => {
        let state = RichUtils.toggleInlineStyle(editorState, style);
        setEditorState(state);
    }

    return <Fragment>
        <div className="note-container">
            <div className="note-slider">
                <ul>
                    <li>css学习</li>
                    <li>js学习</li>
                    <li>react学习</li>
                    <li>需要修改的问题</li>
                </ul>
            </div>
            <div className="note-slider">
                <ul>
                    <li>css学习</li>
                    <li>js学习</li>
                    <li>react学习</li>
                    <li>需要修改的问题</li>
                </ul>
            </div>
            <div className="note-content">
                <FormatTool></FormatTool>
                {/*<Dropdown overlay={menu} trigger={['contextMenu']}>*/}
                {/*    <div className="editor-container">*/}
                {/*    <Editor editorState={editorState} onChange={setEditorState}/>*/}
                {/*    </div>*/}
                {/*</Dropdown>*/}
            </div>
        </div>
        <AddNote refresh={refresh} ref={modal}/>
    </Fragment>
}
export default Note;
