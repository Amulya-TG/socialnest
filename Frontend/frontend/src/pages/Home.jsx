import Navbar from "../components/Navbar";
import { useEffect } from "react";
function Home(){
  useEffect(()=>{
    document.title= "Home | MyWebsite";
  },[])
  return(
    <>
      <Navbar/>
      <main className="mainContainer">
        <section>
          <h1>Welcome to MyWebsite</h1>
          <p>See everyday moments from your close friends</p>
        </section>
      </main>
    </>

  );

}

export default Home;