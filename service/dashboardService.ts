import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

// Banners
export const fetchBanners = async () => {
  const res = await axios.get(`${API}/api/v1/user/get-all-banners`);
  return res.data;
};

// Best products
export const fetchBestProducts = async () => {
  const res = await axios.get(`${API}/api/v1/user/get-bestSeller-products`);
  return res.data;
};

// All products
export const fetchAllProducts = async () => {
  const res = await axios.get(`${API}/api/v1/user/get-All-products`);
  return res.data;
};

// Categories
export const fetchCategories = async () => {
  const res = await axios.get(`${API}/api/v1/user/get-shop-by-func-categories`);
  return res.data;
};

export const fetchCategoriesProducts = async (id:string) => {
  const res = await axios.get(`${API}/api/v1/user/get-All-products?categoryId=${id}`);
  return res.data;
};



export const fetchShopProductFunction = async () => {
  const res = await axios.get(`${API}/api/v1/user/get-shop-by-prod-categories`);
  return res.data;
};


export const getProductsByCategory = async (categoryId: string) => {
  const res = await axios.get(`${API}/api/v1/user/get-all-products`,
    {
      params: {
        page: 1,
        limit: 12,
        categoryId,
      },
    }
  );

  return res.data;
};

export const fetchReels = async () => {
  const res = await axios.get(`${API}/api/v1/user/get-all-reels`);
  return res.data?.data || []; 
};

export const addToCartAPI = async (productId: string, token: string) => {
  const res = await axios.post(
    `${API}/api/v1/user/cart/add`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const addToCartLocal = (productData: any, id: string) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find((item: any) => item._id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...productData,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
};

export const fetchCartService = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const res = await axios.get(`${API}/api/v1/user/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } else {
    // fallback to local cart
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return { data: { items: localCart } };
  }
};

