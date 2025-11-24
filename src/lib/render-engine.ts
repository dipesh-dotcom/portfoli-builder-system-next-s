export interface RenderContext {
  customizations: Record<string, string>;
  componentCode: string;
}

export class TemplateRenderEngine {
  /**
   * Generates an HTML document with the React component embedded
   * Safely injects customizations into the component context
   */
  static generateHTML(context: RenderContext): string {
    const { componentCode, customizations } = context;

    // Sanitize and prepare the code injection
    const sanitizedCustomizations = JSON.stringify(customizations)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  <\/style>
</head>
<body>
  <div id="root"><\/div>
  <script type="module">
    import React from 'https://esm.sh/react@18';
    import ReactDOM from 'https://esm.sh/react-dom@18/client';

    // Inject customizations into window context
    window.__CUSTOMIZATIONS__ = ${sanitizedCustomizations};

    // Component factory function
    ${this.wrapComponent(componentCode)}

    // Render component
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(PortfolioComponent));
  <\/script>
</body>
</html>`;
  }

  /**
   * Wraps user component code to ensure it's a valid export
   */
  private static wrapComponent(code: string): string {
    // Check if the code already has a default export
    if (code.includes("export default")) {
      return code.replace(/export default/, "const PortfolioComponent =");
    }

    // If not, assume it's a function and wrap it
    if (code.includes("function") || code.includes("const")) {
      return `${code}\nconst PortfolioComponent = ${
        code.match(/function\s+(\w+)|const\s+(\w+)\s*=/)?.[1] ||
        code.match(/const\s+(\w+)/)?.[1] ||
        "Component"
      };`;
    }

    // Fallback: wrap entire code as a component
    return `const PortfolioComponent = (${code});`;
  }

  /**
   * Validates React component code before rendering
   */
  static validateCode(code: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for suspicious code patterns
    const dangerousPatterns = [
      { pattern: /fetch\s*\(/g, message: "Fetch API calls are not allowed" },
      { pattern: /XMLHttpRequest/g, message: "XMLHttpRequest is not allowed" },
      { pattern: /eval\s*\(/g, message: "eval() is not allowed" },
      {
        pattern: /Function\s*\(/g,
        message: "Function constructor is not allowed",
      },
      {
        pattern: /require\s*\(/g,
        message: "require() is not allowed for security reasons",
      },
    ];

    dangerousPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(code)) {
        errors.push(message);
      }
    });

    // Check for basic JSX structure
    if (!code.includes("return") && !code.includes("jsx")) {
      errors.push("Component must return JSX");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generates a preview URL for the portfolio
   */
  static generatePreviewURL(context: RenderContext): string {
    const html = this.generateHTML(context);
    const blob = new Blob([html], { type: "text/html" });
    return URL.createObjectURL(blob);
  }
}
