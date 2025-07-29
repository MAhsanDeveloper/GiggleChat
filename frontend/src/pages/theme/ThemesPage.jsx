import { THEMES } from "../../constants";
import { useThemeStore } from "../../zustand/useTheme";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Assalam o Alaikum, What's going on", isSent: false },
  {
    id: 2,
    content: "W Assalam! Just working on some new features",
    isSent: true,
  },
];

const ThemesPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-100 pt-8 px-4 md:px-8 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-base-content">Themes</h1>
          <button
            onClick={() => navigate("/")}
            className="btn btn-sm bg-base-200 text-base-content hover:bg-base-100"
          >
            ← Back to Chat
          </button>
        </div>

        {/* Theme Selection */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-base-content">
              Choose Theme
            </h2>
            <p className="text-sm text-base-content/70">
              Customize the appearance of your chat interface.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group p-2 rounded-lg transition-colors border ${
                  theme === t
                    ? "border-primary bg-base-200"
                    : "hover:bg-base-200/70"
                }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-xs mt-2 block font-medium text-center truncate">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-base-content">
            Live Preview
          </h2>
          <div className="bg-base-200 p-4 rounded-xl shadow-lg">
            <div className="max-w-xl mx-auto bg-base-100 rounded-xl shadow overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                    Z
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Zinedine</h3>
                    <div className="text-xs text-base-content">
                      Zizou
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 h-48 overflow-y-auto">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                        message.isSent
                          ? "bg-primary text-primary-content"
                          : "bg-base-200"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-[10px] mt-1.5 ${
                          message.isSent
                            ? "text-primary-content/70"
                            : "text-base-content/70"
                        }`}
                      >
                        18:30
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-base-300">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10"
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary h-10 min-h-0">
                    <IoSend size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesPage;
