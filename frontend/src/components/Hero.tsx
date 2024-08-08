import AppContainer from "./AppContainer"

const Hero = () => {
  return (
    <div className="bg-blue-800">
        <AppContainer className="py-20">
            <h1 className="text-4xl md:text-5xl text-white font-bold">Find your next staycation</h1>
            <p className="text-2xl text-white">
                Search low prices on hotels for your dream vacation...
            </p>
        </AppContainer>
    </div>
  )
}

export default Hero