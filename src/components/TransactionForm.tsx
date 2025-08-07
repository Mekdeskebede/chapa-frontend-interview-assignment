import React, { useState } from "react";
import {
    initializePayment,
    verifyTransaction,
} from "@/services/paymentService";

export default function TransactionForm() {
    const [amount, setAmount] = useState("");
    const [txRef, setTxRef] = useState("");
    const [verifyResult, setVerifyResult] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFeedback("");
        setVerifyResult("");
        try {
            // You should generate a unique tx_ref for each payment
            const tx_ref = `TX-${Date.now()}`;
            const paymentData = {
                amount,
                currency: "ETB",
                email: "kebedemekdes289@gmail.com",
                first_name: "User",
                last_name: "Demo",
                tx_ref,/*  */
                callback_url: "https://your-callback-url.com",
            };
            const result = await initializePayment(paymentData);
            setTxRef(tx_ref);
            setFeedback(result.message || "Payment initialized!");
        } catch (err: any) {
            setFeedback(err.message || "Failed to initialize payment");
        } finally {
            setLoading(false);
            setAmount("");
        }
    };

    const handleVerify = async () => {
        if (!txRef) return;
        setLoading(true);
        setVerifyResult("");
        try {
            const result = await verifyTransaction(txRef);
            setVerifyResult(result.message || JSON.stringify(result));
        } catch (err: any) {
            setVerifyResult(err.message || "Failed to verify transaction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Initiate Transaction
            </h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    min="1"
                    required
                    placeholder="Amount"
                    className="w-full mb-3 p-2 border rounded"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Send"}
                </button>
            </form>
            {feedback && (
                <p className="text-green-600 mt-2 text-sm">{feedback}</p>
            )}
            {txRef && (
                <div className="mt-4">
                    <h4 className="text-blue-700 font-semibold mb-2">
                        Verify Transaction
                    </h4>
                    <button
                        onClick={handleVerify}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify Transaction"}
                    </button>
                    {verifyResult && (
                        <p className="text-blue-700 mt-2 text-sm">
                            {verifyResult}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
