import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import QueryClientContextProvider from "./QueryClientContextProvider";
import { MSider } from "@/components/UI/MSider/MSider";
import style from './layout.module.scss'
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
            <div className={style.layout}>
              <Header/>
            <div className={style.layoutRow}>
            <MSider/>
            <main className='main'>
              {children}
            </main>
            </div>
            </div>
          
        </QueryClientContextProvider>
      </AntdRegistry>
        
    </body>
    </html>
  );
}
