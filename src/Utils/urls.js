export const isProduction = import.meta.env.NODE_ENV === 'production'
export const isDevelopment = import.meta.env.NODE_ENV === 'development'
export const isStaging = import.meta.env.NODE_ENV === 'staging'

// const HOST_DOMAIN = import.meta.env.VITE_ARTWORLD_BACKEND || 'localhost'
// export const BASE_URL = `http://${HOST_DOMAIN}:3001`

export const BASE_URL = isProduction
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:3001'