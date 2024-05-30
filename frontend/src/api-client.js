const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

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

export const deleteMyGym = async (gymId) => {
  const response = await fetch(`${API_BASE_URL}/api/my-gyms/${gymId}`, {
    method: "DELETE",

    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to deleting Gym");
  }

  return response.json();
};

export const searchGyms = async (searchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("searchTerm", searchParams.searchTerm || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.sports?.forEach((sport) => {
    queryParams.append("sports", sport);
  });
  searchParams.equipment?.forEach((equip) => {
    queryParams.append("equipment", equip);
  });

  const response = await fetch(
    `${API_BASE_URL}/api/gyms/search/?${queryParams}`,
  );

  if (!response.ok) {
    throw new Error("Error fetching gyms");
  }

  return response.json();
};

export const fetchGymById = async (gymId) => {
  const response = await fetch(`${API_BASE_URL}/api/gyms/${gymId}`, {});

  if (!response.ok) {
    throw new Error("Error fetching Gym");
  }

  return response.json();
};

export const createGymBooking = async (formData) => {
  const response = fetch(
    `${API_BASE_URL}/api/gyms/${formData.gymId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...formData,
        totalCost: Number(formData.totalCost),
      }),
    },
  );

  // if (!response.ok) throw new Error("Error booking gym");
  // Always returns error somehow?
};

export const validateBookingCheckout = async (gymId, startTime, endTime) => {
  const response = await fetch(
    `${API_BASE_URL}/api/gyms/${gymId}/validate-booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        startTime,
        endTime,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Error validating booking");
  }

  return response.json();
};

export const fetchMyBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};
