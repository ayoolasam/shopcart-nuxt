function generateRandomID() {
  return Math.random().toString(36).substr(2, 9);
}

function formatDate(timestamp) {
  if (typeof timestamp === "string" && timestamp.includes("/")) {
    const [day, month, year] = timestamp.split("/");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

function formatToNaira(amount) {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function convertFileSize(size) {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function truncateFileName(fileName, maxLength) {
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const parts = fileName.split(".");
  if (parts.length < 2) {
    // No extension found
    return fileName.substring(0, maxLength - 3) + "...";
  }

  const extension = parts.pop();
  const name = parts.join(".");
  const truncatedName = name.substring(0, maxLength - extension.length - 3);

  return `${truncatedName}...${extension}`;
}

export {
  generateRandomID,
  formatDate,
  formatTime,
  convertFileSize,
  truncateFileName,
  formatToNaira,
};
