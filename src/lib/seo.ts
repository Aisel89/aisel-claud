import type { Metadata } from "next";

export const studioMetadata: Metadata = {
  title: {
    default: "Aisel Yoga Studio | Reconnect with your body and breath",
    template: "%s | Aisel Yoga Studio"
  },
  description: "Boutique yoga studio offering Vinyasa flow, breathwork, private sessions, and community retreats. Find your inner calm with Aisel.",
  keywords: ["Yoga Studio", "Vinyasa Yoga", "Breathwork", "Meditation", "Private Yoga", "Yoga Retreats", "Women's Circles"],
  authors: [{ name: "Aisel" }],
  creator: "Aisel Yoga Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiselyoga.com",
    siteName: "Aisel Yoga Studio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Aisel Yoga Studio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aisel Yoga Studio",
    description: "Reconnect with your body and breath.",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"]
  }
};
