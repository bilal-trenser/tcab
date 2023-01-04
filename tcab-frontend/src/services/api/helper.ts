export default function getUrl(
  path: string,
  fullpath: boolean = false
): string {
  let host: string = `${process.env.REACT_APP_HOST!}`
  if (process.env.NODE_ENV === 'production') {
    host = `${window.location.protocol}//${window.location.host}`
  }
  let url = `${host}/${path}/`
  if (fullpath) {
    url = `${path}/`
  }
  return url
}
