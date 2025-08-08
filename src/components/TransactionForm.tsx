import React, { useState, useEffect } from "react";
import {
  initializePayment,
  verifyTransaction,
} from "@/services/paymentService";
import {
  Send,
  ShieldCheck,
  CreditCard,
  User,
  Mail,
  Phone,
  FileText,
  DollarSign,
} from "lucide-react";
import Input from "./Input";
import Button from "./Button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    amount: "",
    currency: "ETB",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    "customization[title]": "",
    "customization[description]": "",
  });
  const [txRef, setTxRef] = useState("");
  const [verifyResult, setVerifyResult] = useState("");
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const tx_ref_param = searchParams.get("tx_ref_param");

  useEffect(() => {
    if (tx_ref_param) {
      setTxRef(tx_ref_param);
      setTransactionDetails(null);
      setVerifyResult("");
    }
  }, [tx_ref_param]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    setVerifyResult("");
    setTransactionDetails(null);

    try {
      const tx_ref = `TX-${Date.now()}`;
      const paymentData = {
        amount: parseFloat(formData.amount),
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        currency: formData.currency,
        customization: {
          title: formData["customization[title]"],
          description: formData["customization[description]"],
        },
        tx_ref,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/user/initiate-payment?tx_ref_param=${tx_ref}`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/user/initiate-payment?tx_ref_param=${tx_ref}`,
      };

      const result = await initializePayment(paymentData);
      setTxRef(tx_ref);
      setFeedback("Payment initialized successfully!");

      // Open checkout URL if available
      if (result.data.checkout_url) {
        window.open(result.data.checkout_url, "_blank");
      }
    } catch (err) {
      setFeedback("Failed to initialize payment");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!txRef) return;
    setLoading(true);
    setVerifyResult("");
    setTransactionDetails(null);
    try {
      const result = await verifyTransaction(txRef);
      console.log("----------result----------", result);
      setVerifyResult(result.message || "Transaction verified successfully");
      setTransactionDetails(result);
    } catch (err) {
      setVerifyResult("Failed to verify transaction");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (tx_ref_param) {
    return (
      <div className="min-h-[70vh] flex font-sans">
        <div className="flex flex-col justify-center items-center w-full px-8">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <ShieldCheck className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verify Transaction
                </h2>
                <p className="text-gray-600 text-sm">
                  Verify your payment transaction
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">
                    Transaction Reference
                  </span>
                </div>
                <p className="text-blue-900 font-mono text-sm break-all">
                  {txRef}
                </p>
              </div>

              <Button
                onClick={handleVerify}
                loading={loading}
                className="w-full mb-6"
              >
                Verify Transaction
              </Button>

              {verifyResult && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 text-sm font-medium">
                    {verifyResult}
                  </p>
                </div>
              )}

              {transactionDetails && (
                <div className="space-y-6">
                  {/* Transaction Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Transaction Status
                    </h3>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          transactionDetails.status
                        )}`}
                      >
                        {transactionDetails.status?.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        {transactionDetails.method} • {transactionDetails.mode}
                      </span>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Payment Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Amount
                        </label>
                        <p className="text-lg font-semibold text-gray-900">
                          {transactionDetails.currency}{" "}
                          {transactionDetails.amount}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Charge
                        </label>
                        <p className="text-lg font-semibold text-gray-900">
                          {transactionDetails.currency}{" "}
                          {transactionDetails.charge}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Reference
                        </label>
                        <p className="text-sm font-mono text-gray-900">
                          {transactionDetails.reference}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Transaction Ref
                        </label>
                        <p className="text-sm font-mono text-gray-900">
                          {transactionDetails.tx_ref}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Full Name
                        </label>
                        <p className="text-gray-900">
                          {transactionDetails.data.first_name}{" "}
                          {transactionDetails.data.last_name}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Email
                        </label>
                        <p className="text-gray-900">
                          {transactionDetails.data.email}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Phone Number
                        </label>
                        <p className="text-gray-900">
                          {transactionDetails.data.phone_number}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Type
                        </label>
                        <p className="text-gray-900">
                          {transactionDetails.data.type}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customization */}
                  {transactionDetails.data.customization && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Payment Details
                      </h3>
                      <div className="space-y-3">
                        {transactionDetails.data.customization.title && (
                          <div>
                            <label className="block text-sm font-medium text-gray-600">
                              Title
                            </label>
                            <p className="text-gray-900">
                              {transactionDetails.data.customization.title}
                            </p>
                          </div>
                        )}
                        {transactionDetails.data.customization.description && (
                          <div>
                            <label className="block text-sm font-medium text-gray-600">
                              Description
                            </label>
                            <p className="text-gray-900">
                              {
                                transactionDetails.data.customization
                                  .description
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Timestamps
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Created At
                        </label>
                        <p className="text-sm text-gray-900">
                          {formatDate(transactionDetails.data.created_at)}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Updated At
                        </label>
                        <p className="text-sm text-gray-900">
                          {formatDate(transactionDetails.data.updated_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <Link href={`/dashboard/user/initiate-payment`}>
                  <button className="w-full cursor-pointer mt-6 text-sm text-gray-600 hover:text-primary transition-colors">
                    ← Back to Payment Form
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex justify-center font-sans m-0 p-0">
      <div className="">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-4">
            <Send className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Initiate Payment
          </h2>
          <p className="text-gray-600 text-sm">
            Complete the form below to start your payment
          </p>
        </div>

        {txRef && (
          <Link href={`/dashboard/user/initiate-payment?tx_ref_param=${txRef}`}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">
                  Transaction Reference
                </span>
              </div>
              <p className="text-blue-900 font-mono text-sm break-all">
                {txRef}
              </p>
            </div>
          </Link>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount
              </label>
              <Input
                type="number"
                min="1"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="Enter amount"
                icon={<DollarSign className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Currency
              </label>
              <Input
                type="text"
                value={formData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                placeholder="Currency"
                icon={<DollarSign className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                icon={<Mail className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <Input
                type="text"
                value={formData.first_name}
                onChange={(e) =>
                  handleInputChange("first_name", e.target.value)
                }
                placeholder="First name"
                icon={<User className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <Input
                type="text"
                value={formData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                placeholder="Last name"
                icon={<User className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={formData.phone_number}
                onChange={(e) =>
                  handleInputChange("phone_number", e.target.value)
                }
                placeholder="Enter phone number"
                icon={<Phone className="w-5 h-5" />}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Title
              </label>
              <Input
                type="text"
                value={formData["customization[title]"]}
                onChange={(e) =>
                  handleInputChange("customization[title]", e.target.value)
                }
                placeholder="Payment for my favourite merchant"
                icon={<FileText className="w-5 h-5" />}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Description
              </label>
              <Input
                type="text"
                value={formData["customization[description]"]}
                onChange={(e) =>
                  handleInputChange(
                    "customization[description]",
                    e.target.value
                  )
                }
                placeholder="I love online payments"
                icon={<FileText className="w-5 h-5" />}
              />
            </div>
          </div>

          {feedback && (
            <div
              className={`rounded-lg p-3 ${
                feedback.includes("Failed")
                  ? "bg-red-50 border border-red-200"
                  : "bg-green-50 border border-green-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  feedback.includes("Failed")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {feedback}
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <Button type="submit" loading={loading} className="w-full max-w-md">
              Initialize Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
