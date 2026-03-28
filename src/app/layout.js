import {Roboto,AR_One_Sans} from "next/font/google"
import "./globals.css"

const robot = Roboto({
  variable :"--font-robot",
  subsets :["latin"]
})
const arOneSans = AR_One_Sans({
  variable :"--font-ar",
  subsets :["latin"]
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={arOneSans.className}>
        {children}
        
              </body>
    </html>
  );
}