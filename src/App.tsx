import {Routes, Route} from "react-router-dom";
import Header from "./components/Header"
import Middle from "./components/Middle"
import Artworks from "./components/Artworks"
import Transactions from "./components/Transactions"
import Footer from "./components/Footer"
import Community from "./pages/Community"
import Artist from "./pages/Artist"
import Features from "./pages/Features"
import UpdateNFT from "./components/UpdateNFT";
import Loading from "./components/Loading";
import { useGlobalState } from "./store";

function App (){
  const [loadingState] = useGlobalState('loading');

  return (
    <div className="min-h-screen">
    <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Middle />
              <Artworks />
              <Transactions />
            </>
          }
        />
        <Route path="/artist" element={<Artist />} />
        <Route path="/features" element={<Features />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      
      <UpdateNFT />
      <Footer />
      {loadingState.show && <Loading />}
    </div>
  )
}

export default App
