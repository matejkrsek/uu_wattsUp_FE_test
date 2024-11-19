// Funkce pro hashování hesla pomocí SHA-256
export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password); // Převede text na Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Zahashuje data
  return Array.from(new Uint8Array(hashBuffer)) // Převede buffer na hexadecimální string
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};
