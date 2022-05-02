import React, { useState } from 'react'

import { Tabs, Radio, Space } from 'antd';

const { TabPane } = Tabs;



export default function HomeMenu() {

    const [state, setState] = useState({ tabPosition: 'left' })

    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
    };
    const { tabPosition } = state
    return (
        <>
            
            <Tabs tabPosition={tabPosition}>
                <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full w-20 h-20" alt="" />} key="1">
                    Content tab 1
                </TabPane>
                <TabPane tab={<img src="https://picsum.photos/300" className="rounded-full w-20 h-20" alt="" />} key="2">
                    Content tab 2
                </TabPane>
                <TabPane tab={<img src="https://picsum.photos/300" className="rounded-full w-20 h-20" alt="" />} key="3">
                    Content tab 3
                </TabPane>
            </Tabs>
        </>
    )
}
