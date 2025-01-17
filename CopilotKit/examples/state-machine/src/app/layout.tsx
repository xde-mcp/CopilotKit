"use client";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import { systemPrompt } from "@/lib/data/systemPrompt";
import { GlobalDataProvider } from "@/lib/states/global-data";
import { motion } from "motion/react"
import { Chat } from "@/components/chat/chat";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalDataProvider>
          <CopilotKit
            publicApiKey={process.env.NEXT_PUBLIC_CPK_PUBLIC_API_KEY}
            showDevConsole={false}
          >
            <div className="h-screen w-screen grid grid-cols-3 p-10 gap-5 bg-gradient-to-b from-blue-100 via-purple-200 to-blue-100">
              <div className="col-span-1">{children}</div>
              <div className="col-span-2 flex justify-center items-center overflow-y-auto">
                <Chat />
              </div>
            </div>
          </CopilotKit>
        </GlobalDataProvider>
      </body>
    </html>
  );
}
