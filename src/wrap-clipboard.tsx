import { showHUD, Clipboard, LaunchProps } from "@raycast/api";

export default async function Command(props: LaunchProps<{ arguments: { tag: string } }>) {
  const { tag } = props.arguments;
  const text = await Clipboard.readText();

  if (!text) {
    await showHUD("Clipboard is empty");
    return;
  }

  const wrapped = `<${tag}>${text}</${tag}>`;
  await Clipboard.copy(wrapped);
  await showHUD(`Wrapped in <${tag}> tags`);
}
