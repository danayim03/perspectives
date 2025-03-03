
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSend: () => void;
  isConnected: boolean;
  chatEnded: boolean;
  isRematching: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onFocus: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  handleSend,
  isConnected,
  chatEnded,
  isRematching,
  inputRef,
  onFocus
}) => {
  // Prevent keyboard caused layout shifts
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      // Apply this only for iOS devices
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        // Capture the scroll position before focus
        const handleFocusIn = () => {
          // Let the parent component handle the focus logic
          onFocus();
        };
        
        input.addEventListener('focusin', handleFocusIn);
        return () => {
          input.removeEventListener('focusin', handleFocusIn);
        };
      }
    }
  }, [inputRef, onFocus]);

  return (
    <div className="p-2 sm:p-3 md:p-4 border-t sticky bottom-0 bg-white/95 backdrop-blur-sm chat-input-container z-10">
      <div className="flex gap-1 sm:gap-2">
        <Input
          ref={inputRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={
            chatEnded 
              ? "This chat has ended" 
              : isRematching
                ? "Finding a new match..."
                : isConnected 
                  ? "Type a message..." 
                  : "Connecting..."
          }
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          onFocus={onFocus}
          className="flex-1 bg-white/50 text-xs sm:text-sm h-8 sm:h-10"
          disabled={!isConnected || chatEnded || isRematching}
        />
        <Button
          onClick={handleSend}
          disabled={!newMessage.trim() || !isConnected || chatEnded || isRematching}
          className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 sm:px-3 sm:py-2"
          size="sm"
        >
          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  );
};
