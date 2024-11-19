async function call(method, url, dtoIn = null, opts = {}) {
  // Server handling
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
      ...opts,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Server Error");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Network Error");
  }
}

export async function login(dtoIn) {
  return await call("POST", "/login", dtoIn);
}

// ShoppingList app
export async function loadUsers() {
  return await call("GET", "/users");
}

export async function loadLists() {
  return await call("GET", "/shoppingList/list");
}
