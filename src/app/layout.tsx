"use client";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ProvidersWrapper } from "../providers";
import { ModalsProvider } from "@mantine/modals";
import { YMaps } from "@pbe/react-yandex-maps";
import Chatbot from "react-chatbotify";
import { use, useState } from "react";

const yandexApiKey = "650c5309-d7b5-4e13-8e07-4a5a9d727eb8";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [form, setForm] = useState({});

  const flow = {
    start: {
      message: "Hello! My name is FH-2, I am a chatbot. What is your name?",
      function: (params) => setForm((prevForm) => ({ ...prevForm, name: params.userInput })),
      path: 'greetings'
    },
    greetings: {
      message: (params) => `Nice to meet you ${params.userInput}! How can I help you today? Please type your question in detail.`,
      function: (params) => {
        setForm((prevForm) => ({ ...prevForm, question: params.userInput }));
        return 'supporting';
      },
      path: 'supporting'
    },
    supporting: {
      message: (params) => {
        const userInput = params.userInput.toLowerCase();
        if (userInput.includes('support')) {
          return "Support page: Basically, you can find all the information you need here. Also, if you did not find your answer, you can directly send a message from there. What else can I help you with?";
        } else if (userInput.includes('posts')) {
          return 'Posts page: Here you can view and manage all your posts. What else can I help you with?';
        } else if (userInput.includes('menu')) {
          return 'Menu page: Here you can see our menu options and explore our offerings. What else can I help you with?';
        } else if (userInput.includes('subscription')) {
          return 'Subscription page: Here you can manage your subscription settings, including updates and cancellations. What else can I help you with?';
        } else if (userInput.includes('badge')) {
          return 'Badge page: Here you can view and manage your badges, including achievements and awards. What else can I help you with?';
        } else {
          return 'Sorry, I did not understand. Please try again later or message your question directly to us on the support page located in the menu. What else can I help you with?';
        }
      },
      path: 'end',
    },
    end: {
      message: 'Thank you for chatting with me today! If you have any other questions, feel free to ask me anytime. Have a great day!',
      function: () => setForm({}),
      path: 'greetings'
    }
  }
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ProvidersWrapper>
          <YMaps query={{ load: "package.full", apikey: yandexApiKey }}>
            <MantineProvider>
              <ModalsProvider>
                <Notifications position="top-center" zIndex={1000} />
                {children}
                <Chatbot
                 flow={flow}
                 options={{
                  theme: {
                    primaryColor: "#729762",
                    secondaryColor: "#597445"
                  },
                  header: {
                    title: "FoodHub chatbot 🤖",
                    showAvatar: false,
                  },
                  chatHistory: {
                    disabled: true,
                  },
                  audio: {
                    disabled: true,
                  },
                  chatButton: {
                    icon: 'https://i.pinimg.com/564x/36/1b/9e/361b9ed9c5e0a209bce2e92b72a35105.jpg',
                    // icon: 'https://i.pinimg.com/564x/39/b2/8b/39b28b2b0ab494752cc33d56f888e4d4.jpg'
                  },
                  tooltip: {
                    text: 'Click here to start chatting with the chatbot.'
                  },
                  notification: {
                    disabled: true,
                    sound: "none",
                    showCount: false,
                  },
                  footer: {
                    text: "Powered by FoodHub",
                  },
                 }}
                  />
              </ModalsProvider>
            </MantineProvider>
          </YMaps>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
