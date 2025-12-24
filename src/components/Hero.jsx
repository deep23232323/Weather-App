import React, { useState } from "react";
import LiquidEther from "./LiquidEther";
import { LiaCloudSolid } from "react-icons/lia";
import { FaArrowDownLong } from "react-icons/fa6";
import LocationAccess from "./Navigation";
import Navigation from "./Navigation";
import Lottie from "lottie-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { WiDaySunny } from "react-icons/wi";
import WeatherVideo from "./WatherVideo";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [langitude, setLangitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [clouds, setClouds] = useState(" ");
  const [humidity, setHumidity] = useState(" ");
  const [windSpeed, setWindSpeed] = useState(" ");
  const [pressure, setPressure] = useState(" ");
  const [visibility, setVisibility] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [ heatIndex,setHeatIndex] = useState(null)
  const [code, setCode] = useState(null);

 const area = async (lat, lon) => {
  console.log("Latitude:", lat);
  console.log("Longitude:", lon);

  setLangitude(lat);
  setLongitude(lon);

  try {
    setError("");

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${geoapi}`
    );

    const data = await res.json();
    console.log("Geoapify data:", data);
    setCity(data.results[0].city);
  } catch (error) {
    console.error("Error fetching geocode:", error);
  }
};


  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY; 
  const geoapi = import.meta.env.VITE_GEOAPIKEY;

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setLoading2(true);
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      console.log(data.current);
      setHumidity(data.current.humidity);
      setPressure(data.current.pressure_mb);
      setVisibility(data.current.is_day);
      setWindSpeed(data.current.wind_kph);
      setClouds(data.current.cloud);
      setCode(data.current.condition.code);
      setHeatIndex(data.current.heatindex_c)
      setLoading2(false);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setLoading2(false);
    }
  };

  const getCurrentLocation = () => {
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
        });
        setLoading(false);
        area(latitude, longitude);
        console.log(latitude,longitude);
      },
      
      // Error callback
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
          default:
            setError("An unknown error occurred.");
            break;
        }
        setLoading(false);
      },
      // Options
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 60000,
      }
    );
  }; 

  return (
    <div className="w-screen h-screen bg-amber-50 ">
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
       <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={23}
    cursorSize={55}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  />
      <div className="absolute top-20 md:top-0 w-screen h-screen flex justify-center items-center mt-10">
        <div className="md:w-[80%] md:h-[80%]  md:bg-white/80 md:rounded-4xl w-screen    flex flex-col justify-center items-center  ">
          <div className="w-full md:h-[50%] flex flex-col md:flex-row md:gap-6 gap-4">
            {/* Left Section - Search & Controls */}
            <div className="md:w-[70%] md:h-full h-auto min-h-[200px]  rounded-2xl p-4 md:p-6  transition-all duration-300 ">
              {/* Header */}
              <div className=" flex w-full h-auto md:h-[50%] justify-center items-center relative mb-4 md:mb-6">
                <div className="frijole-regular md:text-[50px] text-[40px] text-[#363949] drop-shadow-sm">
                  We<span className="text-[#F78C4D]">ather</span>{" "}
                  <span className="text-[#F78C4D]">A</span>pp
                </div>
                <div className="absolute -right-2 -top-2 md:-right-4 md:-top-2 animate-float">
                  <i className="fas fa-cloud text-[#F78C4D] text-3xl md:text-5xl transform -rotate-12"></i>
                </div>
              </div>

              {/* Search Section */}
              <div className="space-y-4">
                {/* Search Input & Location Button */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
                  <div className="relative w-full md:w-[60%] flex items-center justify-center">
                    <input
                      type="text"
                      placeholder="Search for city..."
                      className="frijole-regular w-[90%] relative top-7  h-[45px] md:h-[50px] border-2 border-gray-300 rounded-xl px-1 pr-12 focus:ring-2 outline-none focus:ring-[#F78C4D] bg-white text-gray-800 placeholder-gray-500 transition-all duration-300 focus:border-[#F78C4D] focus:scale-[1.02] text-sm md:text-base"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && getWeather()}
                    />
                    <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base"></i>
                  </div>

                  <button
                    className="frijole-regular w-[80%] relative top-10 md:top-7 md:w-[40%] h-[45px] md:h-[50px] bg-gradient-to-r from-[#363949] to-[#4a5568] rounded-xl cursor-pointer text-sm md:text-lg text-[#fab288] font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    onClick={getCurrentLocation}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin text-xs md:text-sm"></i>
                        <span className="text-xs md:text-base">
                          Getting Location...
                        </span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-location-arrow text-xs md:text-sm"></i>
                        <span className="text-xs md:text-base">
                          Current Location
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Check Weather Button */}
                <div className="flex justify-center pt-2 md:pt-0 relative top-5">
                  <button
                    className="frijole-regular z-10  group w-[90%] md:top-5 top-10 relative flex items-center justify-center gap-2 md:gap-3 h-12 md:h-14  md:w-[250px] bg-gradient-to-r from-[#F78C4D] to-[#ff9c5e] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer px-4 md:px-6"
                    onClick={() => getWeather()}
                    disabled={loading}
                  >
                    <span className="text-white font-semibold text-sm md:text-lg">
                      {loading2 ? "Checking Weather..." : "Check Weather"}
                    </span>
                    <span className="bg-white rounded-full p-1 md:p-2 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                      <i className="fas fa-arrow-down text-[#F78C4D] text-sm md:text-xl"></i>
                    </span>

                    {/* Animated Clouds */}
                    <div className="absolute -top-3 -right-4 md:-top-4 md:-right-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <i className="fas fa-cloud text-white text-2xl md:text-4xl transform -rotate-12 animate-pulse"></i>
                    </div>
                    <div className="absolute -bottom-1 -left-3 md:-bottom-2 md:-left-4 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                      <i className="fas fa-cloud text-white text-xl md:text-3xl transform rotate-12"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Weather Display */}
            <div className="md:w-[30%] md:h-full h-[250px] md:flex relative top-5 justify-center items-center">
              {weather && (
                <div className="w-full h-full  p-4 md:p-6   transition-all duration-300  flex flex-col justify-center items-center">
                  <div className="text-center animate-fadeIn flex flex-col justify-center items-center">
                    {/* Location */}
                    <h3 className="text-xl md:text-3xl frijole-regular text-[#363949] mb-2 md:mb-3">
                      {weather?.location.name}
                    </h3>

                    {/* Weather Icon */}
                    <div className="my-2 md:my-3 transform hover:scale-110 transition-transform duration-300">
                      <img
                        src={`https:${weather.current.condition.icon}`}
                        alt={weather.current.condition.text}
                        className="mx-auto w-12 h-12 md:w-16 md:h-16"
                      />
                    </div>

                    {/* Temperature */}
                    <h2 className="text-2xl md:text-3xl font-bold frijole-regular text-[#363949] mb-1 md:mb-2">
                      {weather.current.temp_c}°C
                    </h2>

                    {/* Condition */}
                    <p className="text-sm md:text-lg frijole-regular text-gray-600 capitalize">
                      {weather?.current.condition.text}
                    </p>
                    <p className="relative top-10 text-[18px] md:hidden">
                      Scroll the below bar to see the more info
                    </p>
                  </div>
                </div>
              )}
              {error && (
                <div className="w-full h-full  p-4 md:p-6   flex flex-col justify-center items-center">
                  <div className="text-center animate-shake">
                    <i className="fas fa-exclamation-triangle text-red-500 text-2xl md:text-3xl mb-2 md:mb-3"></i>
                    <div className="text-red-500 font-semibold text-sm md:text-lg px-2">
                      {error}
                    </div>
                  </div>
                </div>
              )}
              {!weather && !error && (
                <div className="w-full h-full  p-4 md:p-6   flex flex-col justify-center items-center">
                  <div className="text-center text-gray-500">
                    <i className="fas fa-cloud text-3xl md:text-4xl mb-2 md:mb-3 opacity-50"></i>
                    <p className="text-sm md:text-lg px-2">
                      Weather data will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full   md:h-[50%]  flex md:flex-row flex-col">
            <div className="md:w-[50%] md:h-full h-[200px] ">
              <div className="w-full md:flex justify-center hidden relative top-10 text-[18px]">
                <h1 className="frijole-regular">
                  Scroll below to see more info
                </h1>
              </div>
              <ScrollStack >
                  <ScrollStackItem itemClassName="bg-blue-500 backdrop-blur-sm">
                  <div className="w-full h-full flex  justify-center ">
                    <h2 className=" frijole-regular text-[20px]">
                       HEAT INDEX: {heatIndex} C
                    </h2>
                  </div>
                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-green-500 backdrop-blur-sm">
                  <div className="w-full h-full flex  justify-center ">
                    <h2 className=" frijole-regular text-[20px]">
                      WIND SPEED: {windSpeed} kph
                    </h2>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem itemClassName="bg-purple-500 backdrop-blur-sm">
                  <div className="w-full h-full flex  justify-center ">
                    <h1 className=" frijole-regular text-[20px]">
                      HUMIDITY: {humidity} %
                    </h1>
                  </div>
                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-yellow-500 backdrop-blur-sm">
                  <div className="w-full h-full flex  justify-center ">
                    <h1 className=" frijole-regular text-[20px]">
                      CLOUDS: {clouds} %
                    </h1>
                  </div>
                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-red-500 backdrop-blur-sm">
                  <div className="w-full h-full flex  justify-center ">
                    <h1 className=" frijole-regular text-[20px]">
                      PRESSURE: {pressure} mb
                    </h1>
                  </div>
                </ScrollStackItem>
              </ScrollStack>
            </div>
            <div className="flex justify-center items-center md:w-[50%] md:h-full h-[200px] ">
              {!code && (
                <div className="relative md:w-full md:h-[350px] md:flex hidden overflow-hidden rounded-2xl">
                  <video
                    src={"/videos/trial.mp4"}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              )}
              {code && (
                <WeatherVideo conditionCode={code} />

              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Hero;
