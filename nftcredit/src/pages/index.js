import Home from './temp'
import { ContextProvider } from './Context'

export default function Final(){
    return <ContextProvider><Home /> </ContextProvider>
}