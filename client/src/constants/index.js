export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "camera.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const pricingOptions = [
  {
    name: "Starter",
    per: "month",
    price: 5,
    features: ["Basic feature 1", "Basic feature 2", "Basic feature 3"],
  },
  {
    name: "Pro",
    per: "month",
    price: 10,
    features: ["Basic feature 1", "Basic feature 2", "Advanced feature 1"],
  },
  {
    name: "Business",
    per: "month",
    price: 99,
    features: [
      "Basic feature 1",
      "Basic feature 2",
      "All premium features forever",
    ],
  },
];

export const ourServices = [
  {
    name: "Automated Ad Campaign Management",
    Description:
      " Streamline ad campaign creation, management, and optimization with automated bid adjustments and seamless Facebook Graph API integration.",
  },
  {
    name: "Real-Time Performance Analytics",
    Description:
      "Access comprehensive, real-time analytics and reports to track key performance indicators and optimize advertising strategies.",
  },
  {
    name: "Advanced Media Management",
    Description:
      "Efficiently upload, store, and optimize your media assets with Cloudinary integration for high-quality ad content.",
  },
  {
    name: "Secure Payment Processing",
    Description:
      "Securely handle subscription payments and recurring billing with Stripe integration, ensuring a seamless payment experience.",
  },
];
