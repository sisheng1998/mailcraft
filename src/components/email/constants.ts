export const HOME_PAGE_CODE = `
import React from "react"
import {
  Body,
  Column,
  Container,
  Font,
  FontProps,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

const BASE_URL = "https://mailcraft.sisheng.my"

const FONT: FontProps["fontFamily"] = "Plus Jakarta Sans"
const FALLBACK_FONT: FontProps["fallbackFontFamily"] = "Verdana"

// https://stackoverflow.com/a/76670730
const WEB_FONT: FontProps["webFont"] = {
  url: "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_vb.woff2",
  format: "woff2",
}

const Home = () => (
  <Html>
    <Tailwind>
      <Head>
        {[400, 700].map((fontWeight, index) => (
          <Font
            key={index}
            fontFamily={FONT}
            fallbackFontFamily={FALLBACK_FONT}
            webFont={WEB_FONT}
            fontWeight={fontWeight}
          />
        ))}
      </Head>

      <Preview>Welcome to Mailcraft - Build & Preview Emails Online</Preview>

      <Body className="m-0 bg-zinc-100 p-6">
        <Container className="mb-5 px-8">
          <Row className="mx-auto w-0">
            <Column className="pr-2.5">
              <Img
                src={\`\${BASE_URL}/logo.png\`}
                width="28"
                height="28"
                alt="Logo"
                className="block"
              />
            </Column>

            <Column className="w-full">
              <Text className="m-0 text-lg font-bold text-zinc-900">
                Mailcraft
              </Text>
            </Column>
          </Row>

          <Text className="!mb-0 !mt-1 text-center text-zinc-500">
            Build & Preview Emails Online
          </Text>
        </Container>

        <Container className="rounded-md border border-solid border-zinc-200 bg-white px-8 py-7 shadow-md">
          <Heading className="mb-4 mt-0 text-xl text-zinc-900">
            Welcome to Mailcraft!
          </Heading>

          <Text className="m-0 text-zinc-600">
            An advanced online code editor designed specifically for building
            and previewing email templates with ease, seamless integration with:
          </Text>

          <Section className="mb-2.5 mt-4">
            {[
              "React Email Components",
              "Tailwind CSS Support",
              "Live Code Preview",
            ].map((text, index) => (
              <Row key={index} className="mb-2.5">
                <Column className="pr-2.5">
                  <Img
                    src={\`\${BASE_URL}/images/circle-check.png\`}
                    width="20"
                    height="20"
                    alt="Check"
                    className="block"
                  />
                </Column>

                <Column className="w-full">
                  <Text className="m-0 font-bold text-zinc-900">{text}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Text className="m-0 text-zinc-600">
            Whether learning React Email, prototyping a creative idea, or
            crafting polished email templates, Mailcraft has you covered.
          </Text>

          <Hr className="my-6 !border-zinc-200" />

          <Text className="m-0 text-zinc-600">Happy Mail Crafting!</Text>
          <Text className="m-0 text-zinc-600">- The Mailcraft Team</Text>
        </Container>

        <Container className="mt-6 px-8 text-center">
          <Text className="m-0 mb-3 text-xs text-zinc-500">
            This is an automated email. Please do not reply to this email.
          </Text>

          <Text className="m-0 text-xs text-zinc-400">
            Copyright © {new Date().getFullYear()} - Mailcraft
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default Home
`.trim()

export const NEW_EMAIL_CODE = `
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface GithubAccessTokenEmailProps {
  username?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? \`https://\${process.env.VERCEL_URL}\`
  : "";

export const GithubAccessTokenEmail = ({
  username,
}: GithubAccessTokenEmailProps) => (
  <Html>
    <Head />
    <Preview>
      A fine-grained personal access token has been added to your account
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={\`\${baseUrl}/static/github.png\`}
          width="32"
          height="32"
          alt="Github"
        />

        <Text style={title}>
          <strong>@{username}</strong>, a personal access was created on your
          account.
        </Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{username}</strong>!
          </Text>
          <Text style={text}>
            A fine-grained personal access token (<Link>resend</Link>) was
            recently added to your account.
          </Text>

          <Button style={button}>View your token</Button>
        </Section>
        <Text style={links}>
          <Link style={link}>Your security audit log</Link> ・{" "}
          <Link style={link}>Contact support</Link>
        </Text>

        <Text style={footer}>
          GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
        </Text>
      </Container>
    </Body>
  </Html>
);

GithubAccessTokenEmail.PreviewProps = {
  username: "alanturing",
} as GithubAccessTokenEmailProps;

export default GithubAccessTokenEmail;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
`.trim()
