
const production = {
    BASE_URL: import.meta.env.VITE_BASE_URL+"/api/v1" || ""
}

const development = {
       BASE_URL: import.meta.env.VITE_BASE_URL+"/api/v1" || ""
}

export const config = process.env.NODE_ENV === "development" ? development : production;