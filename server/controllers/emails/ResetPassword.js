export const ResetPassword = ({ userId, token }) => {

  return (
    `<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 30px;">
          <img src="${process.env.APP_CLIENT}/Logo.png" width="65" height="73" alt="GraphBuild Logo" style="margin: auto;" />
           <h2 style="color: #333333; text-align: center; margin-bottom: 30px;">Reset Password Link</h2>
        </div>
       
        <p>Hello,</p>
        <p>You have requested to reset your password. Click the button below to proceed:</p>
        <p style="text-align: center;">
            <a href=` +
    `http://localhost:5173/reset_password/${userId}/${token}` +
    ` style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p>If you did not request this, please ignore this email.</p>
    </div>

</body>`
  );
};
