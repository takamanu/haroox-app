// import { useRouter } from "solito/router/index"

// const {replace, push} = useRouter()

export interface RouteScreen {
  name: string
  route: string
}

export const changeScreen = (screen: string): RouteScreen => {
  var route: string = ''
  switch (screen) {
    case 'HomeAuth':
      route = '/(auth)/auth_home'
      break
    case 'Profil':
      route = '/(main)/profile'
      break
    case 'Product':
      route = '/(main)/products'
      break
    case 'Component':
      route = '/(main)/components'
      break
    case 'Component Owned':
    route = '/(main)/components/owned/owned/'
    break
    case 'Product Owned':
    route = '/(main)/products/owned/owned/'
    break
    case 'UpdateProcess':
    route = '/(main)/update_process'
    break
    case 'Scan':
    route = '/(main)/scan'
    break
    case 'Beranda':
      route = '/(main)/'
      break
    case 'NaikKelas':
      route = '/(main)/naik-kelas'
      break
    case 'VerifikasiNaikKelas':
      route = '/(aux)/naik-kelas-verifikasi'
      break
    case 'SendEmail':
      route = '/(auth)/forgot_pass/send_email'
      break
    case 'Login':
      route = '/(auth)/login'
      break
    case 'Register':
      route = '/(auth)/register'
      break
    case 'EditProfile':
      route = '/(main)/profile/edit'
      break
    default:
      route = '/(main)/'
      break
  }

  return <RouteScreen>{
    name: screen,
    route: route,
  }
}
