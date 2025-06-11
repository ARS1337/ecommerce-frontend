import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { createOrderRequest } from "../redux/order/orderActions";
import api from "../axiosSingleton";
import { clearCart } from "../redux/cart/cartReducer";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

  const initialValues = {
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    instructions: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
      .required("First name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
      .required("Last name is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a 10-digit number")
      .required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
    instructions: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await api.get("customer/details");
      const user = response?.data;
      console.log("user ", user);

      if (!user?.userName) {
        toast.error("You must complete your signup first.");
        return navigate("/onboard/signup");
      }

      const payload = {
        cart: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        address: values.address,
        deliveryInstructions: values.instructions,
      };

      dispatch(createOrderRequest(payload));
      toast.success("Order placed successfully!");
      toast.success("Cart is empty now!");
      dispatch(clearCart());
    } catch (err) {
      console.log("err ", err);
      toast.error("Failed to verify user. Please login again.");
      return navigate("/onboard/signup");
    }
  };

  if (!cart.length) {
    return (
      <div className="p-12 text-2xl font-bold font-mono border-4 border-border text-center text-gold bg-surface rounded-xl mx-6 mt-10">
        Add items to cart to proceed with order!
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans text-gold bg-gray-900 rounded-lg shadow-lg border border-gold mt-8">
      <h1 className="text-4xl font-extrabold mb-8 border-b-2 border-gold pb-3 uppercase tracking-wide">
        Place Your Order
      </h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block mb-1 font-semibold uppercase">
              First Name <span className="text-red-500">*</span>
            </label>
            <Field
              name="firstName"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold placeholder-gold/70 focus:outline-none"
              placeholder="Enter your first name"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-semibold uppercase">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Field
              name="lastName"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold placeholder-gold/70 focus:outline-none"
              placeholder="Enter your last name"
            />
            <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 font-semibold uppercase">
              Mobile <span className="text-red-500">*</span>
            </label>
            <Field
              name="mobile"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold placeholder-gold/70 focus:outline-none"
              placeholder="10-digit mobile"
            />
            <ErrorMessage name="mobile" component="div" className="text-red-500 mt-1" />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-semibold uppercase">
              Address <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              name="address"
              rows="3"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold placeholder-gold/70 resize-none focus:outline-none"
              placeholder="Enter your address"
            />
            <ErrorMessage name="address" component="div" className="text-red-500 mt-1" />
          </div>

          {/* Delivery Instructions */}
          <div>
            <label className="block mb-1 font-semibold uppercase">Instructions</label>
            <Field
              as="textarea"
              name="instructions"
              rows="2"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold placeholder-gold/70 resize-none focus:outline-none"
              placeholder="Any delivery instructions?"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold to-yellow-400 text-gray-900 font-bold text-lg py-3 rounded-lg hover:from-yellow-400 hover:to-gold transition"
            >
              PURCHASE
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Order;
