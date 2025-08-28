//production

// export const BASE_URL = "/api";

//dev
export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777" : "/api";

// to work on local change this base url to http://localhost:7777