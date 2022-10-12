import showdown from "showdown";

const showdownConverter = new showdown.Converter();

export function parseMarkdown(md) {
  return showdownConverter.makeHtml(md);
}
