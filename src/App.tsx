// import NftCard from "./components/NftCard"
import Header from "./components/Header"
import Middle from "./components/Middle"
import Artworks from "./components/Artworks"
import Transaction from "./components/Transaction"
import Footer from "./components/Footer"
function App (){
  return (
    <div className="min-h-screen">
      <div className="">
      <Header />
      <Middle />
      </div>
      <Artworks />
      <Transaction/>
      <Footer/>
    </div>
  )
}

export default App
