import { ConfigProvider, App as AntdApp } from 'antd';
import style from '@/style/antd.theme';
import Install from '@/components/render/install';
import JsonParse from './pages/json-parse';
function App() {
  return (
    <ConfigProvider theme={style}>
      <div style={{ fontSize: 20 }}>{`{"a":1,"c":3,"b":2,"d":"dddd","e":null,"f":true,"g":{"g_child1":1,"g_child2":2},"h":[1,2,3,4,5,{"h_1":"a"}]}`}</div>
      {/* <AntdApp
        style={
          window.container === 'ext' && import.meta.env.CONTAINER === 'ext'
            ? { height: '600px', width: '800px' }
            : {
                height: '100vh',
              }
        }
        className='py-lg px-md'>
        <>
          <JsonParse></JsonParse>
          <Install></Install>
        </>
      </AntdApp> */}
    </ConfigProvider>
  );
}
export default App;
