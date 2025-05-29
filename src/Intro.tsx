import Page from "./components/page";

export default function Intro() {
  return (
    <Page title="Welcome to the Demo of the Codezero Zero Trust Extension">
      <p>
        This page demonstrates how the Codezero Zero Trust Extension can access
        services running in a Codezero Teamspace. It shows how to connect to
        services that are not publicly accessible, allowing you to securely
        interact with them from your Netlify site.
      </p>
      <p>
        Let’s break it down. The browser starts by making a request to Service
        A. Service A then reaches out to Service B. Next, Service B calls
        Service C. Each service plays a role. Service C generates a random
        string. Service B trims that string to 20 characters. Finally, Service A
        capitalizes the result and sends it back to the browser.
      </p>
      <p>
        Under the hood, this site is deployed to Netlify which uses the Codezero
        Zero Trust Extension to forward requests from{" "}
        <a href="/service-a">/service-a</a> to Service A in the Teamspace.
        Services B and C are not exposed to the public internet.
      </p>
      <p>
        Meanwhile, the browser keeps things fresh. It displays the latest
        response from Service A and checks for updates every three seconds.
      </p>
      <p>
        If you want to see how the Codezero Zero Trust Extension works, have a
        look at{" "}
        <a href="https://app.netlify.com/extensions/codezero">Extension</a> as
        well as the{" "}
        <a href="https://github.com/c6o/netlify-codezero-demo">
          source code that powers this demo
        </a>
        .
      </p>
      <p>
        If you want to see how to work with Codezero to serve local variants of
        these services, check out the{" "}
        <a href="https://tutorial.codezero.dev">Codezero Tutorial</a>.
      </p>
    </Page>
  );
}
