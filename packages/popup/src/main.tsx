import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style/index.less';
import { setContainer } from './util/setContainer.ts';

setContainer();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
