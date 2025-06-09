import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Order = () => {
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

  const handleSubmit = (values) => {
    console.log("Order placed:", values);
    alert("Order placed!");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans text-gold bg-gray-900 rounded-lg shadow-lg border border-gold mt-8">
      <h1 className="text-4xl font-extrabold mb-8 border-b-2 border-gold pb-3 uppercase tracking-wide">
        Place Your Order
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block mb-1 font-semibold tracking-wide uppercase">
              First Name <span className="text-red-500">*</span>
            </label>
            <Field
              name="firstName"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold font-semibold placeholder-gold/70 focus:outline-none focus:ring-2 focus:ring-gold transition"
              placeholder="Enter your first name"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 mt-1 font-semibold"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-semibold tracking-wide uppercase">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Field
              name="lastName"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold font-semibold placeholder-gold/70 focus:outline-none focus:ring-2 focus:ring-gold transition"
              placeholder="Enter your last name"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 mt-1 font-semibold"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 font-semibold tracking-wide uppercase">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <Field
              name="mobile"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold font-semibold placeholder-gold/70 focus:outline-none focus:ring-2 focus:ring-gold transition"
              placeholder="10-digit mobile number"
            />
            <ErrorMessage
              name="mobile"
              component="div"
              className="text-red-500 mt-1 font-semibold"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-semibold tracking-wide uppercase">
              Address <span className="text-red-500">*</span>
            </label>
            <Field
              name="address"
              as="textarea"
              rows="3"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold font-semibold placeholder-gold/70 focus:outline-none focus:ring-2 focus:ring-gold transition resize-none"
              placeholder="Enter your address"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 mt-1 font-semibold"
            />
          </div>

          {/* Delivery Instructions */}
          <div>
            <label className="block mb-1 font-semibold tracking-wide uppercase">
              Delivery Instructions
            </label>
            <Field
              name="instructions"
              as="textarea"
              rows="2"
              className="w-full bg-gray-800 border border-gold rounded-md p-3 text-gold font-semibold placeholder-gold/70 focus:outline-none focus:ring-2 focus:ring-gold transition resize-none"
              placeholder="Any special instructions?"
            />
            <ErrorMessage
              name="instructions"
              component="div"
              className="text-red-500 mt-1 font-semibold"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold to-yellow-400 text-gray-900 font-bold text-lg py-3 rounded-lg shadow-lg hover:from-yellow-400 hover:to-gold transition"
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
