import { MenuItem } from "@/lib/content";

interface MenuCardProps {
  item: MenuItem;
  tone?: "dark" | "light";
}

export function MenuCard({ item, tone = "dark" }: MenuCardProps) {
  const isDark = tone === "dark";

  return (
    <article
      className={`
        group border-b py-8 transition-colors duration-200
        ${isDark
          ? "border-charcoal-600 hover:border-brass"
          : "border-cream-dark hover:border-terracotta"
        }
      `}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3
              className={`font-display text-2xl font-semibold leading-tight tracking-tight ${
                isDark ? "text-cream" : "text-espresso"
              }`}
            >
              {item.name}
            </h3>
            {item.cut && (
              <span
                className={`text-xs tracking-widest uppercase font-body ${
                  isDark ? "text-smoke" : "text-smoke-dark"
                }`}
              >
                {item.cut}
              </span>
            )}
            {item.category && !item.cut && (
              <span
                className={`text-xs tracking-widest uppercase font-body ${
                  isDark ? "text-smoke" : "text-smoke-dark"
                }`}
              >
                {item.category}
              </span>
            )}
          </div>

          <p
            className={`mt-2 text-sm leading-relaxed font-body max-w-xl ${
              isDark ? "text-smoke-light" : "text-charcoal-500"
            }`}
          >
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`
                  text-xs px-2 py-0.5 border font-body tracking-wide uppercase
                  ${isDark
                    ? "border-charcoal-600 text-smoke"
                    : "border-cream-dark text-charcoal-500"
                  }
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 text-right">
          <span
            className={`font-display text-2xl font-medium ${
              isDark ? "text-brass-light" : "text-terracotta"
            }`}
          >
            £{item.price}
          </span>
          {item.weight && (
            <p className={`text-xs mt-1 font-body ${isDark ? "text-smoke" : "text-charcoal-400"}`}>
              {item.weight}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
