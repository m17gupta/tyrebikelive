import axios from "axios";
import { getLocale } from "next-intl/server";
import config from "@payload-config";
import { type Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";

export const getInpostLabel = async (
  tracking_number: string,
  courierSlug: "inpost-pickup" | "inpost-courier" | "inpost-courier-cod"
) => {
  const locale = (await getLocale()) as Locale;
  const inpostSettings = await getCachedGlobal(courierSlug, locale, 1)();
  // const { shipXAPIKey } = inpostSettings;

  // const secretKey = "bb9faebf8294424398ed7344829fd5fb";

  // const APIUrl = "https://apis-sandbox.fedex.com/ship/v1/shipments/documents";

  // const url = "https://apis-sandbox.fedex.com/oauth/token";
  // const params = new URLSearchParams();
  // params.append("grant_type", "client_credentials");
  // params.append("client_id", String(shipXAPIKey)); // From FedEx Dev Portal
  // params.append("client_secret", secretKey);

  // const tokenResp = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },

  //   body: params.toString(),
  // });

  // const tokenData = await tokenResp.json();
  // const accessToken = tokenData.access_token;

  // const response = await fetch(APIUrl, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     "Content-Type": "application/json",
  //     "X-locale": "en_US",
  //   },
  //   body: JSON.stringify({
  //     trackingNumber: tracking_number,
  //     documentType: "LABEL", // or "COMMERCIAL_INVOICE", "PRO_FORMA_INVOICE"
  //     documentFormat: "PDF", // or "PNG", "ZPLII"
  //     encodedLabel: true, // Set to true to get base64 encoded label
  //   }),
  // });

  // console.log("====>>", response)

  // if (!response.ok) {
  //   const errorBody = await response.text();
  //   throw new Error(`Failed to retrieve label: ${errorBody}`);
  // }

  // const documentData = await response.json();

  // const label = documentData.output.documents[0].encodedLabel; // Base64 PDF

  // return label;

  // const { data }: { data: ArrayBuffer } = await axios.get(
  //   `${APIUrl}/v1/shipments/${packageID}/label?type=A6`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${shipXAPIKey}`,
  //     },
  //     responseType: "arraybuffer",
  //   }
  // );

  // return data;
  const payload = await getPayload({ config });
  console.log(courierSlug)

  // const url = await payload.find({})

};

