import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App'
import Recipes from '../scenes/recipes'
import MyContext from '..//./AppContext'

const Router = () => {
    const value = useContext(MyContext)
    const [context, setContext] = useState(value);

    const setContextState = (data) => {
        setContext({
            data: data,
        })
    }
    return(
        <BrowserRouter>
                <MyContext.Provider value = {{
                    ...context,
                    setContextState
                }}
              
                >
                    <Switch>
        
                        <Route path='/' exact component={App} />

                        <Route path='/recipes' component={Recipes} />

                    </Switch>
                </MyContext.Provider>    
        </BrowserRouter>

    )
}

export default Router


