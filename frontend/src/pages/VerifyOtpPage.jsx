import { useState } from "react";
import { verifyOtp } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("reset-email");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("No email found. Please request OTP again.");
      navigate("/forgot-password");
      return;
    }

    setIsVerifying(true);
    try {
      await verifyOtp(email, otp);
      localStorage.setItem("reset-otp", otp); // ✅ Save OTP for reset-password use
      toast.success("OTP verified successfully");
      navigate("/reset-password");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center" data-theme="forest">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-md border border-primary/25">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <p className="text-sm mb-6">Enter the OTP sent to your email</p>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="btn btn-primary w-full" type="submit" disabled={isVerifying}>
            {isVerifying ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;

