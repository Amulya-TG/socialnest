import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import SwitchAccount from "./components/SwitchAccount";

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>

<Route path="/switch-account" element={<SwitchAccount/>}/>

<Route path="/home" element={
<ProtectedRoute>
<Home/>
</ProtectedRoute>
}/>

<Route path="/feed" element={
<ProtectedRoute>
<Feed/>
</ProtectedRoute>
}/>

<Route path="/profile" element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}/>

<Route path="/register" element={<Register/>}/> 

</Routes>

</BrowserRouter>

)

}

export default App;