import axios from "axios";
import { getLocale } from "next-intl/server";

import { type Dimensions } from "@/app/(frontend)/next/package/route";
import { type Locale } from "@/i18n/config";
import { type Order } from "@/types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import config from "@payload-config";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createInpostCourierPackage = async (
  order: Order,
  dimensions: Dimensions
) => {
  const locale = (await getLocale()) as Locale;
  const inpostCourierSettings = await getCachedGlobal(
    "inpost-courier",
    locale,
    1
  )();
  const fulfilment = await getCachedGlobal("fulfilment", locale, 1)();
  const { APIUrl, shipXAPIKey, clientId } = inpostCourierSettings;
  const { shopAddress } = fulfilment;
  const { shippingAddress } = order;

  const secretKey = "bb9faebf8294424398ed7344829fd5fb";

  const payload = await getPayload({ config });

  const addressParts = shopAddress.address.split(" ");
  const building_number = addressParts[addressParts.length - 1];
  const street = addressParts.slice(0, -1).join(" ");

  const shippingAddressParts = shippingAddress.address.split(" ");
  const shippingBuildingNumber =
    shippingAddressParts[shippingAddressParts.length - 1];
  const shippingStreet = shippingAddressParts.slice(0, -1).join(" ");

  if (!shippingAddress) {
    throw new Error("No shipping address found");
  }

  const url = "https://apis-sandbox.fedex.com/oauth/token";
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", String(shipXAPIKey)); // From FedEx Dev Portal
  params.append("client_secret", secretKey);

  const tokenResp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const tokenData = await tokenResp.json();
  const accessToken = tokenData.access_token;

  // const t = {
  //   // Required: how you want the label back
  //   labelResponseOptions: "URL_ONLY", // or "LABEL"
  //   accountNumber: {
  //     value: "740561073", // your real FedEx account number
  //   },
  //   requestedShipment: {
  //     shipper: {
  //       contact: {
  //         personName: "SENDER NAME",
  //         phoneNumber: "9018328595",
  //       },
  //       address: {
  //         streetLines: ["SENDER ADDRESS 1"],
  //         city: "MEMPHIS",
  //         stateOrProvinceCode: "TN",
  //         postalCode: "38116",
  //         countryCode: "US",
  //       },
  //     },
  //     recipients: [
  //       {
  //         contact: {
  //           personName: "RECIPIENT NAME",
  //           phoneNumber: "9018328595",
  //         },
  //         address: {
  //           streetLines: ["RECIPIENT ADDRESS 1"],
  //           city: "MEMPHIS",
  //           stateOrProvinceCode: "TN",
  //           postalCode: "38116",
  //           countryCode: "US",
  //         },
  //       },
  //     ],
  //     serviceType: "STANDARD_OVERNIGHT",
  //     packagingType: "YOUR_PACKAGING",
  //     pickupType: "DROPOFF_AT_FEDEX_LOCATION",
  //     shippingChargesPayment: {
  //       paymentType: "SENDER",
  //       payor: {
  //         responsibleParty: {
  //           accountNumber: {
  //             value: "1212343124", // put the real account here
  //             key: "asdfd",
  //           },
  //         },
  //         address: {
  //           streetLines: ["SENDER ADDRESS 1"],
  //           city: "MEMPHIS",
  //           stateOrProvinceCode: "TN",
  //           postalCode: "38116",
  //           countryCode: "US",
  //         },
  //       },
  //     },

  //     // Required: label details
  //     labelSpecification: {
  //       imageType: "PDF", // or "PNG", "ZPLII", etc.
  //       labelStockType: "PAPER_4X6",
  //       labelFormatType: "COMMON2D",
  //     },

  //     requestedPackageLineItems: [
  //       {
  //         weight: {
  //           units: "LB",
  //           value: 20, // use number, not string
  //         },
  //       },
  //     ],
  //   },
  // };

  const t = {
    labelResponseOptions: "URL_ONLY",
    accountNumber: {
      value: "740561073",
    },
    requestedShipment: {
      shipper: {
        contact: {
          personName: "John Sender",
          phoneNumber: "1234567890",
          companyName: "Sender Company",
        },
        address: {
          streetLines: ["123 Main Street"],
          city: "Memphis",
          stateOrProvinceCode: "TN",
          postalCode: "38116",
          countryCode: "US",
        },
      },
      recipients: [
        {
          contact: {
            personName: "Jane Receiver",
            phoneNumber: "9876543210",
            companyName: "Receiver Company",
          },
          address: {
            streetLines: ["456 Oak Avenue"],
            city: "Memphis",
            stateOrProvinceCode: "TN",
            postalCode: "38117",
            countryCode: "US",
          },
        },
      ],
      serviceType: "STANDARD_OVERNIGHT",
      packagingType: "YOUR_PACKAGING",
      pickupType: "DROPOFF_AT_FEDEX_LOCATION",

      shippingChargesPayment: {
        paymentType: "SENDER",
      },

      labelSpecification: {
        imageType: "PDF",
        labelStockType: "PAPER_4X6",
      },

      requestedPackageLineItems: [
        {
          weight: {
            units: "LB",
            value: 10,
          },
          dimensions: {
            length: 12,
            width: 10,
            height: 8,
            units: "IN",
          },
        },
      ],
    },
    processingOptionType: "ALLOW_ASYNCHRONOUS",
  };

  const response = await fetch(
    "https://apis-sandbox.fedex.com/ship/v1/shipments",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, // from step 1
        "Content-Type": "application/json",
        "X-locale": "en_US",
      },
      body: JSON.stringify(t),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("FedEx error:", response.status, errorBody);
    throw new Error("FedEx Ship API error");
  }

  const shipmentResult = await response.json();


  const transactionShipment = shipmentResult.output.transactionShipments[0];
  const trackingNumber = transactionShipment.masterTrackingNumber;
  const pieceResponse = transactionShipment.pieceResponses[0];

  const packageID: string = shipmentResult.transactionId;

    await payload.update({
    id: order.id,
    collection: "orders",
    data: {
      orderDetails: {
        trackingNumber: trackingNumber,
      },
      printLabel: {
        packageNumber: packageID, 
        labelurl: pieceResponse.packageDocuments[0].url
      },
    },
  });

  // const checkShipmentStatus = async (maxAttempts = 10): Promise<string> => {
  //   for (let attempt = 0; attempt < maxAttempts; attempt++) {
  //     const { data: shipmentData } = await axios.get<{
  //       status: string;
  //       tracking_number: string;
  //     }>(`${APIUrl}/v1/shipments/${packageID}`, {
  //       headers: {
  //         Authorization: `Bearer ${shipXAPIKey}`,
  //       },
  //     });
  //     if (shipmentData.status === "confirmed" && shipmentData.tracking_number) {
  //       await payload.update({
  //         id: order.id,
  //         collection: "orders",
  //         data: {
  //           orderDetails: {
  //             trackingNumber: shipmentData.tracking_number,
  //           },
  //           printLabel: {
  //             packageNumber: packageID,
  //           },
  //         },
  //       });

  //       return packageID;
  //     }

  //     await wait(2000);
  //   }

  //   throw new Error("Timeout waiting for shipment confirmation");
  // };

  // await checkShipmentStatus();

  return trackingNumber;
};

