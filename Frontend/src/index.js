import * as ReactDOM from 'react-dom/client';
// import Chatbot from './Chatbot';
// import App from './App';
import BigApp from './BigApp';
import "./index.css"


const container = document.getElementById('root');


const cb = ReactDOM.createRoot(container);
console.log("Hello from index.js");
// console.log(container);
// console.log(cb);
cb.render(<BigApp />)