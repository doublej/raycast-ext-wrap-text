import { showHUD, Clipboard, LaunchProps } from "@raycast/api";
import { execSync } from "child_process";

export default async function Command(props: LaunchProps<{ arguments: { tag: string } }>) {
  const { tag } = props.arguments;

  // Copy selected text via Cmd+C
  execSync(`osascript -e 'tell application "System Events" to keystroke "c" using {command down}'`);
  await new Promise((r) => setTimeout(r, 150));

  const text = await Clipboard.readText();
  if (!text) {
    await showHUD("No text selected");
    return;
  }

  const wrapped = `<${tag}>${text}</${tag}>`;
  await Clipboard.copy(wrapped);

  // Paste back via Cmd+V
  execSync(`osascript -e 'tell application "System Events" to keystroke "v" using {command down}'`);
  await showHUD(`Wrapped in <${tag}> tags`);
}
