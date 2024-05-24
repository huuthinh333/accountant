// src/App.js
import React,{lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home  =lazy(()=> import ('./routers/home/page'))
const Mform  =lazy(()=> import ('./routers/home/page1'))
function App() {
  return (
<Router>
      <Suspense fallback={<div>Loading...</div>}>
 
        <Routes>
          
          <Route path="/" element={<Mform />} />
   
        </Routes>
      </Suspense>
    </Router>
);
}

export default App;