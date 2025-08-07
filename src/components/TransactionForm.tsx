import React, { useState } from "react";
import {
    initializePayment,
    verifyTransaction,
} from "@/services/paymentService";
import { Send, ShieldCheck } from "lucide-react";
import Input from "./Input";
import Button from "./Button";

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
            const tx_ref = `TX-${Date.now()}`;
            const paymentData = {
                amount,
                currency: "ETB",
                email: "kebedemekdes289@gmail.com",
                first_name: "User",
                last_name: "Demo",
                tx_ref,
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
        <form onSubmit={handleSubmit} className="mb-6 flex justify-center">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-lg p-5 w-72 flex flex-col items-center">
                <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                    <Send className="w-5 h-5 text-white" /> Initiate Transaction
                </h3>
                <Input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="border-white text-white"
                />
                {feedback && (
                    <p className="text-green-200 text-sm mb-2">{feedback}</p>
                )}
                <Button type="submit" loading={loading} className="mt-2">
                    Send
                </Button>
                {txRef && (
                    <div className="mt-4 w-full flex flex-col items-center">
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-white" />{" "}
                            Verify Transaction
                        </h4>
                        <Button
                            type="button"
                            onClick={handleVerify}
                            loading={loading}
                            className="mb-2 w-full"
                        >
                            Verify Transaction
                        </Button>
                        {verifyResult && (
                            <p className="text-white text-xs mt-1 text-center">
                                {verifyResult}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
}
