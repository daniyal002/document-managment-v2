import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import QueryClientContextProvider from "./QueryClientContextProvider";
import { Header } from "@/components/UI/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Документооборот",
  description: "Создавайте заявку легко",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
      <AntdRegistry>
          <QueryClientContextProvider >
            <Header/>
            <main className='main'>
              {children}
            </main>
        </QueryClientContextProvider>
      </AntdRegistry>
        
    </body>
    </html>
  );
}
