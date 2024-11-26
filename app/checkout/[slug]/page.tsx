"use client";
import {RootState} from "@/stores";
import {FindValuesWithKey} from "@/utilities/Find";
import axios from "axios";
import {headers} from "next/headers";
import React, {useState} from "react";
import {useSelector} from "react-redux";

const Checkout = () => {
  const {detail} = useSelector((state: RootState) => state.post);

  const [method, setMethod] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [shipAddress, setShippAddress] = useState<string>();
  const [fName, setFname] = useState<string>();
  const [lName, setLname] = useState<string>();

  const submitOrder = async () => {
    const formData = {
      order_data: {
        product: detail?.name,
        quantity: 1,
        price:
          detail &&
          Number(
            FindValuesWithKey({
              arrayData: detail?.content_data,
              findKey: "Price",
            })
          ),
        currency_code: "vnd",
      },
      customer_info: {
        user_id: 1,
        first_name: fName,
        last_name: lName,
        email: email,
        address_1: shipAddress,
        address_2: "",
        city: "Cần Thơ",
        country_code: "VN",
        province: "",
        phone: "+84795970699",
        postal_code: "900000",
      },
      shipping_adrress: {
        first_name: fName,
        last_name: lName,
        address_1: shipAddress,
        address_2: "",
        city: "Cần Thơ",
        country_code: "VN",
        province: "",
        phone: "+84795970699",
        postal_code: "900000",
      },
      metadata: {},
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_CENTRALIED}/orders/create/MEDUSA`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CENTRALIED_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      console.log(JSON.stringify(response.data));
      const linForm = {
        method: "online",
        provider_code: method,
        callback_url: window.location.origin,
      };
      const responseCreateLink = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_CENTRALIED}/payment/create-link/MEDUSA/${response.data?.data?.order?.id}`,
        linForm,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CENTRALIED_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (
        responseCreateLink.status === 200 ||
        responseCreateLink.status === 201
      ) {
        window.location.href = responseCreateLink.data?.data?.payment_link;
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Checkout Panel
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Checkout</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={`${detail && JSON.parse(FindValuesWithKey({arrayData: detail.content_data, findKey: "Image"}))[0]}`}
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold line-clamp-1">
                  {detail?.name}
                </span>

                <p className=" text-nowrap text-gray-500 line-through">
                  {detail &&
                    Number(
                      FindValuesWithKey({
                        arrayData: detail?.content_data,
                        findKey: "Price",
                      })
                    ) * 1.2}
                  $
                </p>
                <p className="text-lg font-bold mr-2">
                  {detail &&
                    Number(
                      FindValuesWithKey({
                        arrayData: detail?.content_data,
                        findKey: "Price",
                      })
                    )}
                  $
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-lg font-medium">Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked={method === "stripe"}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
                onClick={() => setMethod("stripe")}
              >
                <img
                  className="w-14 object-contain"
                  src="data:image/png;base64,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"
                  alt=""
                  crossOrigin="anonymous"
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Stripe</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Stripe method
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked={method === "appota"}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
                onClick={() => setMethod("appota")}
              >
                <img
                  className="w-14 object-contain"
                  src="data:image/png;base64,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"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Appota</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Appota method
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              First Name & Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your first name here"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="relative mt-2">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your last name here"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Shipping Address
            </label>
            <div className="flex">
              <div className="relative w-full flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your shippng address here"
                  onChange={(e) => setShippAddress(e.target.value)}
                />
              </div>
            </div>
            {/* <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>

              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div> */}

            <div className="mt-6 border-t border-b py-2">
              {/* <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">$399.00</p>
              </div> */}
              {/* <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$8.00</p>
              </div> */}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                $
                {detail &&
                  Number(
                    FindValuesWithKey({
                      arrayData: detail?.content_data,
                      findKey: "Price",
                    })
                  )}
                .00
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => submitOrder()}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
