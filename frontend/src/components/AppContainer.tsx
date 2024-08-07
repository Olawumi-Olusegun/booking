import { ReactNode } from "react"


const AppContainer = ({children}:{children: ReactNode}) => {
  return (
    <div className="w-full px-5 lg:container mx-auto flex flex-col gap-2">
        {children}
    </div>
  )
}

export default AppContainer