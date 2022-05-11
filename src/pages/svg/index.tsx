import React, {useEffect, useState} from "react";
import './index.less';
const Svg: React.FC = () => {
    const datas = [1, 2, 3, 4, 1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,1, 2, 3, 4,];
    return (<div className='svg-global' id='svg-global'>
        {datas.map((e:any, index: number) => <div key={String(index)} className="svg-item">
            {e}
        </div>)}
    </div>)
}
export default Svg;
