const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const login = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during logout");
  }
};

export const addMyGym = async (gymFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-gyms`, {
    method: "POST",
    credentials: "include",
    body: gymFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add Gym");
  }

  return response.json();
};

export const fetchMyGyms = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-gyms`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching gyms");
  }

  return response.json();
};

export const fetchMyGymById = async (gymId) => {
  const response = await fetch(`${API_BASE_URL}/api/my-gyms/${gymId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Gym");
  }

  return response.json();
};

export const updateMyGymById = async (gymFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-gyms/${gymFormData.get("gymId")}`,
    {
      method: "PUT",
      body: gymFormData,
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update Gym");
  }

  return response.json();
};

export const searchGyms = async (searchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("searchTerm", searchParams.searchTerm || "");
  queryParams.append("page", searchParams.page || "");

  const response = await fetch(
    `${API_BASE_URL}/api/gyms/search/?${queryParams}`,
  );

  if (!response.ok) {
    throw new Error("Error fetching gyms");
  }

  return response.json();
};
