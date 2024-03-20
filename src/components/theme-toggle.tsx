import { AnimatePresence, Variants, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Theme, useTheme } from "./theme-provider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdownOpen = () => setDropdownOpen((prev) => !prev);

  const switchTheme = (theme: Theme) => {
    setTheme(theme);
    setDropdownOpen(false);
  };

  const dropdownVariants: Variants = {
    hidden: { scale: 0, opacity: 0, transition: { duration: 0.1 } },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.1 } },
  };

  return (
    <div className="relative">
      <button
        className="border-border rounded-primary hover:bg-accent text-foreground relative border p-1"
        onClick={toggleDropdownOpen}
      >
        <Sun className="h-6 w-6 dark:scale-0" />
        <Moon className="absolute top-1/2 h-6 w-6 -translate-y-1/2 scale-0 dark:scale-100" />
        <span className="sr-only">Select Theme</span>
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-primary rounded-primary text-primary-foreground absolute right-0 mt-1 grid min-w-28 origin-top-right p-2"
          >
            <button
              onClick={() => switchTheme("light")}
              className="hover:bg-secondary-foreground dark:hover:bg-secondary rounded-primary w-full py-1"
            >
              Light
            </button>
            <button
              onClick={() => switchTheme("dark")}
              className="hover:bg-secondary-foreground dark:hover:bg-secondary rounded-primary w-full py-1"
            >
              Dark
            </button>
            <button
              onClick={() => switchTheme("system")}
              className="hover:bg-secondary-foreground dark:hover:bg-secondary rounded-primary w-full py-1"
            >
              System
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ThemeToggle;
