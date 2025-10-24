import { Brain, Target, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Psychology Works",
    description:
      "Negative feedback sticks. When something hurts, you remember it. Our AI roasts are designed to be memorable so you actually fix the issues.",
    stat: "87% remember harsh feedback vs 34% for positive",
  },
  {
    icon: Target,
    title: "Brutal = Honest",
    description:
      "Recruiters won't sugar-coat why they rejected you. We prepare you for reality by being just as harsh (but constructive) as they would be.",
    stat: "Most resumes get 6 seconds of attention",
  },
  {
    icon: TrendingUp,
    title: "Results Speak",
    description:
      "Users who get roasted and apply our suggestions see 3x more interview callbacks. Sometimes the truth hurts, but it works.",
    stat: "3x more interviews after roasting",
  },
];

export const WhyRoasting = () => {
  return (
    <section className="py-24 px-4 bg-stone-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Why Roasting Actually Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Science-backed reasons why brutal honesty beats empty compliments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="relative group bg-stone-850 border border-gray-700 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-400 mb-4">
                  {benefit.description}
                </p>

                {/* Stat */}
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm font-mono text-red-500 font-bold">
                    {benefit.stat}
                  </p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 
                via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};
