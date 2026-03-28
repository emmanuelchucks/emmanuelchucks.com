"use client";

import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from "react";
import { digitSymbols, separatorSymbols, symbols } from "./clock-data";
import tickWavUrl from "./tick.wav?url";

export default function ClockMadeOfClocks(): React.JSX.Element {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const { TickAudio, isMuted, playTick, muteTick, unmuteTick } = useTickSound();

  const playTickEvent = useEffectEvent(playTick);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      playTickEvent();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="grid place-content-center gap-y-2 [--size:3cqi] @xs:fixed @xs:inset-0 [@container(orientation:portrait)]:rotate-90 [@container(orientation:portrait)]:[--size:3cqb]">
      <p className="text-center text-lg">{currentTime.toLocaleTimeString()}</p>

      <div className="grid w-max grid-flow-col items-center">
        {getTimeParts(currentTime).map((part, i) => {
          const key = `${part}-${String(i)}`;

          if (isDigit(part)) {
            return <Digit key={key} digit={Number.parseInt(part, 10)} />;
          }

          return isSeparator(part) ? <Separator key={key} /> : null;
        })}
      </div>

      <div className="grid justify-center">
        <TickAudio />
        <MuteButton
          isMuted={isMuted}
          toggleMute={() => {
            if (isMuted) {
              unmuteTick();
            } else {
              muteTick();
            }
          }}
        />
      </div>
    </div>
  );
}

interface MuteButtonProps {
  isMuted: boolean;
  toggleMute: () => void;
}

function MuteButton({ isMuted, toggleMute }: MuteButtonProps) {
  return (
    <button
      type="button"
      data-muted={isMuted ? "true" : undefined}
      onClick={() => {
        toggleMute();
      }}
      className="group grid size-8 place-content-center overflow-clip rounded-full border bg-neutral-100 outline-offset-4 outline-neutral-900 dark:bg-neutral-900 dark:outline-neutral-100"
    >
      <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
      <span aria-hidden="true" className="[grid-area:1/1]">
        ♫
      </span>
      <span className="hidden scale-150 rotate-12 [grid-area:1/1] group-data-muted:block">/</span>
    </button>
  );
}

function isSeparator(char: string) {
  return /:/.exec(char);
}

function getSeparatorTransforms() {
  return separatorSymbols.map((symbol, index) => ({
    id: `separator-${String(index)}`,
    transform: symbols[symbol],
  }));
}

function Separator() {
  return (
    <div className="grid grid-cols-2 grid-rows-4">
      <MiniClock transforms={getSeparatorTransforms()} />
    </div>
  );
}

function isDigit(char: string) {
  return /\d/.exec(char);
}

function getDigitTransforms(digit: number) {
  return digitSymbols[digit].map((symbol, index) => ({
    id: `${String(digit)}-${String(index)}`,
    transform: symbols[symbol],
  }));
}

interface DigitProps {
  digit: number;
}

function Digit({ digit }: DigitProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-6">
      <MiniClock transforms={getDigitTransforms(digit)} />
    </div>
  );
}

interface MiniClockProps {
  transforms: readonly {
    id: string;
    transform: Readonly<[number, number]>;
  }[];
}

function MiniClock({ transforms }: MiniClockProps) {
  return transforms.map(({ id, transform }) => (
    <div
      key={id}
      className="grid size-(--size) justify-center rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
    >
      <ClockHands transform={transform} />
    </div>
  ));
}

function ClockHands({ transform }: { transform: Readonly<[number, number]> }) {
  const [startDegree, endDegree] = transform;
  const isNeutral = isNeutralTransform(transform);

  return (
    <>
      <ClockHand rotation={startDegree} isNeutral={isNeutral} />
      <ClockHand rotation={endDegree} isNeutral={isNeutral} />
    </>
  );
}

interface ClockHandProps {
  rotation: number;
  isNeutral: boolean;
}

function ClockHand({ rotation, isNeutral }: ClockHandProps) {
  return (
    <div
      data-neutral={isNeutral ? "true" : undefined}
      style={{ rotate: `${String(rotation)}deg` }}
      className="h-1/2 w-[calc(var(--size)/16)] origin-[center_bottom] rounded-2xl bg-neutral-900 [grid-area:1/1] data-neutral:bg-neutral-200 dark:bg-neutral-100 dark:data-neutral:bg-neutral-800"
    />
  );
}

function isNeutralTransform(transform: Readonly<[number, number]>) {
  return transform[0] === 210 && transform[1] === 210;
}

function getTimeParts(date: Date) {
  return (
    date
      .toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replaceAll(/[^\d:]/g, "")
      .match(/./gu) ?? []
  );
}

function useTickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const isVisible = useWindowVisibility();

  const TickAudio = () => (
    <audio ref={audioRef} src={tickWavUrl}>
      <track kind="captions" />
    </audio>
  );

  const playTick = () => {
    if (!audioRef.current) {
      throw new Error("Audio element not found");
    }

    if (!isMuted && isVisible) {
      void audioRef.current.play();
    }
  };

  const muteTick = () => {
    setIsMuted(true);
  };

  const unmuteTick = () => {
    setIsMuted(false);
  };

  return {
    TickAudio,
    playTick,
    muteTick,
    unmuteTick,
    isMuted,
  };
}

function useWindowVisibility() {
  const visibilityState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return visibilityState === "visible";
}

function subscribe(callback: () => void) {
  globalThis.document.addEventListener("visibilitychange", callback);
  return () => {
    globalThis.document.removeEventListener("visibilitychange", callback);
  };
}

function getSnapshot() {
  return globalThis.document.visibilityState;
}

function getServerSnapshot() {
  return "visible";
}
