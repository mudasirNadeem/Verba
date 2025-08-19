import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import { FaDatabase } from "react-icons/fa";
import { FaDocker } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { GrConnect } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";
import { FaBackspace } from "react-icons/fa";
import { HiMiniSparkles } from "react-icons/hi2";
import { TbDatabaseEdit } from "react-icons/tb";

import { connectToBEORRI } from "@/app/api";

import BEORRIButton from "../Navigation/BEORRIButton";

import { Credentials, RAGConfig, Theme, Themes } from "@/app/types";

let prefix = "";
if (process.env.NODE_ENV === "production") {
  prefix = "/static";
} else {
  prefix = "";
}

interface LoginViewProps {
  credentials: Credentials;
  setCredentials: (c: Credentials) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setRAGConfig: (RAGConfig: RAGConfig | null) => void;
  setSelectedTheme: (theme: Theme) => void;
  setThemes: (themes: Themes) => void;
  production: "Local" | "Demo" | "Production";
}

const LoginView: React.FC<LoginViewProps> = ({
  credentials,
  setCredentials,
  setSelectedTheme,
  setThemes,
  setIsLoggedIn,
  production,
  setRAGConfig,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [isConnecting, setIsConnecting] = useState(false);

  const [selectStage, setSelectStage] = useState(true);

  const [errorText, setErrorText] = useState("");

  const [selectedDeployment, setSelectedDeployment] = useState<
    "Weaviate" | "Docker" | "Local" | "Custom"
  >("Local");

  const [weaviateURL, setWeaviateURL] = useState(credentials.url);
  const [weaviateAPIKey, setWeaviateAPIKey] = useState(credentials.key);
  const [port, setPort] = useState("8080");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (credentials.default_deployment) {
      setSelectedDeployment(credentials.default_deployment);
      connect(credentials.default_deployment);
    }
  }, [credentials]);

  const connect = async (
    deployment: "Local" | "Weaviate" | "Docker" | "Custom"
  ) => {
    setErrorText("");
    setIsConnecting(true);
    const response = await connectToBEORRI(
      deployment,
      weaviateURL,
      weaviateAPIKey,
      port
    );
    if (response) {
      if (!("error" in response)) {
        setIsLoggedIn(false);
        setErrorText(JSON.stringify(response));
      } else if (response.connected == false) {
        setIsLoggedIn(false);
        setErrorText(
          response.error == "" ? "Couldn't connect to Weaviate" : response.error
        );
      } else {
        setIsLoggedIn(true);
        setCredentials({
          deployment: deployment,
          key: weaviateAPIKey,
          url: weaviateURL,
          default_deployment: credentials.default_deployment,
        });
        setRAGConfig(response.rag_config);
        if (response.themes) {
          setThemes(response.themes);
        }
        if (response.theme) {
          setSelectedTheme(response.theme);
        }
      }
    }
    setIsConnecting(false);
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div
        className={`flex w-full h-full transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 h-full items-center justify-center bg-gray-50">
          <Image 
            src="/new-logo.png" 
            alt="Logo" 
            width={400}
            height={400}
            className="max-w-md max-h-md object-contain"
          />
        </div>
        <div className="w-full md:flex md:w-1/2 lg:w-2/5 h-full flex justify-center items-center p-5">
          <div className="flex flex-col gap-8 items-center md:items-start justify-center w-4/5">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3">
                <p className="font-light text-3xl md:text-4xl font-subtitle text-text-alt-verba">
                  Welcome to Oxtari
                </p>
                {/* <p className="font-light text-3xl md:text-4xl text-text-verba">
                  BEORRI
                </p> */}
              </div>
              {production == "Local" && (
                <p className="text-text-verba text-base lg:text-lg ">
                 Choose your deployment 
                </p>
              )}
            </div>
            {selectStage ? (
              <div className="flex flex-col justify-start gap-4 w-full">
                {production == "Local" && (
                  <div className="flex flex-col justify-start gap-2 w-full">
                    <BEORRIButton
                      Icon={FaDatabase}
                      title="Weaviate"
                      disabled={isConnecting}
                      onClick={() => {
                        setSelectStage(false);
                        setSelectedDeployment("Weaviate");
                      }}
                    />
                    <BEORRIButton
                      title="Docker"
                      Icon={FaDocker}
                      disabled={isConnecting}
                      onClick={() => {
                        setSelectedDeployment("Docker");
                        connect("Docker");
                      }}
                      loading={isConnecting && selectedDeployment == "Docker"}
                    />
                    <BEORRIButton
                      title="Custom"
                      Icon={TbDatabaseEdit}
                      disabled={isConnecting}
                      onClick={() => {
                        setSelectedDeployment("Custom");
                        setSelectStage(false);
                      }}
                      loading={isConnecting && selectedDeployment == "Custom"}
                    />
                    <BEORRIButton
                      title="Local"
                      Icon={FaLaptopCode}
                      disabled={isConnecting}
                      onClick={() => {
                        setSelectedDeployment("Local");
                        connect("Local");
                      }}
                      loading={isConnecting && selectedDeployment == "Local"}
                    />
                  </div>
                )}
                {production == "Demo" && (
                  <div className="flex flex-col justify-start gap-4 w-full">
                    <BEORRIButton
                      Icon={HiMiniSparkles}
                      title="Start Demo"
                      disabled={isConnecting}
                      onClick={() => {
                        setSelectedDeployment("Weaviate");
                        connect("Weaviate");
                      }}
                      loading={isConnecting && selectedDeployment == "Weaviate"}
                    />
                  </div>
                )}
                {production == "Production" && (
                  <div className="flex flex-col justify-start gap-4 w-full">
                    <BEORRIButton
                      Icon={HiMiniSparkles}
                      title="Start Application" // Changed from "Start Verba"
                      onClick={() => {
                        setSelectStage(false);
                        setSelectedDeployment("Weaviate");
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-start gap-4 w-full">
                {production != "Demo" && (
                  <div className="flex flex-col justify-start gap-4 w-full">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        connect(selectedDeployment);
                      }}
                    >
                      <div className="flex gap-2 items-center justify-between">
                        <label className="input flex items-center gap-2 border-none shadow-md w-full bg-bg-verba">
                          <FaDatabase className="text-text-alt-verba" />
                          <input
                            type="text"
                            name="username"
                            value={weaviateURL}
                            onChange={(e) => setWeaviateURL(e.target.value)}
                            placeholder="Weaviate URL"
                            className="grow bg-button-verba text-text-alt-verba hover:text-text-verba w-full"
                            autoComplete="username"
                          />
                        </label>
                        {selectedDeployment == "Custom" && (
                          <label className="input flex items-center gap-2 border-none shadow-md bg-bg-verba">
                            <p className="text-text-alt-verba text-xs">Port</p>
                            <input
                              type="text"
                              name="Port"
                              value={port}
                              onChange={(e) => setPort(e.target.value)}
                              placeholder="Port"
                              className="grow bg-button-verba text-text-alt-verba hover:text-text-verba w-full"
                              autoComplete="port"
                            />
                          </label>
                        )}
                      </div>

                      <label className="input flex items-center gap-2 border-none shadow-md bg-bg-verba mt-4">
                        <FaKey className="text-text-alt-verba" />
                        <input
                          type="password"
                          name="current-password"
                          value={weaviateAPIKey}
                          onChange={(e) => setWeaviateAPIKey(e.target.value)}
                          placeholder="API Key"
                          className="grow bg-button-verba text-text-alt-verba hover:text-text-verba w-full"
                          autoComplete="current-password"
                        />
                      </label>
                      <div className="flex justify-between gap-4 mt-4">
                        <div className="flex flex-col w-full gap-2">
                          <div className="flex flex-col justify-start gap-2 w-full">
                            <BEORRIButton
                              Icon={GrConnect}
                              title="Connect to Weaviate"
                              type="submit"
                              selected={true}
                              selected_color="bg-[#023eba]"
                              selected_text_color="text-white"
                              loading={isConnecting}
                            />
                            {selectedDeployment == "Weaviate" && (
                              <BEORRIButton
                                Icon={CgWebsite}
                                title="Register"
                                type="button"
                                disabled={isConnecting}
                                onClick={() =>
                                  window.open(
                                    "https://console.weaviate.cloud",
                                    "_blank"
                                  )
                                }
                              />
                            )}
                            <BEORRIButton
                              Icon={FaBackspace}
                              title="Back"
                              type="button"
                              text_size="text-xs"
                              icon_size={12}
                              onClick={() => setSelectStage(true)}
                              disabled={isConnecting}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
            {errorText && (
              <div className="bg-warning-verba p-4 rounded w-full h-full overflow-auto">
                <p className="flex w-full h-full whitespace-pre-wrap">
                  {errorText}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
