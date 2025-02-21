import { Body, Button, Column, Container, Font, Head, Heading, Html, Link, Row, Tailwind } from "@react-email/components";
import { tailwindThemeExtend } from "./tailwindThemeExtend";

export default function Welcome({ displayName }: { displayName: string }) {
   return (
      <Tailwind config={tailwindThemeExtend}>
         <Html lang="en" className="bg-surface-100">
            <Head>
               <Font
                  fontFamily="Geist"
                  fallbackFontFamily="Arial"
                  webFont={{
                     url: "https://fonts.gstatic.com/s/geist/v1/gyByhwUxId8gMEwcGFU.woff2",
                     format: "woff2",
                  }}
                  fontStyle="normal"
                  fontWeight="100 900"
               />
            </Head>
            <Body
               style={{ backgroundImage: "url(http://localhost:3001/email_background.png)", backgroundSize: "cover", backgroundPosition: "top left" }}
               className="py-8 bg-surface-50 px-2">
               <Container className="bg-surface-100 max-w-lg border-[1px] border-solid px-5 py-8 border-surface-300 border-b-0 rounded-t-xl">
                  <Heading as="h1" className="my-0 mb-1 text-heading text-[24px] font-semibold">
                     Welcome to InSpace, {displayName}
                  </Heading>
                  <p className="text-base text-body mb-0">We're excited to have you on board. We've got some great features waiting for you.</p>
                  <Row className="mt-3">
                     <Column className="p-3 rounded-lg border-[1px] border-solid border-surface-300 desktop-column">
                        <p className="text-base text-heading font-bold my-0">See what's happening</p>
                        <p className="text-sm text-muted my-0">Follow your friends, family, and other people you know.</p>
                     </Column>
                     <Column width={12} height={8} className="desktop-column" />
                     <Column className="p-3 rounded-lg border-[1px] border-solid border-surface-300 desktop-column">
                        <p className="text-base text-heading font-bold my-0">Latest Trends</p>
                        <p className="text-sm text-muted my-0">
                           In the{" "}
                           <Link className="text-primary-300" href="https://inspace.com">
                              trending
                           </Link>{" "}
                           section, you can see the latest trends.
                        </p>
                     </Column>
                  </Row>
               </Container>
               <Container className="bg-surface-200 max-w-lg border-[1px] border-solid px-5 py-3 border-surface-400 rounded-b-xl">
                  <p className="text-sm text-muted text-center my-0">This email was sent by InSpace.</p>
               </Container>
               <style>
                  {`
                     @media screen and (max-width: 750px) {
                        .desktop-column {
                        width: 100% !important;
                           display: block !important;
                        }
                     }
                  `}
               </style>
            </Body>
         </Html>
      </Tailwind>
   );
}
