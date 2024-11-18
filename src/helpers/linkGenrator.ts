import config from './config'

export const linkGnirator = (path: string) => {    
  //http://127.0.0.1:8000/
  return config.url + path ;
}

export const mediaLinkGnirator = (path: string) => {    
  return config.mediaUrl + path ;
}


export default linkGnirator
