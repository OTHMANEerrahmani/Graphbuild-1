import Stripe from "stripe";
import User from "../models/User.js";
import moment from "moment";
import dotenv from "dotenv";

import nodemailer from "nodemailer";
import { createOrderReceivedEmail } from "./emails/createOrderReceivedEmail.js";

dotenv.config();

/* STRIPE */

const [Starter, Pro, Business] = [
  process.env.STRIPE_BASIC,
  process.env.STRIPE_PRO,
  process.env.STRIPE_BUSINESS,
];

const planTypes = {
  [Starter]: "Starter",
  [Pro]: "Pro",
  [Business]: "Business",
};

// Function to create a Stripe session

export const createStripeSession = async (plan) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_CLIENT}/success`,
      cancel_url: `${process.env.APP_CLIENT}/cancel`,
    });
    return session;
  } catch (e) {
    return e;
  }
};

export const createSession = async (req, res) => {
  const { plan, userId } = req.body;
  let planId = null;

  if (plan == "Starter") planId = Starter;
  else if (plan == "Pro") planId = Pro;
  else if (plan == "Business") planId = Business;

  try {
    const session = await createStripeSession(planId);
    // Update user with subscription data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          subscription: {
            sessionId: session.id,
          },
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const paymentSuccess = async (req, res) => {
  const { sessionId, userId } = req.body;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const subscriptionId = session.subscription;
      console.log(session.subscription);

      try {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        const planId = subscription.plan.id;
        const planType = planTypes[planId];
        const startDate = moment
          .unix(subscription.current_period_start)
          .toDate();
        const endDate = moment.unix(subscription.current_period_end).toDate();
        const durationInSeconds =
          subscription.current_period_end - subscription.current_period_start;
        const durationInDays = moment
          .duration(durationInSeconds, "seconds")
          .asDays();

        // Update user with subscription data
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              subscription: {
                sessionId: null,
                planId: planId,
                planType: planType,
                planStartDate: startDate,
                planEndDate: endDate,
                planDuration: durationInDays,
              },
            },
          },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
        }

        var transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const emailHtml = createOrderReceivedEmail({
          orderType: planType,
          client: updatedUser.name,
          orderId: planId,
          orderDate: moment().format("YYYY-MM-DD"),
        });

        var mailOptions = {
          from: process.env.GMAIL_USER,
          to: updatedUser.email,
          subject: "GraphBuild - Subcription",
          html: emailHtml,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ error: "Error sending email" });
          } else {
            console.log("Email sent: " + info.response);
            return res.json({ message: "Payment successful and email sent" });
          }
        });
      } catch (error) {
        console.error("Error retrieving subscription:", error);
        return res.status(500).json({ error: "Error retrieving subscription" });
      }
    } else {
      return res.json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error retrieving session:", error);
    return res.status(500).json({ error: "Error retrieving session" });
  }
};
