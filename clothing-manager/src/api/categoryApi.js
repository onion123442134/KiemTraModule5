const BASE_URL = "http://localhost:3001/categories";

export const getCategories = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
};
