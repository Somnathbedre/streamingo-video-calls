import { useState } from "react";
import { resetPassword } from "../lib/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("reset-email");
  const otp = localStorage.getItem("reset-otp");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error("Missing email or OTP. Please restart the password reset process.");
      return navigate("/forgot-password");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setIsResetting(true);
    try {
      await resetPassword(email, otp, password); // ✅ Now includes OTP
      toast.success("Password reset successful");
      localStorage.removeItem("reset-email");
      localStorage.removeItem("reset-otp");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center" data-theme="forest">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-md border border-primary/25">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <p className="text-sm mb-6">Enter a new password for your account</p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-full" type="submit" disabled={isResetting}>
            {isResetting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

