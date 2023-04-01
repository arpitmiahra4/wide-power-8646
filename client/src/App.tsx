import React,{useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AllRoutes from './Routes/AllRoutes';
import { getUserDetails } from './store/Auth/auth.actions';
import { useDispatch} from 'react-redux'
import { useAppDispatch } from './store/Store';

function App() {

  const dispatch : useAppDispatch = useDispatch()
  useEffect(()=>{
    let username:string|null = localStorage.getItem('username');
    if(username)
    {
      dispatch(getUserDetails(username));
    }
  })
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
