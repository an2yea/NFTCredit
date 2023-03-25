import Home from './index'
import { ContextProvider } from './Context'

export default function Final(){
    return <ContextProvider><Home /> </ContextProvider>
}