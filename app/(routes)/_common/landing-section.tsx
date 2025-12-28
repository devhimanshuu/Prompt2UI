import { useState } from "react";
import PromptInput from "@/components/prompt-input";
const LandingSection = () => {
  const [promptText, setPromptText] = useState<string>("");
    <div className="w-full min-h-screen">
    <div className="flex flex-col">
        {/* <Header/> */}
        <div className="relative overflow-hidden pt-28">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
              <div className="space-y-3">
                <h1 className="text-center font-semibold text-4xl tracking-tight sm:text-5xl">Design Mobile Apps Faster with <span className="text-primary">AI</span></h1>
              <p className="mx-auto max-w-2xl text-center font-medium text-foreground leading-relaxed sm:text-lg">Our AI-powered design tool helps you create mobile app designs faster and easier than ever before.</p>
              </div>
              <div className="flex w-full max-w-3xl flex-col item-center gap-8 relative z-50">
                <div className="w-full">
                  <PromptInput className="ring-2 ring-primary rounded-3xl" promptText={promptText} setPromptText={setPromptText} isLoading={isLoading} onSubmit={onSubmit}/>
                </div>
              </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default LandingSection