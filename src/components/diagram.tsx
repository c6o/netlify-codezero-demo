import { FC, forwardRef, useEffect, useRef, useState } from "react";
import { AppWindowIcon, CloudCogIcon } from "lucide-react";
import { AnimatedBeam } from "./ui/animated-beam";
import { useAnimationControls } from "framer-motion";

const ServiceNode = forwardRef<HTMLDivElement, { label: string }>(
  ({ label }, ref) => {
    return (
      <div
        className="flex items-center space-x-1 bg-white text-xl p-2 m-2 rounded-lg drop-shadow"
        ref={ref}
      >
        <CloudCogIcon />
        <div>{label}</div>
      </div>
    );
  }
);

async function getServiceAOutput() {
  try {
    const request = new Request("/service-a", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "text/plain",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const response = await fetch(request);
    return (response.status !== 200 ? "error: " : "") + (await response.text());
  } catch (e: unknown) {
    if (e instanceof Error) return `Error: ${e.message}`;
    return "Unknown Error";
  }
}

export interface DiagramProps {
  onOutputChanged?: (output: string) => void;
}

const Diagram: FC<DiagramProps> = ({}) => {
  const [output, setOutput] = useState("");
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const update = async () => {
      const outputReq = getServiceAOutput();

      await browserControls.start("forward");
      await Promise.all([
        serviceAControls.start("forward"),
        serviceBControls.start("forward"),
      ]);

      await Promise.all([
        serviceAControls.start("reverse"),
        serviceBControls.start("reverse"),
      ]);
      await browserControls.start("reverse");

      const output = await outputReq;
      setOutput(output);
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);

      setTimeout(update, 1000);
    };
    update();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const serviceARef = useRef<HTMLDivElement>(null);
  const serviceBRef = useRef<HTMLDivElement>(null);
  const serviceCRef = useRef<HTMLDivElement>(null);
  const serviceBVariantRef = useRef<HTMLDivElement>(null);
  const browserControls = useAnimationControls();
  const serviceAControls = useAnimationControls();
  const serviceBControls = useAnimationControls();

  return (
    <div className="relative flex flex-col gap-10" ref={containerRef}>
      <AnimatedBeam
        duration={1}
        containerRef={containerRef}
        fromRef={browserRef}
        toRef={serviceARef}
        animate={browserControls}
        variants={{
          forward: {
            y1: ["20%", "100%"],
            y2: ["10%", "90%"],
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
          },
          reverse: {
            y1: ["100%", "20%"],
            y2: ["90%", "10%"],
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
          },
        }}
        startPosition="bottom"
        endPosition="top"
      />
      <AnimatedBeam
        duration={1}
        containerRef={containerRef}
        fromRef={serviceARef}
        toRef={serviceBRef}
        animate={serviceAControls}
        variants={{
          forward: {
            x1: ["20%", "110%"],
            x2: ["10%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          },
          reverse: {
            x1: ["110%", "20%"],
            x2: ["100%", "10%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          },
        }}
        startPosition="right"
        endPosition="left"
      />
      <AnimatedBeam
        duration={1}
        containerRef={containerRef}
        fromRef={serviceBRef}
        toRef={serviceCRef}
        animate={serviceBControls}
        variants={{
          forward: {
            x1: ["20%", "110%"],
            x2: ["10%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          },
          reverse: {
            x1: ["110%", "20%"],
            x2: ["100%", "10%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          },
        }}
        startPosition="right"
        endPosition="left"
      />

      <div className="flex flex-row">
        <div
          className="flex flex-col space-y-2 bg-white p-2 rounded-lg drop-shadow"
          ref={browserRef}
        >
          <div className="flex flex-row items-center space-x-2 text-xl">
            <AppWindowIcon />
            <div>Browser</div>
          </div>
          <div className="font-bold">Response:</div>
          <pre className={`text-primary ${isPulsing ? "pulse" : ""}`}>
            {output}
          </pre>
        </div>
      </div>
      <div className="text-center bg-slate-200 bg-opacity-25 text-xs p-2 rounded-lg drop-shadow">
        <div className="text-xl">Teamspace</div>
        <div className="flex flex-row gap-10 pt-10">
          <ServiceNode label="Service A" ref={serviceARef} />
          <ServiceNode label="Service B" ref={serviceBRef} />
          <ServiceNode label="Service C" ref={serviceCRef} />
        </div>
      </div>
    </div>
  );
};

export { Diagram };
