import { Body, Button, Column, Container, Font, Head, Heading, Html, Row, Tailwind } from "@react-email/components";
import { tailwindThemeExtend } from "./tailwindThemeExtend";

export default function VerifyEmail() {
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
               className="py-8 bg-surface-50">
               <Container className="bg-surface-100 max-w-md border-[1px] border-solid px-5 py-8 border-surface-300 border-b-0 rounded-t-xl">
                  <Heading as="h1" className="my-0 mb-1 text-heading text-[24px] font-semibold">
                     Verify your email
                  </Heading>
                  <p className="text-sm text-muted my-0">Verify your email to continue using InSpace.</p>
                  <p className="text-base text-body mb-0">
                     Someone has signed up for an InSpace account with this email address. If you did not initiate this request, please ignore this
                     email.
                  </p>
                  <Heading as="h2" className="text-heading my-4 text-base font-semibold">
                     Your verification code is:
                  </Heading>
                  <Row>
                     <Column className="bg-surface-100 border-[1px] border-solid rounded-md text-center text-heading text-2xl font-bold border-primary-400 outline-3 tracking-widest [outline-style:solid] outline-primary-500/30 px-3 py-4">
                        12345
                     </Column>
                  </Row>
                  <Button href="/" className="bg-white text-surface-50 font-semibold block text-center mt-4 px-4 py-2 rounded-md">
                     Verify email
                  </Button>
               </Container>
               <Container className="bg-surface-200 max-w-md border-[1px] border-solid px-5 py-3 border-surface-400 rounded-b-xl">
                  <p className="text-sm text-muted text-center my-0">This email was sent by InSpace.</p>
               </Container>
            </Body>
         </Html>
      </Tailwind>
   );
}
