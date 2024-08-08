import { ComponentPropsWithRef } from "react"
import { cn } from "../lib/cn"

interface AppContainerProps extends ComponentPropsWithRef<"div">{}

const AppContainer = ({children, className, ...props }:AppContainerProps) => {
  return (
    <div className={cn("w-full px-5 lg:container mx-auto flex flex-col gap-2", className)} {...props}>
        {children}
    </div>
  )
}

export default AppContainer