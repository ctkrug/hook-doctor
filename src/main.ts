import { diagnose } from "./analysis/diagnose";

function render(): void {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) return;

  app.innerHTML = `
    <main>
      <h1>Hook Doctor</h1>
      <p>Paste your opening line and get it diagnosed. Coming soon.</p>
      <textarea id="input" placeholder="Paste your opening line or paragraph..."></textarea>
      <button id="diagnose">Diagnose</button>
      <p id="result"></p>
    </main>
  `;

  const input = app.querySelector<HTMLTextAreaElement>("#input");
  const button = app.querySelector<HTMLButtonElement>("#diagnose");
  const result = app.querySelector<HTMLParagraphElement>("#result");

  button?.addEventListener("click", () => {
    const diagnosis = diagnose(input?.value ?? "");
    if (result) {
      result.textContent = `Hook Score: ${diagnosis.hookScore}`;
    }
  });
}

render();
