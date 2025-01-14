import { ChatMessage as ChatMessageType } from "../types/advisor";
import { cn } from "@/lib/utils";
import { Copy, RotateCw, ThumbsUp, ThumbsDown, Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-toastify";
import { useState } from "react";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAdvisor = message.sender === "advisor";
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.content);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    toast.success("Сообщение скопировано");
  };

  const handleRegenerate = () => {
    toast.info("Регенерация ответа...");
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    toast.success(`${type === 'like' ? 'Положительный' : 'Отрицательный'} отзыв отправлен`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    message.content = editedMessage;
    setIsEditing(false);
    toast.success("Сообщение обновлено");
  };

  const ActionButton = ({ icon: Icon, tooltip, onClick }: { 
    icon: any, 
    tooltip: string, 
    onClick: () => void 
  }) => (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className="p-1.5 hover:bg-black/5 rounded-md transition-colors"
          >
            <Icon className="h-4 w-4 text-gray-500" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-message-fade-in group",
        isAdvisor ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[90%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 relative",
          isAdvisor
            ? "text-gray-900"
            : isEditing 
              ? "bg-transparent" 
              : "bg-[rgba(65,182,250,0.1)] text-gray-900"
        )}
      >
        <div className={`message ${message.sender}`}>  
          {isEditing ? (
            <div className="flex flex-col w-full max-w-[700px]">
              <Textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                className="flex-1 text-sm sm:text-base pr-12 h-24 pt-2 resize-none rounded-none w-[500px]"
              />
              <div className="flex justify-end mt-2">
                <Button onClick={handleSaveEdit} className="ml-2 bg-primary">Сохранить</Button>
                <Button onClick={() => setIsEditing(false)} className="ml-2" variant="ghost">Отмена</Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm sm:text-base">{message.content}</p>
              {!isAdvisor && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 left-0 flex gap-1.5">
                  <ActionButton
                    icon={Copy}
                    tooltip="Копировать"
                    onClick={handleCopy}
                  />
                  <ActionButton
                    icon={Edit}
                    tooltip="Редактировать"
                    onClick={handleEdit}
                  />
                </div>
              )}
              {isAdvisor && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 left-0 flex gap-1.5">
                  <ActionButton
                    icon={Copy}
                    tooltip="Копировать"
                    onClick={handleCopy}
                  />
                  <ActionButton
                    icon={RotateCw}
                    tooltip="Регенерировать"
                    onClick={handleRegenerate}
                  />
                  <ActionButton
                    icon={ThumbsUp}
                    tooltip="Нравится"
                    onClick={() => handleFeedback('like')}
                  />
                  <ActionButton
                    icon={ThumbsDown}
                    tooltip="Не нравится"
                    onClick={() => handleFeedback('dislike')}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};