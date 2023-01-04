import { Suspense, useContext } from 'react'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import { AppContainer } from './common/styles'
import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import { RouteProperties } from './config/routes/interface'
import { RouteConfigContext } from './config/routes/routeConfigContext'
import PageNotFound from './pages/pageNotFound/PageNotFound'
import dimensions from './theme/dimensions'

function App() {
  const { routeConfig } = useContext(RouteConfigContext)

  const routes: Array<JSX.Element> = []

  /**
   * Recursive function to find the sub routes for the parent route and add those routes to the routes array
   * @param parent // main route info containing it's sub routes
   */
  function findSubRoutes(parent: RouteProperties) {
    parent.children?.forEach((element) => {
      routes.push(
        <Route
          key={element.path}
          path={element.path}
          element={<element.component />}
        />
      )
      if (element.children !== undefined && element.children.length > 0) {
        findSubRoutes(element)
      }
    })
  }

  /** Iterates the route config to push those routes to routes array  */
  routeConfig.children?.forEach((parent) => {
    routes.push(
      <Route
        key={parent.path}
        path={parent.path}
        element={<parent.component />}
      />
    )
    if (routeConfig.children !== undefined && routeConfig.children.length > 0) {
      findSubRoutes(parent)
    }
  })

  return (
    <AppContainer>
      <Suspense fallback={<div />}>
        <Router>
          <Sidebar />
          <Header marginLeft={dimensions.drawerWidth} />
          <div style={{ marginLeft: `${dimensions.drawerWidth}px` }}>
            <Routes>
              {routes}
              {/* No route found */}
              <Route element={<PageNotFound />} />
            </Routes>
          </div>
        </Router>
      </Suspense>
    </AppContainer>
  )
}

export default App
