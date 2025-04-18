import { ConfigProvider, App as AntdApp } from 'antd';
import style from '@/style/antd.theme';
import Install from '@/components/render/install';
import JsonParse from './pages/json-parse';
function App() {
  return (
    <ConfigProvider theme={style}>
      <AntdApp style={{ height: '600px', width: '800px' }} className='py-lg px-md'>
        <>
          <JsonParse></JsonParse>
          <Install></Install>
        </>
      </AntdApp>
    </ConfigProvider>
  );
}
export default App;
