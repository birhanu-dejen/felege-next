"use client";
import React from "react";
import Link from "next/link";
import Head from "next/head";

export default function PlaceholderPage({
  title = "Under Construction!",
  message = "Hey devs, don't pass! This page is under construction.",
  instructionMessage = "Instead, help us by reading the README.md and CONTRIBUTING.md files to get started!",
}: {
  title?: string;
  message?: string;
  instructionMessage?: string;
}) {
  const funEmojis = [
    "🚧",
    "👷",
    "🔨",
    "🛠️",
    "⚙️",
    "🧰",
    "📐",
    "💻",
    "🤖",
    "👨‍💻",
    "👩‍💻",
  ];

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            const emoji =
              funEmojis[Math.floor(Math.random() * funEmojis.length)];
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            const left = Math.random() * 100;
            const animationName = Math.random() > 0.5 ? "bounce" : "float";

            return (
              <div
                key={i}
                className="absolute text-4xl opacity-20"
                style={{
                  left: `${left}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${size}rem`,
                  animation: `${animationName} ${duration}s ease-in-out ${delay}s infinite`,
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="animate__animated animate__swing animate__infinite mb-8 text-6xl">
            🔨
          </div>

          <h1 className="text-5xl font-extrabold mb-6 text-white animate__animated animate__bounce animate__infinite">
            {title}
          </h1>

          <p className="text-xl mb-6 text-white animate__animated animate__fadeInLeft">
            <span
              className="typing-animation"
              style={{ animation: "typing 3.5s steps(40, end)" }}
            >
              {message}
            </span>
          </p>

          <p className="text-lg mb-8 text-white animate__animated animate__rotateIn animate__delay-1s">
            {instructionMessage}
          </p>

          <Link
            href="/CONTRIBUTING.md"
            className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 animate__animated animate__pulse animate__infinite"
          >
            Start Contributing
          </Link>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-100px) rotate(10deg);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateX(0) translateY(0) rotate(0deg);
            }
            25% {
              transform: translateX(-50px) translateY(-20px) rotate(5deg);
            }
            50% {
              transform: translateX(50px) translateY(-50px) rotate(-5deg);
            }
            75% {
              transform: translateX(-30px) translateY(-30px) rotate(5deg);
            }
          }

          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          .typing-animation {
            overflow: hidden;
            white-space: nowrap;
            display: inline-block;
          }
        `}</style>
      </div>
    </>
  );
}
