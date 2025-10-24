
import { Flame, Zap, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden
     px-4 py-20 bg-stone-900">
      {/* Rich Burgundy Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(220, 38, 38, 0.2) 0%, 
          rgba(220, 38, 38, 0.12) 25%, 
          rgba(220, 38, 38, 0.06) 35%, 
          transparent 50%
        )
      `,
      backgroundSize: "100% 100%",
    }}
  />

      {/* Animated background with enhanced gradients */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent" />
       */}
      {/* Floating elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20">🔥</div>
      <div className="absolute top-40 right-20 text-5xl opacity-20">💀</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-20">💼</div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Flame icon with glow */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Flame className="w-24 h-24 text-red-500 drop-shadow-lg" />
            <div className="absolute inset-0 blur-xl bg-red-500/30" />
          </div>
        </div>

        {/* Main heading with enhanced styling */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
          <span className="text-red-500 drop-shadow-lg">
            Brutally Honest
          </span>
          <br />
          <span className="text-white">Resume Roast</span>
        </h1>

        {/* Enhanced subheading */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-bold text-white">
            Stop Getting Ghosted. Start Getting Hired.
          </p>
          <p className="text-lg md:text-xl text-gray-400">
            AI-powered feedback that's savage but spot-on 💀
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-red-500/50 transition-all hover:scale-105">
            <Zap className="w-5 h-5 text-red-500" />
            <span className="text-white">30-Second Analysis</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-red-500/50 transition-all hover:scale-105">
            <Target className="w-5 h-5 text-red-500" />
            <span className="text-white">Actionable Insights</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-red-500/50 transition-all hover:scale-105">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <span className="text-white">Career-Changing</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12">
          <button
            className="bg-gradient-to-r from-red-500 to-red-600
             text-white font-bold text-xl px-10 py-4 rounded-lg hover:scale-105 transition-transform shadow-2xl hover:shadow-red-500/25"
            onClick={() => navigate("/roast")}
          >
            <Flame className="mr-2 h-6 w-6 inline" />
            Roast My Resume Now 🔥
          </button>
          
          <button
            className="bg-gray-800 text-white font-bold text-lg px-10 py-4  rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => navigate("/roast")}
          >
            No… I'm too scared 😬
          </button>
        </div>

        {/* Enhanced social proof */}
        <div className="pt-16">
          <p className="text-sm text-gray-400/60 uppercase tracking-wider mb-6">
            Trusted by job seekers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-2 group hover:scale-110 transition-transform">
              <span className="text-4xl group-hover:animate-bounce">🔥</span>
              <span className="text-2xl font-black text-red-500">10,000+</span>
              <span className="text-sm text-gray-400">Resumes Roasted</span>
            </div>
            <div className="flex flex-col items-center gap-2 group hover:scale-110 transition-transform">
              <span className="text-4xl group-hover:animate-bounce">💼</span>
              <span className="text-2xl font-black text-red-500">2,000+</span>
              <span className="text-sm text-gray-400">Jobs Landed</span>
            </div>
            <div className="flex flex-col items-center gap-2 group hover:scale-110 transition-transform">
              <span className="text-4xl group-hover:animate-bounce">⭐</span>
              <span className="text-2xl font-black text-red-500">4.9/5</span>
              <span className="text-sm text-gray-400">Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
