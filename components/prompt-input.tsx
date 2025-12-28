"use client";

import { InputGroup } from "./ui/input-group";

interface PropsType{
    promptText: string;
    setPromptText: (text: string) => void;
    isLoading: boolean;
    onSubmit?: () => void;
    className?: string;
    hideSubmitBtn?:boolean
}

const PromptInput = ({
    promptText,setPromptText,isLoading,className,hideSubmitBtn,onSubmit
}:PropsType) => {
    return (
        <div className="bg-background">
            <InputGroup className={cn("min-h-[172px] bg-background rounded-3xl",className&&className)}></InputGroup>
        </div>

        )
    }

    export default PromptInput;