import Hero from "../components/Hero"
import SearchBar from "../components/SearchBar"

const Home = () => {
  return (
    <>
        <Hero />
        <div className="w-full">
          <SearchBar />
        </div>
    </>
  )
}

export default Home