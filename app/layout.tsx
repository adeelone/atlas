import "@/styles/globals.css";

export const metadata = {
  title: "Atlas | AI Travel Planner",
  description: "A calm AI concierge for complete, editable, exportable trips."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
