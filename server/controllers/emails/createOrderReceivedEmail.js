export const createOrderReceivedEmail = ({
  orderType,
  client,
  orderId,
  orderDate,
}) => {

  return `
  <!DOCTYPE html>
 <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${process.env.APP_CLIENT}/Logo.png" width="65" height="73" alt="GraphBuild Logo" style="margin: auto;" />
          <h2 style="color: #333333;">Thank you for your subcription!</h2>
        </div>
        <p style="color: #747474; font-weight: 500; margin-top: 24px;">If you have any questions regarding your subcription, please feel free to contact us with your subcription number and we're here to help.</p>
        <hr style="border-color: #E5E5E5; margin: 24px 0;">
        <p style="color: #747474; font-weight: 500;"><strong>Client:</strong> ${client}</p>
        <p style="color: #747474; font-weight: 500;"><strong>Subcription Type:</strong> ${orderType}</p>
        <hr style="border-color: #E5E5E5; margin: 24px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px; margin-right: 24px;">
          <div>
            <p style="color: #747474; font-weight: bold;">Subcription Number</p>
            <p style="color: #6F6F6F; font-weight: 500;">${orderId}</p>
          </div>
          <div>
            <p style="color: #747474; font-weight: bold;">Purchase Date</p>
            <p style="color: #6F6F6F; font-weight: 500;">${orderDate}</p>
          </div>
        </div>
        <hr style="border-color: #E5E5E5; margin: 24px 0;">
        <p style="color: #AFAFAF; font-size: 13px; text-align: center; padding: 30px 0;">Please contact us if you have any questions. (If you reply to this email, we won't be able to see it.)</p>
        <p style="color: #AFAFAF; font-size: 13px; text-align: center;">GraphBuild, Inc. All Rights Reserved.</p>
      </div>
    </body>
  `;
};
