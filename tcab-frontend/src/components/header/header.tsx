import { useContext, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { RouteConfigContext } from '../../config/routes/routeConfigContext'
import { HeadItems, HeadItemsRight, HeadWrapper } from './styles'

function Header({ marginLeft }: { marginLeft: number }) {
  const [title, setTitle] = useState<string>()
  const { pathname } = useLocation()
  const { routeConfig } = useContext(RouteConfigContext)

  useEffect(() => {
    const currentPath = routeConfig.children?.find(
      (route) => route.path === pathname
    )
    setTitle(currentPath?.title)
  }, [pathname])

  return (
    <HeadWrapper marginLeft={marginLeft} className="headWrapper">
      <HeadItems>{title}</HeadItems>
      <HeadItemsRight>
        {/* {authInfo.isSecure && <UserMenu />} */}
      </HeadItemsRight>
    </HeadWrapper>
  )
}

export default Header
