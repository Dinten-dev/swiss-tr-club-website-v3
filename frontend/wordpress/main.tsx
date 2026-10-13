import { createRoot } from 'react-dom/client';
import Home from '../app/page';
import '../app/globals.css';

const root = document.getElementById('strc-app');
if (root) createRoot(root).render(<Home/>);
