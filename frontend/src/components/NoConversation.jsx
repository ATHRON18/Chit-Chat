import { Handshake  } from "lucide-react";

const NoConversation = () => {
  return (
    <div className="w-full h-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <Handshake  className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Say "Hello" to your friend..!</h2>
        <p className="text-base-content/60">
          You don't have any conversations yet..!
        </p>
      </div>
    </div>
  );
};

export default NoConversation;