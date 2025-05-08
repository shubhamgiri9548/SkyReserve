import { apiConnector } from "../../api/apiConnector";
import { invoice } from "../../api/apis";


export const downloadInvoice = async (bookingId, token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${invoice.DOWNLOAD_INVOICE_API}/${bookingId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        responseType: "blob", // THIS IS VERY IMPORTANT
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${bookingId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
