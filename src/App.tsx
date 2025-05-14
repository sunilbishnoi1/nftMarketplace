<<<<<<< HEAD
import NftCard from "./components/NftCard"

function App (){
  return (
    <div className="min-h-screen">
      <NftCard />
=======
// import NftCard from "./components/NftCard"
import Header from "./components/Header"
import Middle from "./components/Middle"
import Artworks from "./components/Artworks"
function App (){
  return (
    <div className="min-h-screen">
      <div className="">
      <Header />
      <Middle />
      </div>
      <Artworks />
>>>>>>> fa2d811 (switch to tailwind's utility-based CSS classes)
    </div>
  )
}

export default App
